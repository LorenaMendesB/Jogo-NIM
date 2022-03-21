// Variável global  que armazena os dados das jogadas dos dois jogadores.
var jogadores = {
  vezDe: 1,
  jogador1: { pontos: 0, fosforos: 0 },
  jogador2: { pontos: 0, fosforos: 0 },
};
var listaIdsFosforos = [];
var colunas;
// Constante com o nome do arquivo com o ranque.
const NOME_ARQUIVO = "ranque.json";

// Variável de 1 ranque.
var ranque = {
  nome: "",
  score: 0,
};
var listaRanques = [];

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
  colunas = {
    coluna1: { restos: 1, pegos: 0 },
    coluna2: { restos: 3, pegos: 0 },
    coluna3: { restos: 5, pegos: 0 },
    coluna4: { restos: 7, pegos: 0 },
  };
  jogadores.vezDe = 1;
  jogadores.jogador1.pontos = 0;
  jogadores.jogador2.pontos = 0;
  document.getElementById("textoPlay2").textContent = "Player 2";
  document.getElementById("telaOpcoesID").style.visibility = "hidden";
}

// Função para manipular as jogadas do multiplayer versus computador.
function multiplayerVSComputador() {
  colunas = {
    coluna1: { restos: 1, pegos: 0 },
    coluna2: { restos: 3, pegos: 0 },
    coluna3: { restos: 5, pegos: 0 },
    coluna4: { restos: 7, pegos: 0 },
  };
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
function computador() {}

// Função start iniciar o jogo NIM.
function start() {
  listaRanques = lerArquivoRanque();
}

function hoverFosforos(obj) {
  let aux = obj.path[2].children;
  document.getElementById(obj.path[0].id).style.fillOpacity = 0.5;
  for (let i = 0; i < aux.length; i++) {
    if (aux[i].children[1].id == obj.path[0].id) break;
    document.getElementById(aux[i].children[1].id).style.fillOpacity = 0.5;
  }
}
function removeStroke(obj) {
  let aux = obj.path[2].children;
  document.getElementById(obj.path[0].id).style.fillOpacity = 0;
  for (let i = 0; i < aux.length; i++) {
    if (aux[i].children[1].id == obj.path[1].id) break;
    document.getElementById(aux[i].children[1].id).style.fillOpacity = 0;
  }
}

function pegarFosforos(obj) {
  let aux = "" + obj.path[1].id, quantidade = 0;
  let classNome = '' + document.getElementById(aux).parentElement.classList[0];
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
  colunas[classNome].pegos  += quantidade;

  if(jogadores.vezDe == 1){
    jogadores.jogador1.fosforos += quantidade;
    jogadores.jogador1.pontos += quantidade;
    document.getElementById('scorePlay1').textContent = jogadores.jogador1.fosforos;
    jogadores.vezDe = 2;
  }else if(jogadores.vezDe == 2){
    jogadores.jogador2.fosforos += quantidade;
    jogadores.jogador2.pontos += quantidade;
    document.getElementById('scorePlay2').textContent = jogadores.jogador2.fosforos;
    jogadores.vezDe = 1;
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
