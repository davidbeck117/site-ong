
function validarCampo(campo) {
  let erro = "";

  if (campo.required && campo.value.trim() === "") {
    erro = "Preencha este campo.";
  } else if (campo.validity.typeMismatch) {
    erro = "Digite um e-mail válido, como nome@exemplo.com.";
  } else if (campo.validity.patternMismatch) {
    erro = campo.title;
  } else if (campo.type === "date" &&
      (campo.validity.rangeUnderflow || new Date(campo.value + "T00:00:00") > new Date())) {
    erro = "Informe uma data entre 01/01/1900 e hoje.";
  } else if (!campo.validity.valid) {
    erro = "Confira o valor informado.";
  }

  document.getElementById("erro-" + campo.id).textContent = erro;
  campo.classList.toggle("campo-erro", erro !== "");
  campo.classList.toggle("campo-sucesso", erro === "");
  campo.setAttribute("aria-invalid", erro !== "");

  return erro === "";
}
