// ==========================================
// 1. CONFIGURACIÓN DEL CANVAS Y CONTEXTO
// ==========================================
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

// ==========================================
// 2. CONSTANTES Y COLORES DEL JUEGO
// ==========================================
const TAMANIO_CELDA = 25;

const COLORES_NEON = {
  celeste: "#00f3ff",         // Cabeza
  azulElectrico: "#0066ff",   // Cuerpo
  lineasCuadricula: "#101f42",// Cuadrícula visible
  fondoNegro: "#00020a",      // Fondo
  rosaNeon: "#ff007f"         // Comida
};

// ==========================================
// 3. ESTADO INICIAL (POSICIONES LÓGICAS)
// ==========================================
let serpiente = [
  { x: 5, y: 1 }, // Cabeza
  { x: 4, y: 1 }, // Cuerpo
  { x: 3, y: 1 }  // Cola
];

let comida = { x: 10, y: 5 }; 
let intervaloSerpiente = null; 
let direccionActual = "derecha"; 
let puntaje = 0;

// 4. FUNCIONES DE DIBUJO

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

function reposicionarComida() {
  const lineasVerticales = canvas.width / TAMANIO_CELDA;
  const lineasHorizontales = canvas.height / TAMANIO_CELDA;
  
  comida.x = Math.floor(Math.random() * lineasVerticales);
  comida.y = Math.floor(Math.random() * lineasHorizontales);
}

function dibujarTodo() {
  limpiarCanvas();   
  dibujarTablero();  

  // Pintamos la comida 
  pintarParte(comida.x, comida.y, COLORES_NEON.rosaNeon);

  // Pintamos la serpiente 
  serpiente.forEach((parte, index) => {
    if (index === 0) {
      pintarParte(parte.x, parte.y, COLORES_NEON.celeste);
    } else {
      pintarParte(parte.x, parte.y, COLORES_NEON.azulElectrico);
    }
  });
}

// 5. FUNCIONES DE MOVIMIENTO

function moverDerecha() {
  const cabezaActual = serpiente[0];
  const nuevaCabeza = { x: cabezaActual.x + 1, y: cabezaActual.y };
  serpiente.unshift(nuevaCabeza);
}

function moverIzquierda() {
  const cabezaActual = serpiente[0];
  const nuevaCabeza = { x: cabezaActual.x - 1, y: cabezaActual.y };
  serpiente.unshift(nuevaCabeza);
}

function moverArriba() {
  const cabezaActual = serpiente[0];
  const nuevaCabeza = { x: cabezaActual.x, y: cabezaActual.y - 1 };
  serpiente.unshift(nuevaCabeza);
}

function moverAbajo() {
  const cabezaActual = serpiente[0];
  const nuevaCabeza = { x: cabezaActual.x, y: cabezaActual.y + 1 };
  serpiente.unshift(nuevaCabeza);
}


// 6. CONTROL Y LÓGICA DEL JUEGO

function cambiarDireccion(direccion) {
  direccionActual = direccion;
}

function iniciarJuego() {
  if (!intervaloSerpiente) {
    intervaloSerpiente = setInterval(moverSerpiente, 200); 
    // Sincronización con tu HTML
    document.getElementById("estado").innerText = "Jugando";
    document.getElementById("mensaje").innerText = "¡Cuidado con las esquinas!";
  }
}

function pausarJuego() {
  clearInterval(intervaloSerpiente);
  intervaloSerpiente = null; 
  // Sincronización con  HTML
  document.getElementById("estado").innerText = "Pausado";
  document.getElementById("mensaje").innerText = "Juego en pausa.";
}

function atrapaComida() {
  const cabeza = serpiente[0];
  if (cabeza.x === comida.x && cabeza.y === comida.y) {
    return true;
  }
  return false;
}

function moverSerpiente() {
  if (direccionActual === "right" || direccionActual === "derecha") {
    moverDerecha();
  } else if (direccionActual === "izquierda") {
    moverIzquierda();
  } else if (direccionActual === "arriba") {
    moverArriba();
  } else if (direccionActual === "abajo") {
    moverAbajo();
  }


  if (atrapaComida() === true) {
    puntaje = puntaje + 1; 
    document.getElementById("puntaje").innerText = puntaje; 
    reposicionarComida(); 
  } else {
    serpiente.pop(); 
  }

  dibujarTodo(); 
}

function reiniciarJuego() {
  pausarJuego();
  serpiente = [
    { x: 5, y: 1 },
    { x: 4, y: 1 },
    { x: 3, y: 1 }
  ];
  comida = { x: 10, y: 5 };
  direccionActual = "derecha";
  puntaje = 0;
  document.getElementById("puntaje").innerText = puntaje;
  document.getElementById("estado").innerText = "Listo";
  document.getElementById("mensaje").innerText = "Presiona Iniciar para comenzar.";
  dibujarTodo();
}


dibujarTodo();
