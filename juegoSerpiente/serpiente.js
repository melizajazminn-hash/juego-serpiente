// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

// Establecemos las dimensiones definitivas a 600x600
canvas.width = 600;
canvas.height = 600;

const COLORES_NEON = {
  celeste: "#00f3ff",
  azulElectrico: "#0066ff",
  azulProfundo: "#0a1128",
  lineasCuadricula: "#101f42",
  fondoNegro: "#00020a",
  blanco: "#ffffff"
};

const TAMANIO_CELDA = 25;

// =========================
// FUNCIONES DE DIBUJO
// =========================

function limpiarCanvas() {
  ctx.fillStyle = COLORES_NEON.fondoNegro;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function dibujarTablero() {
  ctx.strokeStyle = COLORES_NEON.lineasCuadricula; 
  ctx.lineWidth = 1;

  // 1. Líneas Verticales (Ocupan todo el alto dinámicamente)
  for (let x = 0; x <= canvas.width; x += TAMANIO_CELDA) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }  

  // 2. Líneas Horizontales (Ocupan todo el ancho dinámicamente)
  for (let y = 0; y <= canvas.height; y += TAMANIO_CELDA) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero(); 
}

function iniciarJuego() {
  // Lógica de inicialización futura
}

// Ejecución inicial para pintar la cuadrícula de 600x600
iniciarJuego();
dibujarTodo();





