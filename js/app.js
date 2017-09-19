var airlineSeats = [false, false, false, false, false, false, false, false, false, false];

var paintSeats = function(array){
	var container = document.getElementById("asientos");
	for(var i=1; i <= array.length; i++){
		var seat = document.createElement("div");
		seat.className = "col-2 asiento";
		seat.style.background = "green";
		seat.style.margin = "2px";
		container.appendChild(seat);
	}
};

var reserve = function(){
	var btn = document.getElementById("boton");
	btn.addEventListener("click", chooseZone);
};

var chooseZone = function(){
	var choice = prompt("¿En qué zona prefieres reservar tu asiento? \n 1.Primera Clase \n 2.Económica \n \n Por favor ingresa el número")
	if(choice == 1){
		checkFirstClassZone();
	} else if(choice == 2){
		checkEconomicZone();
	} else {
		alert("Ingresa númer valido");
	}
};

var checkFirstClassZone = function(){
	var zone = "Primera Clase";
	for(var index = 0; index<4; index++){
		if(airlineSeats[index] == false){
			airlineSeats[index] = true;
			reserveSeat(index);
			paintTicket(index, zone);
			break;
		} else if(index == 3 && airlineSeats[index] == true){
			reasigneEconomicZone(zone);
		}
	}
};

var checkEconomicZone = function(){
	var zone = "Económica";
	for(var index = 4; index<=9; index++){
		if(airlineSeats[index] == false){
			airlineSeats[index] = true;
			reserveSeat(index);
			paintTicket(index, zone);
			break;
		} else if(index == 9 && airlineSeats[index] == true){
			reasigneFirstClassZone(zone);
		}
	}
};

var reserveSeat = function(indexToPaint){
	var arraySeats = [];
	var seats = document.getElementsByClassName("asiento");
	arraySeats.push(seats);
	for(var index=0; index<arraySeats.length; index++){
		if(index == indexToPaint){
			arraySeats[indexToPaint].textContent = "Ocupado";
		}
	}
}

var paintTicket = function(index, zone){
	var ticketContainer = document.getElementById("ticket");
	var ticket = document.createElement("div");
	ticket.className = "col-6";
	ticket.style.border = "1px solid black";
	var title = document.createElement("p");
	var reservedSeating = document.createElement("p");
	var zoneClass = document.createElement("p");
	title.textContent = "Pase de abordar";
	reservedSeating.textContent = "No. de asiento " + (index + 1);
	zoneClass.textContent = "Clase: " + zone;
	ticket.appendChild(title);
	ticket.appendChild(reservedSeating);
	ticket.appendChild(zoneClass);
	ticketContainer.appendChild(ticket);
};
var reasigneEconomicZone = function(zone){
	var reasigne = confirm("Ya no quedan lugar en zona " + zone + ":( \n ¿Quieres reservar tu asiento en zona Económica?");
	if(reasigne == true){
		checkEconomicZone();
	} else{
		nextFlight();
	}
};
var reasigneFirstClassZone = function(zone){
	var reasigne = confirm("Ya no quedan lugar en zona " + zone + ":( \n ¿Quieres reservar tu asiento en zona Primera Clase?")
	if(reasigne == true){
		checkFirstClassZone();
	} else {
		nextFlight();
	}
};

var nextFlight = function(){
	alert("Próximo vuelo sale en tres horas");
};
paintSeats(airlineSeats);
reserve();