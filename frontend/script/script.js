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

// NOME:
  // Espelho e contador de caracteres
  const inputNome = document.getElementById("nome");
  const espelhoNome = document.getElementById("espelhoNome");
  const contadorNome = document.getElementById("contadorNome");
  const maxChars = 50; // Máximo de caracteres permitidos
  const minChars = 3;  // Mínimo de caracteres para validação

  // Evento de input para atualizar o espelho e o contador
  inputNome.addEventListener("input", function() {
      const nome = inputNome.value;
      espelhoNome.textContent = nome; // Atualiza o espelho com o valor digitado
      const currentLength = nome.length;
      contadorNome.textContent = `${currentLength} / ${maxChars}`; // Atualiza o contador

      // Validação de comprimento
      if (currentLength > maxChars) {
          contadorNome.style.color = "red"; // Excede o máximo
      } else if (currentLength < minChars) {
          contadorNome.style.color = "orange"; // Abaixo do mínimo
      } else {
          contadorNome.style.color = "green"; // Dentro do intervalo aceitável
      }
  });

  // SENHA:
  const inputSenha = document.getElementById("senha");
  const indicadorForca = document.getElementById("forcaSenha");

  // Função para avaliar a força da senha
  function avaliarForcaSenha(senha) {
      let forca = 0;
      if (senha.length >= 6) forca++;
      if (/[A-Z]/.test(senha)) forca++;
      if (/[a-z]/.test(senha)) forca++;
      if (/[0-9]/.test(senha)) forca++;
      if (/[\W]/.test(senha)) forca++; // Caracteres especiais
      return forca;
  }
  // Evento de input para avaliar a força da senha
  inputSenha.addEventListener("input", function() {
      const senha = inputSenha.value;
      const forca = avaliarForcaSenha(senha);
      let textoForca = "Força: ";
      let cor = "red";
      switch (forca) {
          case 0:
          case 1:
              textoForca += "Muito Fraca";
              cor = "red";
              break;
          case 2:
              textoForca += "Fraca";
              cor = "orange";
              break;
          case 3:
              textoForca += "Média";
              cor = "yellow";
              break;
          case 4:
              textoForca += "Forte";
              cor = "blue";
              break;
          case 5:
              textoForca += "Muito Forte";
              cor = "green";
              break;
      } 
      indicadorForca.textContent = textoForca;
      indicadorForca.style.color = cor;
  });

// EMAIL:

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
    const nomeB = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const estado = document.getElementById("estado").value;
    const cidade = document.getElementById("cidade").value;
    const curso = document.getElementById("curso").value;
    const termo = document.getElementById("termo").checked;

    if (
      nomeB !== "" &&
      nomeB.length >= 3 &&
      nomeB.length <= 50 &&
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
