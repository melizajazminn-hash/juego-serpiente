// ==========================================
// 1. CONFIGURACIÓN DEL CANVAS Y CONTEXTO
// ==========================================
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

// Dimensiones definitivas fijas del lienzo
canvas.width = 600;
canvas.height = 600;

// ==========================================
// 2. CONSTANTES Y COLORES DEL JUEGO
// ==========================================
const TAMANIO_CELDA = 25;

const COLORES_NEON = {
  celeste: "#00f3ff",         // Cabeza
  azulElectrico: "#0066ff",   // Cuerpo
  lineasCuadricula: "#101f42",// Azul intermedio visible para la cuadrícula
  fondoNegro: "#00020a",      // Fondo oscuro del lienzo
  rosaNeon: "#ff007f"         // Comida
};

// ==========================================
// 3. ESTADO INICIAL (POSICIONES LÓGICAS)
// ==========================================
let serpiente = [
  { x: 5, y: 1 }, // Cabeza (Fila 1, Columna 5)
  { x: 4, y: 1 }, // Cuerpo
  { x: 3, y: 1 }  // Cola
];

// Mantenemos la comida definida para evitar errores al dibujar
let comida = { x: 10, y: 5 }; 

// ==========================================
// 4. FUNCIONES DE DIBUJO (RENDERIZADO)
// ==========================================

function limpiarCanvas() {
  ctx.fillStyle = COLORES_NEON.fondoNegro;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function dibujarTablero() {
  ctx.strokeStyle = COLORES_NEON.lineasCuadricula; 
  ctx.lineWidth = 1;

  // 1. Líneas Verticales
  for (let x = 0; x <= canvas.width; x += TAMANIO_CELDA) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }  

  // 2. Líneas Horizontales 
  for (let y = 0; y <= canvas.height; y += TAMANIO_CELDA) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

function pintarParte(lineaX, lineaY, color = COLORES_NEON.celeste) {
  const xReal = lineaX * TAMANIO_CELDA;
  const yReal = lineaY * TAMANIO_CELDA;
  
  ctx.fillStyle = color;
  
  ctx.fillRect(xReal + 1, yReal + 1, TAMANIO_CELDA - 1, TAMANIO_CELDA - 1);
}

function dibujarTodo() {
  limpiarCanvas();   // 1. Fondo negro primero
  dibujarTablero();  // 2. Cuadrícula encima del fondo

  pintarParte(comida.x, comida.y, COLORES_NEON.rosaNeon);

  
  serpiente.forEach((parte, index) => {
    if (index === 0) {
      
      pintarParte(parte.x, parte.y, COLORES_NEON.celeste);
    } else {
      pintarParte(parte.x, parte.y, COLORES_NEON.azulElectrico);
    }
  });
}

dibujarTodo();




