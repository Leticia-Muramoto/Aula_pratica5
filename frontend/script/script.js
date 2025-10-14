const selectEstado = document.getElementById("estado");
const selectCidade = document.getElementById("cidade");

// URL base da API do IBGE para estados
const apiEstados = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

async function carregarEstados() {
  try {
    const resp = await fetch(apiEstados);
    const estados = await resp.json();
    // Ordenar por nome, opcional
    estados.sort((a, b) => a.nome.localeCompare(b.nome));
    for (let est of estados) {
      const opt = document.createElement("option");
      opt.value = est.sigla;    // ou est.id se preferir
      opt.textContent = `${est.nome} (${est.sigla})`;
      selectEstado.appendChild(opt);
    }
  } catch (erro) {
    console.error("Erro ao carregar estados:", erro);
  }
}

// Quando mudar o estado
selectEstado.addEventListener("change", async function () {
  const sigla = this.value;
  // Limpar cidades anteriores
  selectCidade.innerHTML = '<option value="">-- Selecione a cidade --</option>';

  if (!sigla) {
    selectCidade.disabled = true;
    return;
  }

  // Ativar o select (antes de buscar, opcional)
  selectCidade.disabled = false;

  const urlCidades = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${sigla}/municipios`;
  try {
    const resp = await fetch(urlCidades);
    const cidades = await resp.json();
    // Ordenar pelo nome da cidade
    cidades.sort((a, b) => a.nome.localeCompare(b.nome));
    for (let cid of cidades) {
      const opt = document.createElement("option");
      opt.value = cid.id;    // ou cid.nome, conforme o que você precisa guardar
      opt.textContent = cid.nome;
      selectCidade.appendChild(opt);
    }
  } catch (erro) {
    console.error("Erro ao carregar cidades:", erro);
  }
});

// Inicialmente carregar os estados
window.addEventListener("DOMContentLoaded", carregarEstados);
