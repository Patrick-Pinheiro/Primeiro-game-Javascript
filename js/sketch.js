//variáveis bolinha: tamanho e eixo
let xBolinha = 300;
let yBolinha = 200;
let dBolinha = 15;
let raio = dBolinha/2;

//velocidade da bolinha
let velocidadeXBolinha = 5;
let velocidadeYBolinha =5;

//variáveis raquete
let xRaquete = 5;
let yRaquete = 150;
let larguraRaquete = 10;
let alturaRaquete = 90;

let colidiu = false;

//variáveis oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let chanceDeErrar = 0;

//placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}


//tamanho da tela
function setup() {
  createCanvas(600, 400);
  trilha.loop();
}


//todas as funções da bolinha
function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificarColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  //verificarColisaoRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
}



//a partir deste ponto são as alterações feitas em draw
function mostraBolinha (){
  circle(xBolinha,yBolinha,dBolinha);
}

function movimentaBolinha (){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificarColisaoBorda (){
  
    if(xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }
  
  if(yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
  
}

function mostraRaquete(x,y){
  rect(x,y,larguraRaquete,alturaRaquete); 
}

function movimentaMinhaRaquete(){
  if(keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
   if(keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
  
}

function verificarColisaoRaquete(){
  if(xBolinha - raio < xRaquete + larguraRaquete && yBolinha - raio < yRaquete + alturaRaquete && yBolinha + raio > yRaquete)
  {
     velocidadeXBolinha *= -1;
     raquetada.play();
     }
}


function verificaColisaoRaquete(x,y){
  
   colidiu = collideRectCircle(x, y, larguraRaquete, alturaRaquete, xBolinha, yBolinha, raio);
  if(colidiu){
      velocidadeXBolinha *= -1;
      raquetada.play();
     }
  
  
}
  

function movimentaRaqueteOponente (){
  velocidadeYOponente = yBolinha - yRaqueteOponente - larguraRaquete/2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar();
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(410, 10, 40, 20);
  fill(255);
  text(pontosOponente, 430, 26);
}


function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
    
  }
   if (xBolinha < 10){
     pontosOponente += 1;
     ponto.play();
  }   
}



function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1;
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40;
    }
  } else {
    chanceDeErrar -= 1;
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35;
    }
  }
}