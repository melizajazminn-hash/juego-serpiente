let notas = [];

function agregarElemento(){
    notas.push(5);
    notas.push(10);
    console.log(notas.length);
}


function recorrerArreglo(){
    let notaR;
    for (let indice = 0; indice < notas.length; indice++){
        notaR = notas[indice]; 
        console.log(notaR);
    } 
} 

function generarTabla(){
    let contenidoTabla = "";
    let cmpTabla = document.getElementById("divTabla");
    
    contenidoTabla += "<table>" +
                      "<tr><td>UNO</td></tr>" +
                      "<tr><td>DOS</td></tr>" +
                      "</table>";
                      
    cmpTabla.innerHTML = contenidoTabla;
}        

function mostrarNotas(){
    let cmpTabla = document.getElementById("divTabla");
    let contenidoTabla = "<table><tr><th>NOTA</th></tr>"; 
    let miNota;
    
    for (let i = 0; i < notas.length; i++){
        miNota = notas[i];
        contenidoTabla += "<tr><td>" + miNota + "</td></tr>"; 
    }
    
    contenidoTabla += "</table>";
    cmpTabla.innerHTML = contenidoTabla;
}

function probarAgregar(){
    let notaRecupera;
    
    notaRecupera = recuperarInt("txtNota"); 
    agregarNota(notaRecupera);
}

function agregarNota(nota){
    notas.push(nota);
    mostrarNotas();
}

function calcularPromedio() {
    let sumaNotas = 0;
    let promedio;

    for (let i = 0; i < notas.length; i++) {
        sumaNotas += notas[i];
    }

    promedio = sumaNotas / notas.length;
    return promedio;
}

function mostrarResultado() {
    let resultadoPromedio = calcularPromedio();
    let componenteResultado = document.getElementById("txtResultado");
    
    if (!componenteResultado) {
        alert("El promedio es: " + (notas.length === 0 ? 0 : resultadoPromedio) + " (Añade un elemento con id='txtResultado' en tu HTML para verlo ahí)");
        return;
    }

    if (notas.length === 0) {
        componenteResultado.innerText = "El promedio es: 0";
    } else {
        componenteResultado.innerText = "El promedio es: " + resultadoPromedio.toFixed(2);
    }
}

