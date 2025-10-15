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


// Efeio blur no campo de email
const inputEmail = document.getElementById("email");
const msgEmail = document.getElementById("mensagemEmail");

// Evento de perda de foco (blur)
inputEmail.addEventListener("blur", function() {
    const email = inputEmail.value.trim(); // Remove espaços em branco
    // Expressão regular simples para validar email
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") { // Campo vazio
        msgEmail.textContent = "O e-mail é obrigatório.";
        msgEmail.style.color = "red";
    } else if (!regexEmail.test(email)) { // E-mail inválido
        msgEmail.textContent = "Por favor, insira um e-mail válido.";
        msgEmail.style.color = "red";
    } else { // E-mail válido
        msgEmail.textContent = "E-mail válido.";
        msgEmail.style.color = "green";
    }
});

//Aparecer o botão enviar quando o formulário estiver completo
const form = document.getElementById("formulario");
const btnEnviar = document.getElementById("btnEnviar");

function validarFormulario() {
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const estado = document.getElementById("estado").value;
  const cidade = document.getElementById("cidade").value;
  const curso = document.getElementById("curso").value;
  const termo = document.getElementById("termo").checked;

  if (
    nome !== "" &&
    email !== "" &&
    estado !== "" &&
    cidade !== "" &&
    curso !== "" &&
    termo === true
  ) {
    btnEnviar.classList.remove("hide");
  } else {
    btnEnviar.classList.add("hide");
  }
}

// Inicialmente adicionar a classe hide
window.addEventListener("DOMContentLoaded", () => {
  btnEnviar.classList.add("hide");
});

// Adicionar listeners para validar conforme usuário digita / muda
form.addEventListener("input", validarFormulario);
form.addEventListener("change", validarFormulario);
