
const projetos = [
  {
    id: "mutiroes",
    numero: "01",
    titulo: "Mutirões de limpeza",
    categoria: "Meio ambiente",
    descricao: "Reunimos voluntários para recolher o lixo de ruas e praças e encaminhar os resíduos para o destino adequado.",
    link: "Participar dos mutirões →"
  },
  {
    id: "campanhas",
    numero: "02",
    titulo: "Campanhas educativas",
    categoria: "Educação",
    descricao: "Conversamos com os moradores sobre o descarte correto do lixo e os cuidados para manter o bairro limpo.",
    link: "Ajudar nas campanhas →"
  },
  {
    id: "voluntariado",
    numero: "03",
    titulo: "Trabalho voluntário",
    categoria: "Voluntariado",
    descricao: "Quem deseja participar pode ajudar nos mutirões, na organização dos materiais ou na divulgação das nossas ações.",
    complemento: "Para demonstrar seu interesse, preencha o cadastro de colaboradores. Assim, nossa equipe poderá entrar em contato para combinar sua participação.",
    link: "Quero ser voluntário →"
  }
];

function mostrarProjetos() {
  const lista = document.getElementById("lista-projetos");
  if (!lista) return;

  const modelo = document.getElementById("modelo-projeto");
  lista.innerHTML = "";

  projetos.forEach(function (projeto) {

    const cartao = modelo.content.cloneNode(true);
    cartao.querySelector("article").id = projeto.id;
    cartao.querySelector(".cartao__numero").textContent = projeto.numero;
    cartao.querySelector(".cartao__titulo").textContent = projeto.titulo;
    cartao.querySelector(".etiqueta").textContent = projeto.categoria;
    cartao.querySelector(".cartao__descricao").textContent = projeto.descricao;
    cartao.querySelector(".cartao__link").textContent = projeto.link;

    const complemento = cartao.querySelector(".cartao__complemento");
    if (projeto.complemento) {
      complemento.textContent = projeto.complemento;
    } else {
      complemento.remove();
    }

    lista.appendChild(cartao);
  });
}
