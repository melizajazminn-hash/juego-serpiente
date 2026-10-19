let clientes = [];
let creditos = [];

let tasaInteres = 15; 
let clienteSeleccionado = null;
let cuotaCalculada = 0;
let montoCalculado = 0;
let plazoCalculado = 0;
let creditoAprobado = false;


// NAVEGACIÓN ENTRE SECCIONES
ocultarSecciones = function() {
    document.getElementById("parametros").classList.remove("activa");
    document.getElementById("clientes").classList.remove("activa");
}

mostrarSeccion = function(id) {
    ocultarSecciones();
    document.getElementById(id).classList.add("activa");
}

//  GUARDAR TASA
guardarTasa = function() {
    let tasa = recuperarFloat("tasaInteres");
    if (tasa >= 10 && tasa <= 20) {
        tasaInteres = tasa;
        mostrarTexto("mensajeTasa", "Tasa configurada correctamente: " + tasa + "%");
    } else {
        mostrarTexto("mensajeTasa", "La tasa debe estar entre 10% y 20%");
    }
}


//CREAR y LISTAR CLIENTE

guardarCliente = function() {
    let cedula = recuperaraTexto("txtCedula");
    let nombre = recuperaraTexto("txtNombre");
    let apellido = recuperaraTexto("txtApellido");
    let ingresos = recuperarInt("txtIngresos");
    let egresos = recuperarInt("txtEgresos");

    if (cedula.trim() === "" || nombre.trim() === "" || apellido.trim() === "") {
        alert("Por favor complete los campos requeridos: Cédula, Nombre y Apellido.");
        return;
    }

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

pintarClientes = function() {
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

buscarCliente = function(cedula) {
    let clienteEncontrado = null;
    for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].cedula === cedula) {
            clienteEncontrado = clientes[i];
            break;
        }
    }
    return clienteEncontrado;
}

seleccionarCliente = function(cedula) {
    let cli = buscarCliente(cedula);
    if (cli != null) {
        clienteSeleccionado = cli;
        mostrarTextoEnCaja("txtCedula", cli.cedula);
        mostrarTextoEnCaja("txtNombre", cli.nombre);
        mostrarTextoEnCaja("txtApellido", cli.apellido);
        mostrarTextoEnCaja("txtIngresos", cli.ingresos);
        mostrarTextoEnCaja("txtEgresos", cli.egresos);
    }
}

limpiar = function() {
    mostrarTextoEnCaja("txtCedula", "");
    mostrarTextoEnCaja("txtNombre", "");
    mostrarTextoEnCaja("txtApellido", "");
    mostrarTextoEnCaja("txtIngresos", "");
    mostrarTextoEnCaja("txtEgresos", "");
    clienteSeleccionado = null;
}
