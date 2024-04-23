//Reto 4: Sistema de gestion de eventos

const eventList = [];
let exit = true;
let userInput;
let ids = 0;
let nameEvent;
let DateEvent;
let DescriptionEvent;
while (exit) {
  // Sistema de gestion de eventos

  do {
    userInput = prompt(
      `Por favor ingresa una de las siguientes opciones: \n1. Crear un evento \n2. Ver eventos\n3. Buscar eventos por nombre\n4. Actualizar evento\n5. Eliminar evento\n6. Salir`
    );
  } while (!["1", "2", "3", "4", "5", "6"].includes(userInput));

  switch (userInput) {
    case "1":
      do {
        nameEvent = prompt("Por favor ingresa el nombre del evento")
          .trim()
          .toLocaleLowerCase();
      } while (!nameEvent);

      do {
        DateEvent = prompt(
          "Por favor ingresa la fecha del evento (YYYY-MM-DD): "
        );
      } while (
        !DateEvent ||
        !DateEvent.includes("-") ||
        DateEvent.split("-").length !== 3 ||
        !/^[0-9-]{10}$/.test(DateEvent) ||
        DateEvent.split("-")[0].length !== 4 ||
        DateEvent.split("-")[1].length !== 2 ||
        DateEvent.split("-")[2].length !== 2
      );

      do {
        DescriptionEvent = prompt(
          "Por favor ingresa la descripcion del evento: "
        )
          .trim()
          .toLocaleLowerCase();
      } while (!DescriptionEvent);

      const newEvent = Object.assign(
        {},
        {
          id: ++ids,
          name: nameEvent,
          date: DateEvent,
          description: DescriptionEvent,
        }
      );

      eventList.push(newEvent);

      break;
    case "2":
      break;
    case "3":
      break;
    case "4":
      break;
    case "5":
      break;
    case "6":
      alert("Ok que tengas un buen dia. Adios");
      exit = false;
      break;
  }

  break;
}
