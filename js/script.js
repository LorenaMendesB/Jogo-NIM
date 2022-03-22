// Variável global  que armazena os dados das jogadas dos dois jogadores.
var jogadores = {
  vezDe: 1,
  jogador1: { pontos: 0, fosforos: 0 },
  jogador2: { pontos: 0, fosforos: 0 },
  computador: { pontos: 0, fosforos: 0 },
};
var listaIdsFosforos = [];
var colunas;
var computadorVs = false;
// Constante com o nome do arquivo com o ranque.
const NOME_ARQUIVO = "ranque.json";
var fosforosValor;
// Variável de 1 ranque.
var ranque = {
  nome: "",
  score: 0,
};
var listaRanques = [];

function reiniciarVariaveis(){
  fosforosValor = 16;
  colunas = {
    coluna1: { restos: 1, pegos: 0 },
    coluna2: { restos: 3, pegos: 0 },
    coluna3: { restos: 5, pegos: 0 },
    coluna4: { restos: 7, pegos: 0 },
  };
  jogadores = {
    vezDe: 1,
    jogador1: { pontos: 0, fosforos: 0 },
    jogador2: { pontos: 0, fosforos: 0 },
    computador: { pontos: 0, fosforos: 0 },
  };
}
// Função para escrever arquivo de ranque dos jogadores.
function escreverArquivoRanque(objeto) {
  let objJson = JSON.stringify(objeto);
  localStorage.setItem(NOME_ARQUIVO, objJson);
}

// Função para ler o arquivo que guarda os ranques dos jogadores.
function lerArquivoRanque() {
  var objSalvo = localStorage.getItem(NOME_ARQUIVO);
  return JSON.parse(objSalvo);
}

// Função para manipular as jogadas do multiplayer de dois jogadores
function multiplayerDoisJogadores() {
  computadorVs = false;
  reiniciarVariaveis();
  document.getElementById("textoPlay2").textContent = "Player 2";
  document.getElementById("telaOpcoesID").style.visibility = "hidden";
}

// Função para manipular as jogadas do multiplayer versus computador.
function multiplayerVSComputador() {
  computadorVs = true;
  reiniciarVariaveis();
  document.getElementById("textoPlay2").textContent = "Computador";
  document.getElementById("telaOpcoesID").style.visibility = "hidden";
}

// Função para adicionar o novo recorde e salvar em um arquivo local.
function salvarRecord() {
  ranque.nome = document.getElementById("entradaNome").textContent;
  ranque.score = document.getElementById("recorde").textContent;
  listaRanques.push(ranque);
  listaRanques = listaRanques.sort((a, b) => {
    return a.score - b.score;
  });
  if (listaRanques.length > 10) {
    for (let i = 10; i < listaRanques; i++) {
      listaRanques.pop(i);
    }
  }
  escreverArquivoRanque(listaRanques);
}

// Função para decidir as jogadas do computador.
function computadorPlay() {
  let jogadaComputador = [];
  if (fosforosValor > 0) {
    while (1) {
      let numColuna = Math.floor(Math.random() * 4) + 1;
      let nomeColuna = "coluna" + numColuna;
      if (colunas[nomeColuna].restos != 0) {
        let quantFosf =
          Math.floor(Math.random() * colunas[nomeColuna].restos) + 1;
        jogadaComputador = [nomeColuna, quantFosf, colunas[nomeColuna].pegos + quantFosf];
        return jogadaComputador;
      }
    }
  }
}

function corHoverPlayer(listasFosforos, obj, intensidade){
  for (let i = 0; i < listasFosforos.length; i++) {
    if (listasFosforos[i].children[1].id == obj.path[0].id) break;
    document.getElementById(listasFosforos[i].children[1].id).style.fillOpacity = intensidade;
  }
}
function hoverFosforos(obj) {
  let aux = obj.path[2].children;
  document.getElementById(obj.path[0].id).style.fillOpacity = 0.5;
  corHoverPlayer(aux, obj, 0.5);
}
function removeStroke(obj) {
  let aux = obj.path[2].children;
  document.getElementById(obj.path[0].id).style.fillOpacity = 0;
  corHoverPlayer(aux, obj, 0);
}

function hoverComputador(nomeClassCol, quantidade, intensidade){
  let listaIdsFosforos = document.getElementsByClassName(nomeClassCol);
  console.dir();
  for(let i = 0; i < quantidade; i++){
    document.getElementById(listaIdsFosforos[0].children[i].lastElementChild.id).style.fillOpacity = intensidade;
  }
}


function pegarFosforos(obj) {
  let aux = "" + obj.path[1].id,
    quantidade = 0;
  let classNome = "" + document.getElementById(aux).parentElement.classList[0];
  let listaIds = document.getElementById(aux).parentElement.children;
  for (let i = 0; i < listaIds.length; i++) {
    if (listaIds[i].id == aux) {
      document.getElementById(aux).style.visibility = "hidden";
      quantidade++;
      break;
    }
    document.getElementById(listaIds[i].id).style.visibility = "hidden";
    quantidade++;
  }
  quantidade = quantidade - colunas[classNome].pegos;
  colunas[classNome].restos -= quantidade;
  colunas[classNome].pegos += quantidade;
  fosforosValor -= quantidade;

  if (jogadores.vezDe == 1) {
    jogadores.jogador1.fosforos += quantidade;
    jogadores.jogador1.pontos += quantidade;
    document.getElementById("scorePlay1").textContent =
      jogadores.jogador1.fosforos;
    if (fosforosValor == 0) {
      document.getElementById("TelaWinGameID").style.visibility = "visible";
      document.getElementById("playerVencedor").textContent = "Player 1";
      document.getElementById("fosfPegos").textContent =
        jogadores.jogador1.fosforos;
      document.getElementById("ptsTotais").textContent =
        jogadores.jogador1.pontos;
    }
    jogadores.vezDe = 2;
    // if para as jogadas do pc se, o versus computador estiver habilitado.
    if (computadorVs == true) {
      let jogadaPC = computadorPlay();
      if (jogadaPC != undefined) { // Se jogadas pc não forem nulas, iniciar a remoção dos fósforos da tela e adicionar a pontuação.
        colunas[jogadaPC[0]].restos -= jogadaPC[1];
        colunas[jogadaPC[0]].pegos += jogadaPC[1];
        jogadores.computador.fosforos += jogadaPC[1];
        jogadores.computador.pontos += jogadaPC[1];
        fosforosValor -= jogadaPC[1];
        let listaIdPC = document.getElementsByClassName(jogadaPC[0])[0];

        hoverComputador(jogadaPC[0], jogadaPC[2], 0.5);
        // Pausa para mostrar a jogada do computador.
        setTimeout(function () { 
          document.getElementById("scorePlay2").textContent =
            jogadores.computador.fosforos;
          for (let i = 0; i < jogadaPC[2]; i++) {
            document.getElementById(listaIdPC.children[i].id).style.visibility =
              "hidden";
          }
          hoverComputador(jogadaPC[0], jogadaPC[2], 0);
          if (fosforosValor == 0) {
            document.getElementById("TelaWinGameID").style.visibility = "visible";
            document.getElementById("playerVencedor").textContent = "Computador";
            document.getElementById("fosfPegos").textContent =
              jogadores.computador.fosforos;
            document.getElementById("ptsTotais").textContent =
              jogadores.computador.pontos;
          }
        }, 550);
      }
      jogadores.vezDe = 1;
    }
  } else if (jogadores.vezDe == 2) {
    jogadores.jogador2.fosforos += quantidade;
    jogadores.jogador2.pontos += quantidade;
    document.getElementById("scorePlay2").textContent =
      jogadores.jogador2.fosforos;
    if (fosforosValor == 0) {
      document.getElementById("TelaWinGameID").style.visibility = "visible";
      document.getElementById("playerVencedor").textContent = "Player 2";
      document.getElementById("fosfPegos").textContent =
        jogadores.jogador2.fosforos;
      document.getElementById("ptsTotais").textContent =
        jogadores.jogador2.pontos;
    }
    jogadores.vezDe = 1;
  }
}

function continuarPartida() {
  jogadores.jogador1.fosforos = 0;
  if (computadorVs == false) {
    jogadores.jogador2.fosforos = 0;
  } else {
    jogadores.computador.fosforos = 0;
  }
  fosforosValor = 16;
  jogadores.vezDe = 1;
  colunas = {
    coluna1: { restos: 1, pegos: 0 },
    coluna2: { restos: 3, pegos: 0 },
    coluna3: { restos: 5, pegos: 0 },
    coluna4: { restos: 7, pegos: 0 },
  };
  document.getElementById("scorePlay1").textContent = 0;
  document.getElementById("scorePlay2").textContent = 0;
  document.getElementById("TelaWinGameID").style.visibility = "hidden";
  let aux = document.getElementsByClassName("fosforoGrupo");
  for (let i = 0; i < aux.length; i++) {
    document.getElementById(aux[i].id).style.visibility = "visible";
  }
}

function voltarOpcoes() {
  document.getElementById("telaOpcoesID").style.visibility = "visible";
  document.getElementById("scorePlay1").textContent = 0;
  document.getElementById("scorePlay2").textContent = 0;
  document.getElementById("TelaWinGameID").style.visibility = "hidden";
  let aux = document.getElementsByClassName("fosforoGrupo");
  for (let i = 0; i < aux.length; i++) {
    document.getElementById(aux[i].id).style.visibility = "visible";
  }
}

// Função para deixar as telas invisíveis ao entrar na página.
window.onload = function () {
  document.getElementById("TelaWinGameID").style.visibility = "hidden";
  document
    .getElementById("btnVersPC")
    .addEventListener("click", multiplayerVSComputador);
  document
    .getElementById("btnVersPlayers")
    .addEventListener("click", multiplayerDoisJogadores);
  document
    .getElementById("btnContinuarJogando")
    .addEventListener("click", continuarPartida);
  document
    .getElementById("btnVoltarOpcoes")
    .addEventListener("click", voltarOpcoes);
  let colunas = document.getElementsByClassName("fosforoGrupo");
  for (let i = 0; i < colunas.length; i++) {
    document
      .getElementById(colunas[i].children[1].id)
      .addEventListener("mouseover", hoverFosforos);
    document
      .getElementById(colunas[i].children[1].id)
      .addEventListener("mouseout", removeStroke);
    document
      .getElementById(colunas[i].children[1].id)
      .addEventListener("click", pegarFosforos);
  }
};