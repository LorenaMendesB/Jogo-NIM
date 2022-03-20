// Variável global  que armazena os dados das jogadas dos dois jogadores.
var jogadores = {
  jogador1: { pontos: 0 },
  jogador2: { pontos: 0 },
};

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
  let teste = localStorage.setItem(NOME_ARQUIVO, objJson);
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

// Função para decidir as jogadas do computador.
function computador(contexto) {

}

// A função ajuda a abrir a tela de sobre do jogo.
function ajuda(){
  document.getElementById('telaOpcoesInicioID').style.visibility = "hidden";
  document.getElementById('telaAjudaID').style.visibility = "visible";
}

// Função start iniciar o jogo NIM.
function start() {
  listaRanques = lerArquivoRanque();
  document.getElementById('telaInicio').style.visibility = "hidden";
  if(button == 1) 
    multiplayerDoisJogadores()
  else
    multiplayerVSComputador();
}
//Função para mudar as moedas

function stylemoedas(){
  document.getElementById('moeda').style.visibility = "hidden";
}