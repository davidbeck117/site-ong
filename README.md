# ONG Bairro Limpo

Esse projeto é um site para a ONG Bairro Limpo e faz parte das minhas atividades da faculdade. A ONG é fictícia e foi criada apenas como base para a atividade. O site tem uma apresentação, informações sobre os projetos e um formulário de cadastro demonstrativo.

> [!NOTE]
> Esse projeto é minha primeira experiência mais aprofundada com HTML, CSS e JavaScript. Como ainda estou aprendendo e fiz tudo em pouco tempo, o código pode ter muitos erros e partes mais amadoras, que pretendo refinar com o tempo.
>
> Usei IA como apoio na construção da base, mas fui eu que defini o conceito e a estrutura do projeto.

## Estado do projeto

A versão atual é a v0.1.0 e ainda é uma base em desenvolvimento. O site não foi testado em um servidor estável. A revisão de acessibilidade, os testes de funcionamento e a publicação ficam para as próximas etapas da atividade.

## Funcionalidades

- Navegação entre início, projetos e cadastro, sem recarregar a página.
- Menu para celular e submenu com as seções dos projetos.
- Cartões de projetos montados com JavaScript.
- Validação dos campos e mensagens de erro no formulário.
- Rascunhos dos formulários salvos no navegador.
- Layout que se adapta a diferentes tamanhos de tela.

## Tecnologias

HTML, CSS e JavaScript, sem frameworks ou bibliotecas externas.

## Como abrir

1. Baixe o projeto e extraia a pasta, caso esteja em um arquivo ZIP.
2. Abra `html/index.html` no navegador, com JavaScript habilitado.
3. Use o menu para acessar as outras páginas do site.

Não é necessário instalar dependências. Para editar, abra a pasta em um editor de código, salve as alterações e atualize o navegador.

## Versionamento

Uso o Git para registrar as mudanças e o GitHub para guardar o código e acompanhar o histórico. Por enquanto, a `main` reúne a versão revisada do projeto. Para fazer mudanças, uso uma branch separada e abro um pull request para conferir o que foi alterado antes de juntar com a `main`.

As mensagens dos commits começam com um tipo, seguido de uma descrição curta:

- `feat:` para adicionar funcionalidades.
- `fix:` para corrigir problemas.
- `docs:` para mudanças na documentação, como este README.

A primeira entrega recebeu a tag [v0.1.0](https://github.com/davidbeck117/site-ong/releases/tag/v0.1.0) e ficou como pré-lançamento, porque o site ainda é uma base em desenvolvimento. A numeração segue o formato `MAJOR.MINOR.PATCH`: o primeiro número indica mudanças que quebram a compatibilidade, o segundo indica novas funcionalidades e o terceiro, correções. Enquanto estiver na versão `0.x.x`, a estrutura ainda pode mudar bastante.

As tarefas pendentes ficam nas [issues](https://github.com/davidbeck117/site-ong/issues). O marco [Revisão e preparação do site](https://github.com/davidbeck117/site-ong/milestone/1), chamado de milestone no GitHub, reúne o que falta revisar antes da primeira versão estável.

## Organização dos arquivos

```text
site-ong/
├── html/
│   ├── index.html       # Entrada do site e modelos das páginas
│   ├── projetos.html    # Versão separada da página de projetos
│   └── cadastro.html    # Versão separada da página de cadastro
├── css/
│   └── style.css        # Estilos e ajustes de layout
├── js/
│   ├── script.js        # Navegação entre as páginas
│   ├── projetos.js      # Dados e montagem dos cartões
│   ├── validacao.js     # Validação dos campos
│   ├── formularios.js   # Eventos e rascunhos dos formulários
│   └── armazenamento.js # Leitura e gravação no localStorage
├── imagens/
├── .gitattributes
├── .gitignore
└── README.md
```

A versão com navegação e validação em JavaScript começa em `html/index.html`. Os arquivos `projetos.html` e `cadastro.html` são versões separadas, com conteúdo em HTML e estilos em CSS.

## Formulários e dados

O cadastro é demonstrativo: os dados não são enviados para uma ONG ou servidor. Use dados fictícios nos testes. Na versão aberta pelo `index.html`, os rascunhos ficam no `localStorage` do navegador, inclusive quando o preenchimento está incompleto. Para apagá-los, limpe os dados do site no navegador.

A validação de CPF confere apenas o formato, sem verificar os dígitos. Os contatos exibidos no site também são exemplos. O projeto não usa APIs externas, autenticação ou banco de dados.

## Manutenção

Os textos das páginas ficam nos modelos de `html/index.html`. Para mudar os cartões, edite a lista em `js/projetos.js`. As cores, fontes e espaçamentos estão nas variáveis do início de `css/style.css`.
