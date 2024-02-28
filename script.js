// Coloquei as variaveis em portugues para facilitar o entendimento e nao necessitar de tantos comentarios.

let jogadorAtual = 'X';
let proximoJogador = 'O';

let selecoesJogadorX = [];
let selecoesJogadorO = [];


const combinacoesVencedoras = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

// Criação do texto que indica a vez do jogador <p>
const div = document.getElementById('jogo');
const textoJogador = document.createElement("p");
const textoResultado = document.createElement("p");
div.appendChild(textoJogador);
div.appendChild(textoResultado);


const handleClick = function (event) {
    const celula = event.target;
    console.log(celula.innerHTML)

    if (celula.innerHTML === "") {
        celula.innerHTML = jogadorAtual;
      
//Verifica qual jogador esta na vez
        if (jogadorAtual === 'X') {
            textoJogador.innerHTML = "É a vez do jogador O"
            selecoesJogador = selecoesJogadorX;
            proximoJogador = 'O';
        } else {
            textoJogador.innerHTML = "É a vez do jogador X"
            selecoesJogador = selecoesJogadorO;
            proximoJogador = 'X';
        }
        selecoesJogador.push(Number(celula.id));
        if (checkWinner(selecoesJogador)) {
            textoJogador.innerHTML = 'Jogador ' + jogadorAtual + ' ganhou!';
            resetGame();
        }
        if (checkDraw()) {
            textoJogador.innerHTML = 'Empate';
            resetGame();
        }
        jogadorAtual = proximoJogador;
        console.log(selecoesJogador)
    }
}


// Seleciona todas as celulas da tela com evento de clique
const celulas = document.querySelectorAll('td');
for (let i = 0; i < celulas.length; i++) {
    celulas[i].addEventListener('click', handleClick);
}

function checkWinner() {
  // Percorre cada combinação vencedora
  for (let i = 0; i < combinacoesVencedoras.length; i++) {
    let matches = 0;

    // Verifica se o valor da combinação está presente em qualquer índice das seleções do jogador
    for (let j = 0; j < selecoesJogador.length; j++) {
      if (combinacoesVencedoras[i].includes(selecoesJogador[j])) {
        matches++;
      }
    }

    // Se todos os valores da combinação estiverem presentes em qualquer índice das seleções do jogador, o jogador venceu
    if (matches === 3) {
      return true;
    }
  }

  // Se nenhuma combinação vencedora for encontrada, retorna falso
  return false;
}

function checkDraw() {
    return (selecoesJogadorO.length + selecoesJogadorX.length) >= celulas.length;
}

// Essa funçao apaga o jogo atual limpando a tela.
function resetGame() {
    setTimeout( () => {
        location.reload()
        selecoesJogadorX = new Array();
        selecoesJogadorO = new Array();
        selecoesJogador = "";
        for (let i = 0; i < celulas.length; i++) {
            celulas[i].addEventListener('click', handleClick);
        }
	}, 2000);
  
}
