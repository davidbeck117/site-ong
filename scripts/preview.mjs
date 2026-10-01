import { createServer } from 'node:http';
import { createReadStream, existsSync } from 'node:fs';
import { stat } from 'node:fs/promises';
import { resolve, dirname, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const pasta = resolve(dirname(fileURLToPath(import.meta.url)), '../dist');
const porta = Number(process.env.PORT || 4173);
if (!existsSync(resolve(pasta, 'index.html'))) throw new Error('Execute npm run build antes de abrir a prévia.');
if (!Number.isInteger(porta) || porta < 0 || porta > 65535) throw new Error('Porta inválida.');
const tipos = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.png': 'image/png' };

const servidor = createServer(async (requisicao, resposta) => {
  if (!['GET', 'HEAD'].includes(requisicao.method)) { resposta.writeHead(405, { Allow: 'GET, HEAD' }).end(); return; }
  let caminho;
  try { caminho = decodeURIComponent(new URL(requisicao.url, 'http://localhost').pathname); }
  catch { resposta.writeHead(400).end(); return; }
  if (caminho.endsWith('/')) caminho += 'index.html';
  const arquivo = resolve(pasta, '.' + caminho);
  if (!arquivo.startsWith(pasta + sep)) { resposta.writeHead(403).end(); return; }
  try {
    if (!(await stat(arquivo)).isFile()) { resposta.writeHead(404).end(); return; }
    resposta.writeHead(200, { 'Content-Type': tipos[extname(arquivo)] || 'application/octet-stream', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
    if (requisicao.method === 'HEAD') resposta.end();
    else createReadStream(arquivo).on('error', () => resposta.destroy()).pipe(resposta);
  } catch (erro) {
    resposta.writeHead(erro.code === 'ENOENT' ? 404 : 500).end();
  }
});
servidor.on('error', (erro) => { console.error('Não foi possível abrir a prévia:', erro.message); process.exitCode = 1; });
servidor.listen(porta, '127.0.0.1', () => console.log(`Prévia local: http://127.0.0.1:${servidor.address().port}`));
