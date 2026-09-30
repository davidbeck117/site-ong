# ONG Bairro Limpo

Esse projeto é um site para a ONG Bairro Limpo e faz parte das minhas atividades da faculdade. A ONG é fictícia e foi criada apenas como base para a atividade. O site tem uma apresentação, informações sobre os projetos e um formulário de cadastro demonstrativo.

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
