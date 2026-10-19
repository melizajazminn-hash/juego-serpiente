// Iniciamos el arreglo con los mismos 3 clientes que pusiste en el HTML
let clientes = [
    { cedula: "1712345678", nombre: "Juan", apellido: "Pérez", ingresos: 1200, egresos: 500 },
    { cedula: "1723456789", nombre: "María", apellido: "Gómez", ingresos: 1500, egresos: 600 },
    { cedula: "1734567890", nombre: "Carlos", apellido: "Ramírez", ingresos: 900, egresos: 350 }
];
let creditos = [];

let tasaInteres = 15; 
let clienteSeleccionado = null;
let cuotaCalculada = 0;
let montoCalculado = 0;
let plazoCalculado = 0;
let creditoAprobado = false;

// NAVEGACIÓN ENTRE SECCIONES
function ocultarSecciones() {
    document.getElementById("parametros").classList.remove("activa");
    document.getElementById("clientes").classList.remove("activa");
    document.getElementById("credito").classList.remove("activa");
    document.getElementById("listaCreditos").classList.remove("activa");
}

function mostrarSeccion(id) {
    ocultarSecciones();
    let seccion = document.getElementById(id);
    if (seccion) {
        seccion.classList.add("activa");
    }
}

// GUARDAR TASA
function guardarTasa() {
    let tasa = recuperarFloat("tasaInteres");
    if (tasa >= 10 && tasa <= 20) {
        tasaInteres = tasa;
        mostrarTexto("mensajeTasa", "Tasa configurada correctamente: " + tasa + "%");
    } else {
        mostrarTexto("mensajeTasa", "La tasa debe estar entre 10% y 20%");
    }
}

// VALIDACIÓN DE CAMPOS VACÍOS (Usa tu utilitario recuperaraTexto)
function validacionCampo(idCampo) {
    let valor = recuperaraTexto(idCampo); 
    return valor.trim() !== "";
}

// CREAR Y ACTUALIZAR CLIENTE
function guardarCliente() {
    if (!validacionCampo("txtCedula") || !validacionCampo("txtNombre") || 
        !validacionCampo("txtApellido") || !validacionCampo("txtIngresos") || 
        !validacionCampo("txtEgresos")) {
        return alert("Datos incompletos. No se puede guardar el cliente.");
    }

    let cedula = recuperaraTexto("txtCedula");
    let nombre = recuperaraTexto("txtNombre");
    let apellido = recuperaraTexto("txtApellido");
    let ingresos = recuperarInt("txtIngresos");
    let egresos = recuperarInt("txtEgresos");

    let clienteExistente = buscarCliente(cedula);

    if (clienteExistente == null) {
        let nuevoCliente = {
            cedula: cedula,
            nombre: nombre,
            apellido: apellido,
            ingresos: isNaN(ingresos) ? 0 : ingresos,
            egresos: isNaN(egresos) ? 0 : egresos
        };
        clientes.push(nuevoCliente);
        alert("Cliente registrado con éxito.");
    } else {
        clienteExistente.nombre = nombre;
        clienteExistente.apellido = apellido;
        clienteExistente.ingresos = isNaN(ingresos) ? 0 : ingresos;
        clienteExistente.egresos = isNaN(egresos) ? 0 : egresos;
        alert("Cliente actualizado con éxito.");
    }

    pintarClientes();
    limpiar();
}

function pintarClientes() {
    let tbody = document.getElementById("tablaClientes");
    let contenido = "";

    for (let i = 0; i < clientes.length; i++) {
        let cli = clientes[i];
        contenido += "<tr>" +
            "<td>" + cli.cedula + "</td>" +
            "<td>" + cli.nombre + "</td>" +
            "<td>" + cli.apellido + "</td>" +
            "<td>" + cli.ingresos + "</td>" +
            "<td>" + cli.egresos + "</td>" +
            "<td>" +
                "<button onclick='seleccionarCliente(\"" + cli.cedula + "\")'>Actualizar</button>" +
            "</td>" +
        "</tr>";
    }
    tbody.innerHTML = contenido;
}

function buscarCliente(cedula) {
    let clienteEncontrado = null;
    for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].cedula === cedula) {
            clienteEncontrado = clientes[i];
            break;
        }
    }
    return clienteEncontrado;
}

function seleccionarCliente(cedula) {
    clienteSeleccionado = buscarCliente(cedula);
    if (clienteSeleccionado) {
        mostrarTextoEnCaja("txtNombre", clienteSeleccionado.nombre);
        mostrarTextoEnCaja("txtApellido", clienteSeleccionado.apellido);  
        mostrarTextoEnCaja("txtCedula", clienteSeleccionado.cedula);  
        mostrarTextoEnCaja("txtIngresos", clienteSeleccionado.ingresos);
        mostrarTextoEnCaja("txtEgresos", clienteSeleccionado.egresos);
    } else {
        alert("El cliente con la cédula " + cedula + " no existe");
    }
}

function limpiar() {
    mostrarTextoEnCaja("txtNombre", "");
    mostrarTextoEnCaja("txtApellido", "");  
    mostrarTextoEnCaja("txtCedula", "");  
    mostrarTextoEnCaja("txtIngresos", "");
    mostrarTextoEnCaja("txtEgresos", "");
}

// BUSCAR CLIENTE PARA CRÉDITO
function buscarClienteCredito() {
    let clienteCredito = recuperaraTexto("buscarCedulaCredito");
    let tablaCliente = document.getElementById("datosClienteCredito");
    clienteSeleccionado = buscarCliente(clienteCredito);
    
    if (clienteSeleccionado) {
        pintarClienteCredito(clienteSeleccionado, tablaCliente);
    } else {
        tablaCliente.innerHTML = "Cliente no encontrado ❌";
    }
}

function pintarClienteCredito(cliente, idInformacion) {
    let infoCliente = "<h3>Datos del Cliente</h3>"+
        "<p><strong>Cédula:</strong> "+cliente.cedula+"</p>"+
        "<p><strong>Nombre:</strong> "+cliente.nombre+"</p>"+
        "<p><strong>Apellido:</strong> "+cliente.apellido+"</p>"+
        "<p><strong>Ingresos:</strong> "+cliente.ingresos+"</p>"+
        "<p><strong>Egresos:</strong> "+cliente.egresos+"</p>";
    idInformacion.innerHTML = infoCliente;
}

// CÁLCULO DE CRÉDITO
function calcularCredito() {
    let resultadoCredito = document.getElementById("resultadoCredito");
    let estadoBoton = document.getElementById("btnSolicitarCredito");

    let txtmonto = recuperarInt("montoCredito");
    let txtPlazo = recuperarInt("plazoCredito");

    if (clienteSeleccionado === null) {
        resultadoCredito.textContent = "Busque un cliente válido primero ❌";
        return;
    }

    if (!Number.isFinite(txtmonto) || !Number.isFinite(txtPlazo) || txtmonto <= 0 || txtPlazo <= 0) {
        resultadoCredito.className = "rechazado";
        resultadoCredito.textContent = "El monto y el plazo deben ser mayores que cero.";
        return;
    }

    montoCalculado = txtmonto;
    plazoCalculado = txtPlazo;

    let disponible = calcularDisponible(clienteSeleccionado.ingresos, clienteSeleccionado.egresos);
    let capacidadPago = calcularCapacidadDePgo(disponible);
    let interes = calcularInteresSimple(montoCalculado, plazoCalculado, tasaInteres);
    
    let totalPagar = calcularTotalPagar(montoCalculado, interes);
    cuotaCalculada = calcularCuotaMensual(totalPagar, plazoCalculado);

    creditoAprobado = aprobarCredito(capacidadPago, cuotaCalculada);
    let mensajeCredito;

    if (creditoAprobado === true) {
        mensajeCredito = " CRÉDITO APROBADO ✅";
        resultadoCredito.className = "aprobado";
        estadoBoton.disabled = false;
    } else {
        mensajeCredito = " CRÉDITO RECHAZADO ❌";
        resultadoCredito.className = "rechazado";
        estadoBoton.disabled = true;
    }

    let mensaje = "Capacidad de pago: " + capacidadPago + "<br>" +
                  "Total a pagar: " + totalPagar + " <br>" +
                  "Cuota mensual: " + cuotaCalculada.toFixed(2) + "<br>" +
                  "RESULTADO: " + mensajeCredito + "<br>";

    resultadoCredito.innerHTML = mensaje;
}

// ACCIÓN COMPLEMENTARIA: REGISTRAR SOLICITUD
function solicitarCredito() {
    if (!creditoAprobado || !clienteSeleccionado) return;

    let nuevoCredito = {
        cedula: clienteSeleccionado.cedula,
        nombre: clienteSeleccionado.nombre,
        apellido: clienteSeleccionado.apellido,
        monto: montoCalculado,
        tasa: tasaInteres,
        plazo: plazoCalculado,
        cuota: cuotaCalculada.toFixed(2)
    };

    creditos.push(nuevoCredito);
    alert("¡Crédito solicitado e inscrito exitosamente!");
    
    mostrarTextoEnCaja("buscarCedulaCredito", "");
    mostrarTextoEnCaja("montoCredito", "");
    mostrarTextoEnCaja("plazoCredito", "");
    document.getElementById("datosClienteCredito").innerHTML = "";
    document.getElementById("resultadoCredito").innerHTML = "";
    document.getElementById("btnSolicitarCredito").disabled = true;
    
    clienteSeleccionado = null;
    pintarCreditos(creditos);
}

// LISTAR CRÉDITOS EN LA TABLA FINAL
function pintarCreditos(arregloCreditos) {
    let tbody = document.getElementById("tablaCreditos");
    if (!tbody) return;

    let contenido = "";
    for (let i = 0; i < arregloCreditos.length; i++) {
        let cr = arregloCreditos[i];
        contenido += "<tr>" +
            "<td>" + cr.cedula + "</td>" +
            "<td>" + cr.nombre + "</td>" +
            "<td>" + cr.apellido + "</td>" +
            "<td>$" + cr.monto + "</td>" +
            "<td>" + cr.tasa + "%</td>" +
            "<td>" + cr.plazo + " meses</td>" +
            "<td>$" + cr.cuota + "</td>" +
        "</tr>";
    }
    tbody.innerHTML = contenido;
}

// FILTRAR CRÉDITOS POR CÉDULA
function buscarCreditosCliente() {
    let cedulaBuscar = recuperaraTexto("buscarCedulaListado");
    if (cedulaBuscar.trim() === "") {
        alert("Ingrese una cédula para filtrar.");
        return;
    }
    let filtrados = creditos.filter(c => c.cedula === cedulaBuscar);
    pintarCreditos(filtrados);
}

function calcularDisponible(ingresos, egresos) {
    return ingresos - egresos;
}

function calcularCapacidadDePgo(disponible) {
    // Límite financiero estándar del 40% sobre el saldo neto disponible
    return disponible * 0.40;
}

function calcularInteresSimple(monto, plazoMeses, tasaAnual) {
    let tasaMensual = (tasaAnual / 100) / 12;
    return monto * tasaMensual * plazoMeses;
}

function calcularTotalPagar(monto, interes) {
    return monto + interes;
}

function calcularCuotaMensual(totalPagar, plazoMeses) {
    if (plazoMeses <= 0) return 0;
    return totalPagar / plazoMeses;
}

function aprobarCredito(capacidadPago, cuotaCalculada) {
    // El crédito es viable si la cuota mensual no supera la capacidad máxima de pago
    if (cuotaCalculada <= capacidadPago && capacidadPago > 0) {
        return true;
    }
    return false;
}

