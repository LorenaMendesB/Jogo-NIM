// Variável global  que armazena os dados das jogadas dos dois jogadores.
var jogadores = {
  jogador1: { pontos: 0 },
  jogador2: { pontos: 0 },
};


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
  document.getElementById('telaOpcoesInicioID').style.visibility = "hidden";
  g.addEventListener("mouseover", mudarcor(), false);
  g.addEventListener("mouseout",reverter(), false);

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

function remove(){

}

// Função para decidir as jogadas do computador.
function computador() {
  var random = Math.floor(Math.random()*document.getElementById('moeda').length); //antes estava jogadas no lugar de moeda
  remove( document.getElementById('moeda')[random]);

 

}

// Função start iniciar o jogo NIM.
function start() {
  colunas = {coluna1: 1, coluna2: 3, coluna3: 5, coluna4: 7};
  listaRanques = lerArquivoRanque();
  if(jogadores!= null && g != null && colunas != null)  {
  //escolhe a função Comp. ou Jogador.
  if(button ==1){
    multiplayerDoisJogadores()
  }
  else{
    multiplayerVSComputador()

  }
}
}

// Função para deixar as telas invisíveis ao entrar na página.
window.onload = function (){
}
// Função para desistir de jogar
function desistir(){

 resetar();

}

//Função de resetar

function resetar(){


  start();

}
//remover figura
function remover() {
  remove(this.id);
}
//mudar a cor
function mudarcor() {
  changeColor(this.id);
}
//voltar ao original
function reverter() {
  reverter(this.id);
}