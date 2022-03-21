// Variável global  que armazena os dados das jogadas dos dois jogadores.
var jogadores = {
  jogador1: { pontos: 0 },
  jogador2: { pontos: 0 },
};

var colunas
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
  document.getElementById('telaOpcoesID').style.visibility = "hidden";

}

// Função para manipular as jogadas do multiplayer versus computador.
function multiplayerVSComputador() {
  document.getElementById('telaOpcoesID').style.visibility = "hidden";
  
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
}

// Função start iniciar o jogo NIM.
function start() {
  colunas = {coluna1: 1, coluna2: 3, coluna3: 5, coluna4: 7};
  listaRanques = lerArquivoRanque();

}

function hoverFosforos(obj){
  document.getElementById(obj.path[1].id).style.stroke = '#4bca7ebd';
  document.getElementById(obj.path[1].id).style.strokeWidth = 2;
  for(let i = 0; i < obj.path[2].children.length; i++){
    if(obj.path[2].children[i].id == obj.path[1].id)
      break;
    document.getElementById(obj.path[2].children[i].id).style.stroke = '#4bca7ebd';
    document.getElementById(obj.path[2].children[i].id).style.strokeWidth = 2;
  }
}
function removeStroke(obj){
  document.getElementById(obj.path[1].id).style.stroke = 'none';
  document.getElementById(obj.path[1].id).strokeWidth = 0;
  for(let i = 0; i < obj.path[2].children.length; i++){
    if(obj.path[2].children[i].id == obj.path[1].id)
      break;
    document.getElementById(obj.path[2].children[i].id).style.stroke = 'none';
    document.getElementById(obj.path[2].children[i].id).style.strokeWidth = 0;
  }
}

// Função para deixar as telas invisíveis ao entrar na página.
window.onload = function (){
  document.getElementById('TelaWinGameID').style.visibility = "hidden";
  document.getElementById("btnVersPC").addEventListener("click", multiplayerVSComputador);
  document.getElementById("btnVersPlayers").addEventListener("click", multiplayerDoisJogadores);
  let colunas = document.getElementsByClassName('fosforo');
  for(let i = 0; i < colunas.length; i++){
    document.getElementById(colunas[i].id).addEventListener("mouseover", hoverFosforos);
    document.getElementById(colunas[i].id).addEventListener("mouseout", removeStroke);
  }
}