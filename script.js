let canvas = document.getElementById("cobra"); // Backgorund do jogo
let context = canvas.getContext("2d");
let box = 32;
let pontuacao = 0;
let cobra = []; // A cobrinha será criado como lista, nesta lista será armazenada as coordenadas, que quando pintadas, criam os quadrinhos
cobra[0] = {
    x : 8 * box,
    y : 8 * box
}

let direcao = "right";

// Inicializa a comida no jogo em pontos aleatórios
let comida = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

// Cria o background do jogo
function criarBG() {
    context.fillStyle = "lightblue";
    context.fillRect(0, 0, 16 * box, 16 * box);// Desenha o retângulo que será o fundo do jogo
}

// Cria a cobrinha do jogo
function criarCobrinha(){
    for(i = 0; i < cobra.length; i++){
        context.fillStyle = "blue";
        context.fillRect(cobra[i].x, cobra[i].y, box, box);
    }
}
    
function desenhoComida() {
    context.fillStyle = "yellow";
    context.fillRect(comida.x, comida.y, box , box)
}

document.addEventListener('keydown', update);

function update (event) {
    if (event.keyCode == 37 && direcao != "right") direcao = "left";
    if (event.keyCode == 38 && direcao != "down") direcao = "up";
    if (event.keyCode == 39 && direcao != "left") direcao = "right";
    if (event.keyCode == 40 && direcao != "up") direcao = "down";
}

function iniciarJogo(){

    if(cobra[0].x > 15 * box && direcao == "right") cobra[0].x = 0;
    if(cobra[0].x < 0 && direcao == "left") cobra[0].x = 16 * box;
    if(cobra[0].y > 15 * box && direcao == "down") cobra[0].y = 0;
    if(cobra[0].y < 0 && direcao == "up") cobra[0].y = 16 * box;

    for(i = 1; i < cobra.length; i++){
        if(cobra[0].x == cobra[i].x && cobra[0].y == cobra[i].y) {
            clearInterval(jogo);
            alert("Fim de Jogo!!! Você conseguiu " + pontuacao + " comidinhas." );
        }
    }

    criarBG();
    criarCobrinha();
    desenhoComida();

    let cobraX = cobra[0].x;
    let cobraY = cobra[0].y;

    if(direcao == "right") cobraX += box;
    if(direcao == "left") cobraX -= box;
    if(direcao == "up") cobraY -= box;
    if(direcao == "down") cobraY += box;

    if(cobraX != comida.x || cobraY != comida.y){
        cobra.pop();
    } else {
        comida.x = Math.floor(Math.random() * 15 + 1) * box;
        comida.y = Math.floor(Math.random() * 15 + 1) * box;
        pontuacao++;
    }

    let novaCabeca = {
        x: cobraX,
        y: cobraY
    }

    cobra.unshift(novaCabeca);
}

let jogo = setInterval(iniciarJogo, 100);