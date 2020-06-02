'use strict';

// Criou constantes para funções
const HEIGHT = 500;
const WIDTH = 500;
const ARROW_DOWN = 40;
const ARROW_RIGHT = 39;
const ARROW_LEFT = 37;
const ARROW_UP = 38;

let velocidade = 15;
let placar = 0

// Chamou o canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// constante para a fazer a bolinha aparecer em lugares aleatorios
const avatar = {
  x: posicoesAleatorias(0, WIDTH),
  y: posicoesAleatorias(0, HEIGHT)
};

// criou a bolinha vermelha e azul, e colocou a constante de aparecer aleatoriamente
const bolinhas = [
  {
    id: 1,
    x: posicoesAleatorias(0, WIDTH),
    y: posicoesAleatorias(0, HEIGHT),
    tipo: 'red'
  },
  {
    id: 2,
    x: posicoesAleatorias(0, WIDTH),
    y: posicoesAleatorias(0, HEIGHT),
    tipo: 'blue'
  }
];

// qual a diferença entre: const limparTela = function() { ... }; e function limparTela() { ... }; ? 
// com const limparTela vc cria uma constante e puxa uma função já criada, com function Limpartela vc puxa constantes ja criadas mas ambas funcionam do msm jeito :)

// colocou o limite do (math.random) para nao sair do canvas
function posicoesAleatorias(min, max) {
  return Math.random() * (max - min) + min;
}

// atualiza a tela para desenhar a bolinha em outro lugar
const limparTela = function() {
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.rect(0, 0, WIDTH, HEIGHT);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

// bolinha preta
const desenhaBolinha = function(eixoX, eixoY, cor) {
  ctx.beginPath();
  ctx.fillStyle = cor;
  ctx.arc(eixoX, eixoY, 10, 0, Math.PI*2, true);
  ctx.fill();
}

const desenhaPlacar = function(placar) {
  ctx.fillText("Placar: " + placar, 1, 10)
}

// colocou uma função dentro de uma constante para quando chamar a constante iniciar a função
const desenha = function() {
  limparTela();

  for (let i = 0; i < bolinhas.length; i++) {
    const bolinha = bolinhas[i];

    const distanciaX = Math.pow(avatar.x - bolinha.x, 2);
    const distanciaY = Math.pow(avatar.y - bolinha.y, 2);
    const distanciaEntrePontos = Math.sqrt(distanciaX + distanciaY);

    const colidiu = distanciaEntrePontos <= 20;
    if(colidiu) {

      if(bolinha.tipo === 'red') {
        placar = placar - 1
      }

      if(bolinha.tipo === 'blue') {
        placar = placar + 1
      }

      bolinha.x = posicoesAleatorias(0, WIDTH);
      bolinha.y = posicoesAleatorias(0, HEIGHT);
    }

    desenhaBolinha(bolinha.x, bolinha.y, bolinha.tipo);
  }

  desenhaBolinha(avatar.x, avatar.y, "black");
  desenhaPlacar(placar)
}

// Faz a bolinha preta andar e dps puxa a função para atualizar e desenhar ela em outro lugat
const andar = function({ keyCode }) {
  if (keyCode === ARROW_UP) {
    if (avatar.y - velocidade > 0)
      avatar.y -= velocidade;
  }

  if (keyCode === ARROW_DOWN) {
    if (avatar.y + velocidade < HEIGHT)
      avatar.y += velocidade;
  }

  if (keyCode === ARROW_LEFT) {
    if (avatar.x - velocidade > 0)
      avatar.x -= velocidade;
  }

  if (keyCode === ARROW_RIGHT) {
    if (avatar.x + velocidade < WIDTH)
      avatar.x += velocidade;
  }

  console.log(avatar);
  desenha();
}

// coloca a função de andar como "true" fazendo ela funcionar
window.addEventListener('keydown', andar, true);
desenha()
