# ONG Bairro Limpo

Esse projeto é um site para a ONG Bairro Limpo e faz parte das minhas atividades da faculdade. A ONG é fictícia e foi criada apenas como base para a atividade. O site tem uma apresentação, informações sobre os projetos e um formulário de cadastro demonstrativo.

> [!NOTE]
> Esse projeto é minha primeira experiência mais aprofundada com HTML, CSS e JavaScript. Como ainda estou aprendendo e fiz tudo em pouco tempo, o código pode ter muitos erros e partes mais amadoras, que pretendo refinar com o tempo.
>
> Usei IA como apoio na construção da base, mas fui eu que defini o conceito e a estrutura do projeto.

## Estado do projeto

A primeira entrega foi marcada como v0.1.0. O projeto continua em desenvolvimento e já tem modo escuro, imagens adaptadas a diferentes telas, geração de uma versão minificada e publicação pelo GitHub Pages. A navegação por teclado, os formulários e os atributos de acessibilidade passaram pela revisão. O teste real com leitor de tela ainda está pendente.

## Funcionalidades

- Navegação entre início, projetos e cadastro, sem recarregar a página.
- Menu para celular e submenu com as seções dos projetos.
- Cartões de projetos montados com JavaScript.
- Janela de detalhes dos projetos, que também pode ser usada pelo teclado.
- Validação dos campos e mensagens de erro no formulário.
- Rascunhos dos formulários salvos no navegador.
- Layout que se adapta a diferentes tamanhos de tela.
- Imagem em WebP com versões menores para diferentes telas.
- Modo escuro automático, seguindo a preferência do sistema ou navegador.
- Geração de HTML, CSS e JavaScript minificados para publicação.

## Tecnologias

HTML, CSS e JavaScript, sem frameworks no site. Para preparar os arquivos de publicação, uso Node.js com esbuild e html-minifier-terser.

## Modo escuro

O site acompanha o tema escolhido no sistema ou navegador. No modo escuro, os fundos ficam mais escuros e os textos, links e ícones usam cores mais claras. Isso foi feito no CSS, aproveitando as variáveis de cor. Para testar, mude a preferência de tema do sistema ou do navegador.

## Imagens

A ilustração da página inicial usa WebP, com versões de 480, 800 e 1312 pixels de largura. O navegador escolhe pelo espaço que a imagem ocupa na tela e pela densidade de pixels do dispositivo. O JPEG fica como alternativa caso o navegador não suporte WebP. Os ícones continuam em SVG, porque já são pequenos e podem mudar de tamanho sem perder definição.

As versões WebP foram geradas a partir do JPEG com Sharp, usando qualidade 75 e mantendo a proporção. A imagem maior passou de 201.510 para 146.962 bytes. As versões menores já ficam prontas na pasta imagens; o build apenas copia esses arquivos.

## Como abrir

1. Baixe o projeto e extraia a pasta, caso esteja em um arquivo ZIP.
2. Abra `html/index.html` no navegador, com JavaScript habilitado.
3. Use o menu para acessar as outras páginas do site.

Para abrir os arquivos originais, basta o navegador. Para editar, abra a pasta em um editor de código, salve as alterações e atualize a página.

## Preparar a versão para publicação

Para esta parte, é preciso ter Node.js 22 ou mais recente, com npm. Na pasta do projeto, execute:

```sh
npm ci
npm run build
```

O build junta os arquivos JavaScript na ordem de carregamento e minifica o JavaScript, o CSS e o HTML. Os arquivos prontos ficam em `dist/`, com `index.html` na entrada. As imagens são copiadas para essa pasta.

O relatório em `build/relatorio.json` mostra os tamanhos antes e depois e a porcentagem de redução. Essa conta considera HTML, CSS e JavaScript, sem incluir imagens ou compressão do servidor.

Para conferir a versão gerada no navegador:

```sh
npm run preview
```

Abra [http://127.0.0.1:4173](http://127.0.0.1:4173). Para encerrar a prévia, use Ctrl+C no terminal. Faça as alterações nas pastas `html`, `css` e `js` e gere o build novamente quando quiser atualizar a versão de publicação.

## Publicação com GitHub Pages

O endereço do site é [ONG Bairro Limpo](https://davidbeck117.github.io/site-ong/). A publicação usa GitHub Pages com GitHub Actions. Para configurar no repositório:

1. Abra Settings > Pages no repositório.
2. Em Build and deployment, escolha GitHub Actions como Source.
3. Na aba Actions, acompanhe a execução de Publicar site. Se precisar iniciar manualmente, use Run workflow na main.
4. Quando a publicação terminar, abra o endereço mostrado na execução.

O arquivo `.github/workflows/pages.yml` instala as dependências com `npm ci`, gera o build com `npm run build` e envia somente a pasta `dist`. Os pull requests também passam pelo build, mas a publicação acontece apenas na main. Se o build falhar, a publicação não continua.

O site acompanha as próximas atualizações enviadas à main. O código-fonte e as versões das ferramentas ficam no repositório.

## Versionamento

Uso o Git para registrar as mudanças e o GitHub para guardar o código. No começo, as branches iam direto para a `main`. A partir desta revisão, o fluxo segue o GitFlow:

- A `develop` reúne o que está sendo preparado para a próxima entrega.
- As mudanças saem dela em uma branch separada, como `codex/revisao-final`, e voltam por pull request depois da revisão.
- Uma branch de release prepara a entrega, que vai para a `main` e recebe uma tag. Os ajustes dessa entrega também voltam para a `develop`.
- Se aparecer uma correção urgente na versão publicada, ela pode sair da `main` em uma branch de hotfix e voltar para as duas branches.

A `main` fica com a versão publicada. O histórico antigo foi mantido, sem tentar mudar o fluxo das entregas anteriores.

As mensagens dos commits começam com um tipo, seguido de uma descrição curta:

- `feat:` para adicionar funcionalidades.
- `fix:` para corrigir problemas.
- `docs:` para mudanças na documentação, como este README.

A primeira entrega recebeu a tag [v0.1.0](https://github.com/davidbeck117/site-ong/releases/tag/v0.1.0) e ficou como pré-lançamento, porque o site ainda é uma base em desenvolvimento. A numeração segue o formato `MAJOR.MINOR.PATCH`: o primeiro número indica mudanças que quebram a compatibilidade, o segundo indica novas funcionalidades e o terceiro, correções. Enquanto estiver na versão `0.x.x`, a estrutura ainda pode mudar bastante.

As tarefas pendentes ficam nas [issues](https://github.com/davidbeck117/site-ong/issues). O marco [Revisão e preparação do site](https://github.com/davidbeck117/site-ong/milestone/1), chamado de milestone no GitHub, reúne o que falta revisar antes da primeira versão estável.

## Organização dos arquivos

```text
site-ong/
├── .github/workflows/
│   └── pages.yml       # Build e publicação automática
├── html/
│   ├── index.html       # Entrada do site e modelos das páginas
│   ├── projetos.html    # Versão separada da página de projetos
│   └── cadastro.html    # Versão separada da página de cadastro
├── css/
│   └── style.css        # Estilos e ajustes de layout
├── js/
│   ├── script.js        # Navegação entre as páginas
│   ├── projetos.js      # Dados e montagem dos cartões
│   ├── modal.js         # Abertura e fechamento dos detalhes
│   ├── validacao.js     # Validação dos campos
│   ├── formularios.js   # Eventos e rascunhos dos formulários
│   └── armazenamento.js # Leitura e gravação no localStorage
├── imagens/
├── scripts/
│   ├── build.mjs       # Gera os arquivos minificados e o relatório
│   └── preview.mjs     # Abre a versão gerada em um servidor local
├── package.json       # Comandos e ferramentas do projeto
├── package-lock.json  # Versões das dependências
├── dist/              # Arquivos de publicação gerados pelo build
├── build/             # Relatório de tamanho gerado pelo build
├── .gitattributes
├── .gitignore
└── README.md
```

A navegação entre as páginas começa em `html/index.html`. Os arquivos `projetos.html` e `cadastro.html` também podem ser abertos separados. Eles usam os mesmos estilos e scripts para manter o comportamento dos detalhes e do cadastro.

## Formulários e dados

O cadastro é demonstrativo: os dados não são enviados para uma ONG ou servidor. Use dados fictícios nos testes. Os rascunhos ficam no `localStorage` do navegador, inclusive quando o preenchimento está incompleto. No site publicado, o cadastro separado e o cadastro dentro do site usam o mesmo rascunho. Para apagá-los, limpe os dados do site no navegador.

A validação de CPF confere apenas o formato, sem verificar os dígitos. Os contatos exibidos no site também são exemplos. O projeto não usa APIs externas, autenticação ou banco de dados.

## Manutenção

Os textos das páginas ficam nos modelos de `html/index.html`. Para mudar os cartões, edite a lista em `js/projetos.js`. As cores, fontes e espaçamentos estão nas variáveis do início de `css/style.css`.

## Como as páginas mudam

O endereço depois do `#` indica a página e, quando necessário, a seção. Por exemplo, `#projetos/acoes` abre os projetos e leva até as ações de limpeza. O `script.js` lê esse endereço, coloca o modelo da página dentro do `main` e atualiza o título, o link ativo do menu e o foco. Se só a seção mudar, o conteúdo continua no lugar.

Os modelos ficam no próprio HTML. Usei esse jeito para reaproveitar a estrutura sem precisar de um framework. Nos cartões, o JavaScript clona um `template` e preenche título, categoria, descrição e links com a lista de `projetos.js`. Os textos são colocados com `textContent`.

## Eventos e arquivos JavaScript

O `hashchange` acompanha a mudança de página. O clique nos links fecha o menu, e o botão de detalhes abre o modal. Nos formulários, o `input` verifica o campo e salva o rascunho enquanto ele é preenchido. O `submit` impede o envio para um servidor e confere todos os campos.

Os eventos dos formulários ficam no `main`, porque os campos entram e saem quando a página muda. Assim, não preciso cadastrar os mesmos eventos toda vez. O `formularios.js` chama a validação de `validacao.js` e usa `armazenamento.js` para salvar ou recuperar o rascunho. O `modal.js` usa a lista de projetos para preencher a janela de detalhes.

## Validação e mensagens

Campo obrigatório vazio mostra uma mensagem de preenchimento. E-mail, CPF, telefone e CEP precisam seguir o formato indicado. A data de nascimento deve ficar entre 01/01/1900 e o dia atual. Essa data máxima é atualizada quando o formulário é aberto.

Ao tentar concluir com erro, os campos ficam destacados e o foco vai para o primeiro que precisa ser corrigido. Os erros também ficam associados aos campos por `aria-describedby` e `aria-invalid`. Quando tudo está certo, aparece a confirmação de que o rascunho ficou salvo no navegador. Se o armazenamento estiver bloqueado ou o rascunho não puder ser lido, aparece uma mensagem explicando o problema.

## Detalhes dos projetos

A janela usa o elemento `dialog` do HTML. Ela tem um título associado, texto do projeto, link para o cadastro e botão de fechar. Enquanto está aberta, o teclado fica dentro dela. Esc fecha a janela, e o foco volta para o botão que a abriu.

## O que foi revisado

Na revisão, o cadastro separado ainda colocava os dados na URL ao enviar e tinha uma data máxima fixa. Ele passou a usar a mesma validação e o mesmo armazenamento do cadastro principal. O envio para o servidor foi impedido e o botão fica desativado se o JavaScript estiver desligado. No modal, também ajustei Tab e Shift+Tab para o foco continuar dentro da janela.

Para conferir a versão gerada, rode `npm run build` e `npm run preview`. Depois, vale testar:

1. Abrir início, projetos e cadastro em telas pequenas e grandes, sem rolagem para os lados.
2. Usar Tab, Shift+Tab, Enter e Espaço no menu, submenu, links e formulários.
3. Abrir os detalhes, circular pelos controles, fechar com Esc e conferir onde o foco voltou.
4. Tentar enviar o cadastro vazio, com formatos errados e com datas fora do intervalo.
5. Preencher com dados fictícios, trocar de página e recarregar para conferir o rascunho.
6. Abrir o cadastro separado e conferir que o envio não coloca os campos na URL.
7. Conferir os mesmos pontos no tema claro e no escuro.

O build e o comportamento no navegador foram conferidos antes da publicação. Os atributos e a estrutura de acessibilidade também foram revisados, mas ainda falta testar o que um leitor de tela anuncia na prática.
