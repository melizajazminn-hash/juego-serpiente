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
  lineasCuadricula: "#101f42",// Cuadrícula
  fondoNegro: "#00020a",      // Fondo oscuro
  rosaNeon: "#ff007f"         // Comida
};

// 3. ESTADO INICIAL Y NUEVAS VARIABLES

let serpiente = [
  { x: 5, y: 1 }, 
  { x: 4, y: 1 }, 
  { x: 3, y: 1 }  
];

let comida = { x: 10, y: 5 }; 
let intervaloSerpiente = null; 
let direccionActual = "derecha"; 
let puntaje = 0;

let velocidad = 200; 

let juegoTerminado = false; 


// 4. FUNCIONES DE DIBUJO

function limpiarCanvas() {
  ctx.fillStyle = COLORES_NEON.fondoNegro;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function dibujarTablero() {
  ctx.strokeStyle = COLORES_NEON.lineasCuadricula; 
  ctx.lineWidth = 1;

  for (let x = 0; x <= canvas.width; x += TAMANIO_CELDA) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }  

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

  pintarParte(comida.x, comida.y, COLORES_NEON.rosaNeon);

  serpiente.forEach((parte, index) => {
    if (index === 0) {
      pintarParte(parte.x, parte.y, COLORES_NEON.celeste);
    } else {
      pintarParte(parte.x, parte.y, COLORES_NEON.azulElectrico);
    }
  });

  // DISEÑO LIBRE GAME OVER: Letrero neón sobre el canvas si pierde
  if (juegoTerminado) {
    ctx.fillStyle = "rgba(0, 2, 10, 0.85)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = "bold 50px 'Segoe UI', sans-serif";
    ctx.fillStyle = "#ff007f";
    ctx.textAlign = "center";
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#ff007f";
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 10);

    ctx.font = "20px 'Segoe UI', sans-serif";
    ctx.fillStyle = "#00f3ff";
    ctx.shadowColor = "#00f3ff";
    ctx.fillText("Presiona 'Reiniciar' para intentar de nuevo", canvas.width / 2, canvas.height / 2 + 40);
    
  
    ctx.shadowBlur = 0; 
  }
}

// 5. FUNCIONES DE MOVIMIEN

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
  if (juegoTerminado) return; // 

  if (direccion === "derecha" && direccionActual !== "izquierda") {
    direccionActual = "derecha";
  } else if (direccion === "izquierda" && direccionActual !== "derecha") {
    direccionActual = "izquierda";
  } else if (direccion === "arriba" && direccionActual !== "abajo") {
    direccionActual = "arriba";
  } else if (direccion === "abajo" && direccionActual !== "arriba") {
    direccionActual = "abajo";
  }
}

function iniciarJuego() {
  if (juegoTerminado) return; 

  if (!intervaloSerpiente) {
    intervaloSerpiente = setInterval(moverSerpiente, velocidad); 
    document.getElementById("estado").innerText = "Jugando";
    document.getElementById("mensaje").innerText = "¡Evita los bordes del mapa!";
  }
}

function pausarJuego() {
  if (juegoTerminado) return;
  clearInterval(intervaloSerpiente);
  intervaloSerpiente = null; 
  document.getElementById("estado").innerText = "Pausado";
  document.getElementById("mensaje").innerText = "Juego en pausa.";
}

function atrapaComida() {
  const cabeza = serpiente[0];
  return cabeza.x === comida.x && cabeza.y === comida.y;
}

function verificarChoqueBordes() {
  const cabeza = serpiente[0];
  const limiteDerecho = canvas.width / TAMANIO_CELDA;
  const limiteInferior = canvas.height / TAMANIO_CELDA;

  if (cabeza.x < 0 || cabeza.x >= limiteDerecho || cabeza.y < 0 || cabeza.y >= limiteInferior) {
    return true; 
  }
  return false;
}

function moverSerpiente() {
  if (juegoTerminado) return;

  if (direccionActual === "derecha") moverDerecha();
  else if (direccionActual === "izquierda") moverIzquierda();
  else if (direccionActual === "arriba") moverArriba();
  else if (direccionActual === "abajo") moverAbajo();

  
  if (verificarChoqueBordes() === true) {
    juegoTerminado = true;
    pausarJuego();
    document.getElementById("estado").innerText = "GAME OVER";
    document.getElementById("mensaje").innerText = "💥 ¡Te has estrellado contra el borde!";
    dibujarTodo(); 
    return; 
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
  juegoTerminado = false; 
  
  
  puntaje = 0;
  document.getElementById("puntaje").innerText = puntaje;
  
  
  document.getElementById("estado").innerText = "Listo";
  document.getElementById("mensaje").innerText = "Presiona Iniciar para comenzar.";
  

  dibujarTodo();
}

dibujarTodo();
