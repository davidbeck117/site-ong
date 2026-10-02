const dialogoProjetos = document.getElementById("detalhes-projeto");

if (dialogoProjetos) {
  let botaoAnterior;

  document.addEventListener("click", function (evento) {
    const botao = evento.target.closest("button[data-projeto]");
    if (!botao) return;

    const projeto = projetos.find(function (item) {
      return item.id === botao.dataset.projeto;
    });
    if (!projeto) return;

    document.getElementById("titulo-detalhes").textContent = projeto.titulo;
    document.getElementById("texto-detalhes").textContent = projeto.descricao;
    const complemento = document.getElementById("complemento-detalhes");
    complemento.textContent = projeto.complemento || "";
    complemento.hidden = !projeto.complemento;

    botaoAnterior = botao;
    dialogoProjetos.showModal();
  });

  dialogoProjetos.addEventListener("close", function () {
    if (botaoAnterior && botaoAnterior.isConnected) {
      botaoAnterior.focus({ preventScroll: true });
    }
  });

  dialogoProjetos.querySelector("a").addEventListener("click", function () {
    dialogoProjetos.close();
  });

  dialogoProjetos.addEventListener("keydown", function (evento) {
    if (evento.key !== "Tab") return;
    const controles = dialogoProjetos.querySelectorAll('a[href], button:not([disabled])');
    const primeiro = controles[0];
    const ultimo = controles[controles.length - 1];
    if (evento.shiftKey && document.activeElement === primeiro) {
      evento.preventDefault();
      ultimo.focus();
    } else if (!evento.shiftKey && document.activeElement === ultimo) {
      evento.preventDefault();
      primeiro.focus();
    }
  });

  window.addEventListener("hashchange", function () {
    if (dialogoProjetos.open) {
      botaoAnterior = null;
      dialogoProjetos.close();
    }
  });
}
