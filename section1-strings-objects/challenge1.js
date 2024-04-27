/* Reto 1: Generador de Nombres de Usuario (username) y Correos Electrónicos (email) con el dominio
myDomain.com */

let actionUser;

const users = { mahgal: "mahgal@myDomain.com" };

const numRegExp = new RegExp("[0-9]");

let stockCounter = 0;

while (true) {
  while (true) {
    actionUser = prompt("Que deseas hacer\n\n1. Crear correo\n2. Salir");
    if (actionUser === "1" || actionUser === "2") {
      break;
    }
    alert("Por favor ingresa una opcion valida");
  }

  if (actionUser === "2") {
    alert("Que tengas buen dia. Adios");
    break;
  }

  let fullName;

  while (true) {
    fullName = prompt("Ingresa el nombre y apellido por favor")
      .toLowerCase()
      .trim();

    // console.log(numRegExp.test(fullName));

    if (
      fullName.split(" ").length === 2 &&
      fullName.split(" ")[0].length >= 3 &&
      fullName.split(" ")[1].length >= 3 &&
      !numRegExp.test(fullName)
    ) {
      break;
    }
    alert(
      "El nombre y el apellido deben separarse por espacio, cada uno tener como minimo 3 caracteres y sin numeros por favor"
    );
  }

  let userName = fullName.split(" ")[0].slice(0, 3);

  let userLastname = fullName.split(" ")[1].slice(0, 3);

  // console.log(userName, userLastname);

  let userCreated = userName.concat(userLastname);

  console.log(Object.keys(users).length);

  for (let i = 0; i < Object.keys(users).length; i++) {
    if (Object.keys(users)[i].includes(userCreated)) {
      stockCounter += 1;
    }

    console.log(stockCounter);
  }

  if (stockCounter) {
    alert(
      "El usuario generado ya existe. Se modifica añadiendo una unidad mas alta que la ultima coincidencia existente como prefijo al dominio del correo"
    );
    userCreated = userCreated + stockCounter;
  }

  let emailCreated = userCreated + "@myDomain.com";

  Object.assign(users, {
    [userCreated]: emailCreated,
  });
  alert("Agregado con exito");

  stockCounter = 0;

  console.log(users);
}
