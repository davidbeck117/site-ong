// Salva também os campos incompletos para recuperar o rascunho.
function salvarRascunho(formulario) {
  const dados = {};

  formulario.querySelectorAll("input[name]").forEach(function (campo) {
    if (campo.type === "checkbox") {
      dados[campo.name] = campo.checked;
    } else {
      dados[campo.name] = campo.value;
    }
  });

  try {
    salvarDados("bairro-limpo-" + formulario.id, dados);
    return true;
  } catch (erro) {
    formulario.querySelector(".mensagem-formulario").textContent =
      "Não foi possível salvar o rascunho neste navegador.";
    return false;
  }
}

function restaurarRascunhos(conteudo) {
  const hoje = new Date();
  const dataMaxima = hoje.getFullYear() + "-" +
    String(hoje.getMonth() + 1).padStart(2, "0") + "-" +
    String(hoje.getDate()).padStart(2, "0");
  conteudo.querySelectorAll('input[type="date"]').forEach(function (campo) {
    campo.max = dataMaxima;
  });
  conteudo.querySelectorAll("form").forEach(function (formulario) {
    formulario.querySelector('button[type="submit"]').disabled = false;
    try {
      const dados = carregarDados("bairro-limpo-" + formulario.id);
      if (!dados) return;

      formulario.querySelectorAll("input[name]").forEach(function (campo) {
        if (campo.type === "checkbox") {
          campo.checked = dados[campo.name] === true;
        } else if (typeof dados[campo.name] === "string") {
          campo.value = dados[campo.name];
        }

        if (campo.matches(".campo__entrada") && campo.value !== "") {
          validarCampo(campo);
        }
      });
    } catch (erro) {
      formulario.querySelector(".mensagem-formulario").textContent =
        "Não foi possível recuperar o rascunho salvo.";
    }
  });
}

// Os eventos ficam no main e atendem aos formulários carregados pelas rotas.
function iniciarFormularios(conteudo) {

  conteudo.addEventListener("submit", function (evento) {
    evento.preventDefault();
    const formulario = evento.target;
    let formularioValido = true;

    formulario.querySelectorAll(".campo__entrada").forEach(function (campo) {
      if (!validarCampo(campo)) {
        formularioValido = false;
      }
    });

    const mensagem = formulario.querySelector(".mensagem-formulario");
    if (!formularioValido) {
      mensagem.textContent = "Confira os campos destacados antes de continuar.";
      formulario.querySelector(".campo-erro").focus();
      return;
    }

    if (salvarRascunho(formulario)) {
      mensagem.textContent = "Preenchimento concluído. O rascunho ficou salvo neste navegador.";
    }
  });

  conteudo.addEventListener("input", function (evento) {
    const formulario = evento.target.closest("form");
    if (!formulario) return;

    formulario.querySelector(".mensagem-formulario").textContent = "";
    if (evento.target.matches(".campo__entrada")) {
      validarCampo(evento.target);
    }
    salvarRascunho(formulario);
  });
}
