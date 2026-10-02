import { build, transform } from 'esbuild';
import { minify } from 'html-minifier-terser';
import { readFile, writeFile, mkdir, cp, rm, lstat } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const destino = resolve(raiz, 'dist');

// O build recria apenas a pasta dist deste projeto.
if (dirname(destino) !== raiz) throw new Error('Pasta de saída inválida.');
const pastaExistente = await lstat(destino).catch((erro) => {
  if (erro.code !== 'ENOENT') throw erro;
});
if (pastaExistente?.isSymbolicLink()) throw new Error('A pasta dist não pode ser um link.');

// A ordem acompanha os scripts carregados em html/index.html.
const scripts = ['projetos.js', 'modal.js', 'validacao.js', 'armazenamento.js', 'formularios.js', 'script.js'];
const fontesJS = await Promise.all(scripts.map((nome) => readFile(resolve(raiz, 'js', nome), 'utf8')));
const cssOriginal = await readFile(resolve(raiz, 'css/style.css'), 'utf8');
const paginas = ['index.html', 'projetos.html', 'cadastro.html'];
const fontesHTML = await Promise.all(paginas.map((nome) => readFile(resolve(raiz, 'html', nome), 'utf8')));

const resultadoJS = await build({
  stdin: { contents: fontesJS.join('\n;\n'), resolveDir: raiz, sourcefile: 'site.js' },
  bundle: true,
  minify: true,
  format: 'iife',
  platform: 'browser',
  target: 'es2018',
  charset: 'utf8',
  legalComments: 'none',
  write: false
});
const jsFinal = resultadoJS.outputFiles[0].text;
const cssFinal = (await transform(cssOriginal, { loader: 'css', minify: true, charset: 'utf8', legalComments: 'none' })).code;
const htmlFinal = [];

for (const [indice, original] of fontesHTML.entries()) {
  let html = original;
  {
    const tagsScripts = [...html.matchAll(/<script\s+src="\.\.\/js\/([^"]+)"\s+defer><\/script>/g)];
    if (tagsScripts.map((tag) => tag[1]).join(',') !== scripts.join(',')) {
      throw new Error('A ordem dos scripts no HTML mudou. Confira a lista no build.');
    }
    for (const [numero, tag] of tagsScripts.entries()) {
      html = html.replace(tag[0], numero === 0 ? '<script src="js/app.min.js" defer></script>' : '');
    }
  }
  html = html.replaceAll('../css/style.css', 'css/style.min.css').replaceAll('../imagens/', 'imagens/');
  htmlFinal.push(await minify(html, {
    collapseWhitespace: true,
    conservativeCollapse: true,
    removeComments: true
  }));
}

await rm(destino, { recursive: true, force: true });
await mkdir(resolve(destino, 'js'), { recursive: true });
await mkdir(resolve(destino, 'css'), { recursive: true });
await writeFile(resolve(destino, 'js/app.min.js'), jsFinal);
await writeFile(resolve(destino, 'css/style.min.css'), cssFinal);
for (const [indice, html] of htmlFinal.entries()) await writeFile(resolve(destino, paginas[indice]), html);
await cp(resolve(raiz, 'imagens'), resolve(destino, 'imagens'), { recursive: true });

const bytes = (textos) => textos.reduce((total, texto) => total + Buffer.byteLength(texto), 0);
const grupos = [
  { tipo: 'HTML', antes: bytes(fontesHTML), depois: bytes(htmlFinal) },
  { tipo: 'CSS', antes: Buffer.byteLength(cssOriginal), depois: Buffer.byteLength(cssFinal) },
  { tipo: 'JavaScript', antes: bytes(fontesJS), depois: Buffer.byteLength(jsFinal) }
];
const total = grupos.reduce((soma, grupo) => ({ antes: soma.antes + grupo.antes, depois: soma.depois + grupo.depois }), { antes: 0, depois: 0 });
const resultados = [...grupos, { tipo: 'Total', ...total }].map((grupo) => ({ ...grupo, reducaoPercentual: (1 - grupo.depois / grupo.antes) * 100 }));
await mkdir(resolve(raiz, 'build'), { recursive: true });
await writeFile(resolve(raiz, 'build/relatorio.json'), JSON.stringify({ observacao: 'Tamanhos em bytes antes e depois do agrupamento e da minificação, sem gzip ou Brotli. Imagens não entram neste cálculo.', resultados }, null, 2) + '\n');
console.table(resultados.map((grupo) => ({ Tipo: grupo.tipo, 'Antes (bytes)': grupo.antes, 'Depois (bytes)': grupo.depois, 'Redução (%)': grupo.reducaoPercentual.toFixed(2) })));
console.log('Arquivos prontos em dist. Relatório salvo em build/relatorio.json.');
