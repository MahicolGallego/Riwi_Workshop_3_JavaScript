/* Reto 1: Generador de Nombres de Usuario (username) y Correos Electrónicos (email) con el dominio
myDomain.com */

const users = { mahgal: "mahgal@myDomain.com" };

let fullName = prompt("Ingresa tu nombre completo por favor")
  .toLocaleLowerCase()
  .trim();

let userName = fullName.split(" ")[0].slice(0, 3);

let userLastname = fullName.split(" ")[1].slice(0, 3);

// console.log(userName, userLastname);

let userCreated = userName.concat(userLastname);

let emailCreated = userCreated + "@myDomain.com";

if (Object.keys(users).includes(userCreated)) {
  alert(
    "La clave ya existia en el objeto. Se modifica con el nro 1 como prefijo al dominio del correo"
  );
  userCreated = userCreated + "1";
  emailCreated = userCreated + "@myDomain.com";
  users[userCreated] = emailCreated;
  alert("Agregado con exito");
} else {
  users[userCreated] = emailCreated;
  alert("Agregado con exito");
}
