
const conteudo = document.getElementById("conteudo");
let paginaAtual = "";
iniciarFormularios(conteudo);


function mostrarPagina() {
  // A rota usa o formato #pagina/secao.
  const rota = window.location.hash.substring(1).split("/");
  const pagina = rota[0] || "inicio";
  const modelo = document.getElementById("pagina-" + pagina);

  if (!modelo) return;

  // Trocar de seção na mesma página preserva o conteúdo e os controles.
  if (pagina !== paginaAtual) {
    conteudo.innerHTML = modelo.innerHTML;
    mostrarProjetos();
    restaurarRascunhos(conteudo);
    paginaAtual = pagina;
  }
  document.title = conteudo.querySelector("h1").textContent;

  document.querySelectorAll(".menu-link").forEach(function (link) {
    link.removeAttribute("aria-current");
    if (link.getAttribute("href") === "#" + pagina) {
      link.setAttribute("aria-current", "page");
    }
  });

  document.getElementById("controle-menu").checked = false;
  document.getElementById("controle-projetos").checked = false;
  // Estes links mantêm a rota atual ao ir para o conteúdo.
  document.querySelector(".pular-conteudo").href = "#" + pagina + "/conteudo";
  document.querySelector(".rodape a").href = "#" + pagina + "/conteudo";

  conteudo.focus({ preventScroll: true });

  const secao = document.getElementById(rota[1]);
  if (secao) {
    secao.scrollIntoView();
  } else {
    window.scrollTo(0, 0);
  }
}

if (document.getElementById("pagina-inicio")) {
  window.addEventListener("hashchange", mostrarPagina);
  mostrarPagina();
} else {
  restaurarRascunhos(conteudo);
}

document.getElementById("menu-principal").addEventListener("click", function (evento) {
  const link = evento.target.closest("a");
  if (!link) return;

  document.getElementById("controle-menu").checked = false;
  document.getElementById("controle-projetos").checked = false;
});
