
function salvarDados(chave, dados) {
  localStorage.setItem(chave, JSON.stringify(dados));
}

function carregarDados(chave) {
  const salvo = localStorage.getItem(chave);
  if (!salvo) return null;

  const dados = JSON.parse(salvo);
  if (!dados || typeof dados !== "object" || Array.isArray(dados)) return null;

  return dados;
}
