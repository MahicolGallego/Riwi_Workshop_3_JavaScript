//Reto 4: Sistema de gestion de eventos

const eventList = [];
// let exit = true;
let userInput;
let ids = 0;
let nameEvent;
let DateEvent;
let DescriptionEvent;

mainProgram: while (true) {
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
          nameEvent,
          DateEvent,
          DescriptionEvent,
        }
      );

      eventList.push(newEvent);

      console.log(eventList[eventList.length - 1]);

      alert("Evento registrado");
      break;
    case "2":
      if (!eventList[0]) {
        alert("No existen eventos registrados");
      } else {
        let message = "";
        eventList.forEach(
          (eventCurent, index) =>
            (message += `\n${index + 1}. Nombre del evento: ${
              eventCurent.nameEvent
            }\nFecha del evento: ${
              eventCurent.DateEvent
            }\nDescripcion del evento: ${eventCurent.DescriptionEvent}\n`)
        );

        alert(`Lista de eventos\n${message}`);
      }
      break;
    case "3":
      if (!eventList.length) {
        alert("No existen eventos registrados");
      } else {
        let message = "";
        const nameBySearch = prompt(
          "Ingresa el nombre del evento que deseas consultar"
        )
          .trim()
          .toLowerCase();
        eventList.forEach((eventCurent) => {
          if (eventCurent.nameEvent.includes(nameBySearch)) {
            message += `\nNombre del evento: ${eventCurent.nameEvent}\nFecha del evento: ${eventCurent.DateEvent}\nDescripcion del evento: ${eventCurent.DescriptionEvent}\n`;
          }
        });
        if (!message) {
          alert("No existen eventos registrados con el nombre indicado");
        } else {
          alert(`Busqueda: ${nameBySearch}\n${message}`);
        }
      }
      break;
    case "4":
      if (!eventList.length) {
        alert("No existen eventos registrados");
      } else {
        let message = "";
        eventList.forEach(
          (eventCurent, index) =>
            (message += `\n${index + 1}. Nombre del evento: ${
              eventCurent.nameEvent
            }\nFecha del evento: ${
              eventCurent.DateEvent
            }\nDescripcion del evento: ${eventCurent.DescriptionEvent}\n`)
        );

        let indexByUpdate;

        do {
          indexByUpdate = prompt(
            `Lista de eventos\n${message}\nEscribe el numero correspondiente en la lista al evento que deseas actualizar: `
          );
        } while (!/^[0-9]$/.test(indexByUpdate));

        if (
          Number(indexByUpdate) - 1 >= eventList.length ||
          Number(indexByUpdate) - 1 < 0
        ) {
          alert("El evento no existe en la lista");
        } else {
          const nameForUpdate = prompt(
            "Escribe el nombre al que deseas actualizar\nSi no deseas actualizar el nombre, solo presiona enter"
          ).toLowerCase();

          let dateForUpdate;

          do {
            dateForUpdate = prompt(
              "Escribe la fecha a la que deseas actualizar (YYYY-MM-DD)\nSi no deseas actualizar la fecha, solo presiona enter"
            ).toLowerCase();
          } while (
            Number(dateForUpdate) !== 0 &&
            (!dateForUpdate.includes("-") ||
              dateForUpdate.split("-").length !== 3 ||
              !/^[0-9-]{10}$/.test(dateForUpdate) ||
              dateForUpdate.split("-")[0].length !== 4 ||
              dateForUpdate.split("-")[1].length !== 2 ||
              dateForUpdate.split("-")[2].length !== 2)
          );

          const DescriptionForUpdate = prompt(
            "Escribe la descripcion a la que deseas actualizar\nSi no deseas actualizar la descripcion, solo presiona enter"
          ).toLowerCase();

          if (nameForUpdate)
            eventList[indexByUpdate - 1].nameEvent = nameForUpdate;

          if (dateForUpdate)
            eventList[indexByUpdate - 1].DateEvent = dateForUpdate;

          if (DescriptionForUpdate)
            eventList[indexByUpdate - 1].DescriptionEvent =
              DescriptionForUpdate;

          alert("Actualizacion terminada");
        }
      }
      break;
    case "5":
      if (!eventList.length) {
        alert("No existen eventos registrados");
      } else {
        let message = "";
        eventList.forEach(
          (eventCurent, index) =>
            (message += `\n${index + 1}. Nombre del evento: ${
              eventCurent.nameEvent
            }\nFecha del evento: ${
              eventCurent.DateEvent
            }\nDescripcion del evento: ${eventCurent.DescriptionEvent}\n`)
        );

        let indexByDelete;

        do {
          indexByDelete = prompt(
            `Lista de eventos\n${message}\nEscribe el numero correspondiente en la lista al evento que deseas eliminar: `
          );
        } while (!/^[0-9]$/.test(indexByDelete));

        if (
          Number(indexByDelete) - 1 >= eventList.length ||
          Number(indexByDelete) - 1 < 0
        ) {
          alert("El evento no existe en la lista");
        } else {
          // eventList = eventList.filter(
          //   (element, index) => index !== indexByDelete - 1
          // );
          // console.log(eventList);

          eventList.splice(indexByDelete - 1, 1);
          alert("Evento eliminado");
        }
      }
      break;
    case "6":
      alert("Ok. Que tengas un buen dia. Adios");
      // exit = false;
      // break;
      break mainProgram;
  }
}
