//llenamos los asientos con false para representar que no han sido ocupados
//un asiento ocupado == true
var airlineSeats = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false
];

//contador que servirá para rastrear el número de asientos ocupados en el vuelo
var busySeats = 0;

var paintSeats = function(array) {
  /* notar el selector afuera del for.¿Cuantas veces necesitamos
  seleccionar el contenedor?*/
  var container = document.getElementById("seats");
  for (var i = 1; i <= array.length; i++) {
    // el array que llega como parametro lo usamos para pintar el DOM
    var seat = document.createElement("div");
    seat.className = "col-2 asiento";
    seat.style.margin = "2px";
    // los primeros 4 los pintamos de un color
    // los ultimos 6 de otro
    if (i <= 4) {
      seat.style.background = "purple";
    } else {
      seat.style.background = "blue";
    }
    // appendChild agrega el DIV recien creado al contenedor
    container.appendChild(seat);
  }
};

var reserve = function() {
  var btn = document.getElementById("btn");
  btn.addEventListener("click", chooseZone);
};

var chooseZone = function() {
  var choice = prompt(
    "¿En qué zona prefieres reservar tu asiento? \n 1.Primera Clase \n 2.Económica \n \n Por favor ingresa el número"
  );
  if (choice == 1) {
    checkFirstClassZone();
  } else if (choice == 2) {
    checkEconomicZone();
  } else {
    alert("Ingresa númer valido");
  }
};

var checkFirstClassZone = function() {
  var zone = "Primera Clase";
  // con este for recorremos los asientos del 1 al 4
  for (var index = 0; index < 4; index++) {
    // si el asiento no esta ocupado lo reservamos
    if (airlineSeats[index] == false) {
      airlineSeats[index] = true;
      reserveSeat(index);
      paintTicket(index, zone);
      //Nuestro contador de rastreo de asientos ocupados incrementa cada que se reserva un lugar
      busySeats++;
      // el break nos sirve para dejar de recorrer el arreglo
      // ya que hemos reservado, no necesitamos recorrer mas el arreglo
      break;
    } else if (index == 3 && airlineSeats[index] == true) {
      // si ya estan ocupados todos los de primera clase, reservamos en económica
      reasigneEconomicZone(zone);
    }
  }
};

var checkEconomicZone = function() {
  var zone = "Económica";
  // con este for recorremos los asientos del 5 al 10
  for (var index = 4; index <= 9; index++) {
    if (airlineSeats[index] == false) {
      // si el asiento no esta ocupado lo reservamos
      airlineSeats[index] = true;
      reserveSeat(index);
      paintTicket(index, zone);
      //Nuestro contador de rastreo de asientos ocupados incrementa cada que se reserva un lugar
      busySeats++;
      // el break nos sirve para dejar de recorrer el arreglo
      // ya que hemos reservado, no necesitamos recorrer mas el arreglo
      break;
    } else if (index == 9 && airlineSeats[index] == true) {
      // si ya estan ocupados todos los de clase económica, reservamos en primera clase
      reasigneFirstClassZone(zone);
    }
  }
};

var reserveSeat = function(indexToPaint) {
  var seats = document.getElementsByClassName("asiento");
  // el indice a pintar ahora va a decir que esta ocupado
  seats[indexToPaint].textContent = "Ocupado";
};

var paintTicket = function(index, zone) {
  //para imprimir el pase de abordar necesitamos crear nuevos divs
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
var reasigneEconomicZone = function(zone) {
  //Aquí verificamos que si el contador es igual a 10 lo cual significaría que están los 10 lugares del avión ya ocupados
	if(busySeats == 10) {
    /*Si el contador es igual a 10 invocamos la función noSeats() que le indica al usuario que ya no hay asientos disponibles
     y luego invoca la función nextFlight() le indica que el próximo vuelvo sale en 3 horas.*/
    noSeats();
		nextFlight();
	} else {
  // si ya no hay en primera, preguntamos si quiere	económica
  var reasigne = confirm(
    "Ya no quedan lugar en zona " +
      zone +
      ":( \n ¿Quieres reservar tu asiento en zona Económica?"
  );
  if (reasigne == true) {
    checkEconomicZone();
  } else {
    nextFlight();
  }
  }
};
var reasigneFirstClassZone = function(zone) {
  //Aquí verificamos que si el contador es igual a 10 lo cual significaría que están los 10 lugares del avión ya ocupados
	if(busySeats == 10) {
    /*Si el contador es igual a 10 invocamos la función noSeats() que le indica al usuario que ya no hay asientos disponibles
     y luego invoca la función nextFlight() le indica que el próximo vuelvo sale en 3 horas.*/
    noSeats();
		nextFlight();
	} else {
  var reasigne = confirm(
    "Ya no quedan lugar en zona " +
      zone +
      ":( \n ¿Quieres reservar tu asiento en zona Primera Clase?"
  );
  // sis ya no hay en económica, preguntamos si quiere	primera
  if (reasigne == true) {
    checkFirstClassZone();
  } else {
    nextFlight();
  }
  }
};

var nextFlight = function() {
  alert("Próximo vuelo sale en tres horas");
};

var noSeats = function(){
  alert("Ya no hay asientos disponibles, lo sentimos! :(");
};
// pintamos los asientos por primera vez usando el arreglo de estado
paintSeats(airlineSeats);
// reserva agrega el los eventos on click necesarios
reserve();
