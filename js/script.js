// Variável global  que armazena os dados das jogadas dos dois jogadores.
var jogadores = {
  vezDe: 1,
  jogador1: { pontos: 0, fosforos: 0 },
  jogador2: { pontos: 0, fosforos: 0 },
  computador: { pontos: 0, fosforos: 0 },
};
var listaIdsFosforos = [];
var colunas;
var temp = false;
// Constante com o nome do arquivo com o ranque.
const NOME_ARQUIVO = "ranque.json";
var fosforosValor;
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
  };
  document.getElementById("textoPlay2").textContent = "Player 2";
  document.getElementById("telaOpcoesID").style.visibility = "hidden";
}

// Função para manipular as jogadas do multiplayer versus computador.
function multiplayerVSComputador() {
  temp = true;
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
    computador: { pontos: 0, fosforos: 0 },

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
function computador() {

  //var random = Math.floor(Math.random()*jogadas.length);
  //remove(jogadas[random]);

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
  // }
  // if(temp== true){
  //   quantidade = (Math.floor (Math.random()*fosforosValor)) - colunas[classNome].pegos
  // }
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
  } else if (jogadores.vezDe == 2) {
    if (temp == false) {
      jogadores.jogador2.fosforos += quantidade;
      jogadores.jogador2.pontos += quantidade;
      document.getElementById("scorePlay2").textContent =
        jogadores.jogador2.fosforos;
    } else {
      jogadores.computador.fosforos += quantidade;
      jogadores.computador.pontos += quantidade;
      document.getElementById("scorePlay2").textContent =
        jogadores.computador.fosforos;
    }
    if (fosforosValor == 0) {
      if (temp == false) {
        document.getElementById("TelaWinGameID").style.visibility = "visible";
        document.getElementById("playerVencedor").textContent = "Player 2";
        document.getElementById("fosfPegos").textContent =
          jogadores.jogador2.fosforos;
        document.getElementById("ptsTotais").textContent =
          jogadores.jogador2.pontos;
      }

      else {
        document.getElementById("TelaWinGameID").style.visibility = "visible";
        document.getElementById("playerVencedor").textContent = "Computador";
        document.getElementById("fosfPegos").textContent =
          jogadores.computador.fosforos;
        document.getElementById("ptsTotais").textContent =
          jogadores.computador.pontos;
      }
    }
    jogadores.vezDe = 1;
  }
}

function continuarPartida() {
  jogadores.jogador1.fosforos = 0;
  if (temp == false) {
    jogadores.jogador2.fosforos = 0;
  }
  else {
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
  document.getElementById('telaOpcoesID').style.visibility = "visible";
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
}
