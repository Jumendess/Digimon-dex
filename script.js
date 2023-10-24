const api = "https://digimon-api.vercel.app/api/digimon";
const digimonContainer = document.getElementById("digimons");
const buscaInput = document.getElementById("busca");
const buscarButton = document.querySelector("button");
const voltarButton = document.getElementById("voltar");

window.onload = function () {
  // Carrega todos os Digimons inicialmente
  carregarDigimons("Rookie");
};

function carregarDigimons(filter) {
  fetch(api)
    .then((data) => data.json())
    .then((data) => {
      digimonContainer.innerHTML = "";

      for (let index = 0; index < data.length; index++) {
        const digimon = data[index];
        if (digimon.level == filter) {
          const digimonElement = criarDigimonElemento(digimon);
          digimonContainer.appendChild(digimonElement);
        }
      }
    });
}

function buscarPorNome() {
  const nome = buscaInput.value.toLowerCase();

  fetch(api)
    .then((data) => data.json())
    .then((data) => {
      digimonContainer.innerHTML = "";

      for (let index = 0; index < data.length; index++) {
        const digimon = data[index];
        if (digimon.name.toLowerCase().includes(nome)) {
          const digimonElement = criarDigimonElemento(digimon);
          digimonContainer.appendChild(digimonElement);
        }
      }

      mostrarBotaoVoltar();
    });
}

function voltarParaPaginaInicial() {
  buscaInput.value = "";
  buscarButton.style.display = "inline-block";
  voltarButton.style.display = "none";
  carregarDigimons("Rookie");
}

function mostrarBotaoVoltar() {
  buscarButton.style.display = "none";
  voltarButton.style.display = "inline-block";
}

function criarDigimonElemento(digimon) {
  const digimonElement = document.createElement("div");
  digimonElement.classList.add("digimon");
  digimonElement.innerHTML = `
    <img src="${digimon.img}" >
    <p class="nome-digimon">${digimon.name}</p>
    <p>${digimon.level}</p>
  `;
  return digimonElement;
}
