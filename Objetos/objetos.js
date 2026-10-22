probarAtributos = function(){
    let persona = {
        nombre: "Meliza",
        apellido: "Llumipanta",
        edad: 36,
        estadoVivo: true 
    }
    console.log(persona.nombre); 
    console.log(persona.edad);
    
    if(persona.estadoVivo == false){
        console.log("No esta vivo");
    }else{
        console.log("Esta vivo"); 
    }
}

modificarAtributos = function(){
    let cuenta ={
        numeros: "354547576",
        saldos: 0.0
    }
    console.log (cuenta.saldos);
    cuenta.saldos = 100;
    console.log (cuenta.saldos);
    cuenta.saldos += 10;

    console.log(cuenta.saldos);
}

crearCliente = function(){
    let cliente ={
        cedula:"125876584",
        nombre: "Pepito",
    }
    let cliente = {}
    cliente1.nombre = "Ramiro";
    cliente1.apellido = "Salcedo";
    cliente1.cedula = "2547896545";
}
probarIncrementarSaldo = function (){
    let cuenta = {
        numero: "258468524",
        saldos: 34.0 
    }
    incrementarSaldo(cuenta,100);
    console.log (cuenta, saldos);
}
incrementarSaldo = function (cuenta, monto){
    cuenta.saldos += monto;
}
probarDeterminarMayor = function (){
    let per1 = {
        nombre: "Daniel",
        edad: 45
    }
    let per2={
        nombre: "Alfredo",
        edad:48
    }
    let mayor;
    mayor = determinarMayor (per1, per2);
    if (mayor!= null ){
        console.log ("El mayor es:"+ mayor.nombre);
    }
}
determinarMayor = function (persona1, persona2){
    if (persona1.edad > persona2.edad){
        return persona1;
    }else if (persona2.edad > persona1.edad){
        return persona2;
    }else{
        return null;
    }
}