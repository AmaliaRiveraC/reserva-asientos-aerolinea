var asientosAerolinea = [false, false, false, false, false, false, false, false, false, false];

var pintarAsientos = function(arreglo){
	var contenedor = document.getElementById("asientos");
	for(var i=1; i <= arreglo.length; i++){
		var asiento = document.createElement("div");
		asiento.className = "col-2 asiento";
		asiento.style.background = "green";
		asiento.style.margin = "2px";
		contenedor.appendChild(asiento);
	}
};

var reservar = function(){
	var boton = document.getElementById("boton");
	boton.addEventListener("click", elegirZona);
};

var elegirZona = function(){
	var eleccion = prompt("¿En qué zona prefieres reservar tu asiento? \n 1.Primera Clase \n 2.Económica \n \n Por favor ingresa el número")
	if(eleccion == 1){
		verificarZonaPrimeraClase();
	} else if(eleccion == 2){
		verificarZonaEconomica();
	} else {
		alert("Ingresa númer valido");
	}
};

var verificarZonaPrimeraClase = function(){
	var zona = "Primera Clase";
	for(var indice = 0; indice<4; indice++){
		if(asientosAerolinea[indice] == false){
			asientosAerolinea[indice] = true;
			reservarAsiento(indice);
			pintarTicket(indice, zona);
			break;
		} else if(indice == 3 && asientosAerolinea[indice] == true){
			reasignarZonaEconomica(zona);
		}
	}
};

var verificarZonaEconomica = function(){
	var zona = "Económica";
	for(var indice = 4; indice<=9; indice++){
		if(asientosAerolinea[indice] == false){
			asientosAerolinea[indice] = true;
			reservarAsiento(indice);
			pintarTicket(indice, zona);
			break;
		} else if(indice == 9 && asientosAerolinea[indice] == true){
			reasignarZonaPrimeraClase(zona);
		}
	}
};

var reservarAsiento = function(indiceAPintar){
	var arregloAsientos = [];
	var asientos = document.getElementsByClassName("asiento");
	arregloAsientos.push(asientos);
	for(var indice=0; indice<arregloAsientos.length; indice++){
		if(indice == indiceAPintar){
			arregloAsientos[indiceAPintar].textContent = "Ocupado";
		}
	}
}

var pintarTicket = function(indice, zona){
	var contenedorTicket = document.getElementById("ticket");
	var ticket = document.createElement("div");
	ticket.className = "col-6";
	ticket.style.border = "1px solid black";
	var titulo = document.createElement("p");
	var asientoReservado = document.createElement("p");
	var clase = document.createElement("p");
	titulo.textContent = "Pase de abordar";
	asientoReservado.textContent = "No. de asiento " + (indice + 1);
	clase.textContent = "Clase: " + zona;
	ticket.appendChild(titulo);
	ticket.appendChild(asientoReservado);
	ticket.appendChild(clase);
	contenedorTicket.appendChild(ticket);
};
var reasignarZonaEconomica = function(zona){
	var reasignar = confirm("Ya no quedan lugar en zona " + zona + ":( \n ¿Quieres reservar tu asiento en zona Económica?");
	if(reasignar == true){
		verificarZonaEconomica();
	} else{
		proximoVuelo();
	}
};
var reasignarZonaPrimeraClase = function(zona){
	var reasignar = confirm("Ya no quedan lugar en zona " + zona + ":( \n ¿Quieres reservar tu asiento en zona Primera Clase?")
	if(reasignar == true){
		verificarZonaPrimeraClase();
	} else {
		proximoVuelo();
	}
};

var proximoVuelo = function(){
	alert("Próximo vuelo sale en tres horas");
};
pintarAsientos(asientosAerolinea);
reservar();