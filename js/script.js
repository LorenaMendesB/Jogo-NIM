// Variável global  que armazena os dados das jogadas dos dois jogadores.
var jogadores = {
  jogador1: { pontos: 0 },
  jogador2: { pontos: 0 },
};

var jogadas = [];
var pecas;
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
  document.getElementById('telaOpcoesInicioID').style.visibility = "hidden";

}

// Função para manipular as jogadas do multiplayer versus computador.
function multiplayerVSComputador() {
  document.getElementById('telaOpcoesInicioID').style.visibility = "hidden";
  
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

function removePecas(id){
    var remove = document.getElementById(id);
    remove.style.visibility = "hidden";
    remove.removeEventListener("click", removePecas(id), false);
    var index = jogadas.indexOf(id);
    jogadas.splice(index, 1);
    var n = id.replace('dot','');
    pecas--;
    while((n-10)>=11) {
        var id2 = 'dot'+(n-10);
        if(!(document.getElementById(id2).style.visibility == 'hidden')) {
            document.getElementById(id2).style.visibility = "hidden";
            document.getElementById(id2).removeEventListener("click", removePecas(id), false);
            var index = jogadas.indexOf(id2);
            jogadas.splice(index, 1);
            pecas--;
        }
        n=n-10;
    }
}

// Função para decidir as jogadas do computador.
function computador() {
  var random = Math.floor(Math.random()*jogadas.length);
  removePecas(jogadas[random]);

}

// Função start iniciar o jogo NIM.
function start() {
  colunas = {coluna1: 1, coluna2: 3, coluna3: 5, coluna4: 7};
  listaRanques = lerArquivoRanque();

}

// Função para deixar as telas invisíveis ao entrar na página.
window.onload = function (){
}