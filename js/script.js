// Variável global  que armazena os dados das jogadas dos dois jogadores.
var jogadores = {
  jogador1: { pontos: 0 },
  jogador2: { pontos: 0 },
};

// Constante com o nome do arquivo com o ranque.
const NOME_ARQUIVO = 'ranque.json';

// Variável de 1 ranque.
var ranque = {
  nome: "",
  score: "",
};

// Função para escrever arquivo de ranque dos jogadores.
function escreverArquivoRanque(objeto) {
    let objJson = JSON.stringify(objeto);
    let arquivo = new Blob(objJson, {type: 'application/javascript;charset=utf-8' });
    let link = window.URL.createObjectURL(arquivo);
    window.location = link;
}

// Função para ler o arquivo que guarda os ranques dos jogadores.
function lerArquivoRanque() {
   ranque = JSON.parse();
}

// Função start iniciar o jogo NIM.
function start() {}
