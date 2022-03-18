var jogadores = {
  jogador1: { pontos: 0 },
  jogador2: { pontos: 0 },
};

const NOME_ARQUIVO = 'ranque.json';

var ranque = {
  nome: "",
  score: "",
};

ranque = [];

function escreverArquivoRanque(objeto) {
    let objJson = JSON.stringify(objeto);
    let arquivo = Blob(objJson, {type: 'application/javascript;charset=utf-8' });
    let link = window.URL.createObjectURL(arquivo);
    window.location = link;
}

function lerArquivoRanque() {
   ranque = JSON.parse();
}

function start() {}
