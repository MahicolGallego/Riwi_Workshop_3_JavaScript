//Reto 2: Calculadora de Estadísticas de Calificaciones

//Variables

let userSelection;

//Funtions

//Funcion para obtener la cantidad de estudiantes aprovados y reprovados

function howManyApprovedAndFailedStudents(list) {
  let approvedStudents = 0;
  list
    .filter((element) => element >= 70)
    .forEach((element) => approvedStudents++);

  let failedStudents = 0;
  list.filter((element) => element < 70).forEach((element) => failedStudents++);

  return [approvedStudents, failedStudents];
}

// Funcion constructora de mensaje de feedback al usuario
function feedbackMessageBuilder(
  listSorted,
  max,
  min,
  average,
  approvedStudents,
  failedStudents
) {
  let messageFeedback = "Resultados y estadisticas\n";

  listSorted.forEach(
    (element) =>
      (messageFeedback += `\n${element} -> ${
        element >= 70 ? "Aprobad@" : "Reprobad@"
      }`)
  );

  messageFeedback += `\n\nCalificacion/es mas alta: ${max}\nCalificacion/es mas baja: ${min}\nPromedio calificaciones: ${average}\n\nEstudiantes Aprobados: ${approvedStudents}\nEstudiantes Reprobados: ${failedStudents}`;

  return alert(messageFeedback);
}

while (true) {
  do {
    userSelection = prompt(
      "Calculadora de promedios y estadisticas de calificaciones de estudiantes\n1. Calcular promedios y estadisticas\n2. salir"
    ).trim();
  } while (userSelection !== "1" && userSelection !== "2");

  if (userSelection === "2") {
    alert("Que tengas un buen dia. Adios!");
    break;
  }

  let marksStudents;

  while (true) {
    marksStudents = prompt(
      "Por favor indica las notas de los estudiantes separadas por comas(,)\n(Calificaciones del 1 al 100)"
    ).trim();

    //Verificar que los datos se ingresen en el formato correcto
    if (
      marksStudents
        .split(",")
        .every(
          (element) =>
            !isNaN(element) &&
            element !== "" &&
            element.length <= 3 &&
            Number(element) >= 0 &&
            Number(element) <= 100
        )
    ) {
      marksStudents = marksStudents
        .split(",")
        .map((element) => Number(element));
      //   console.log(marksStudents);
      break;
    }

    alert(
      "Por favor ingrese los datos en el formato correcto\n(Calificaciones del 1 al 100 y separados por comas(,), no indicar coma sino se ingresara un valor de nota despues)"
    );
  }

  //obtener minima con math.min y spread operator

  let markMin = Math.min(...marksStudents);
  //   console.log(markMin);

  //obtener maxima con reduce

  let markMax = marksStudents.reduce((acc, currentElement) => {
    if (currentElement > acc) {
      return (acc = currentElement);
    }
    return acc;
  });
  //   console.log(markMax);

  //obtener porcentaje con usando for of

  let averageMarks = 0;

  for (let i of marksStudents) {
    averageMarks += i;
  }

  //obtener porcentaje con usando for in

  //   for (let i in marksStudents) {
  //     averageMarks += marksStudents[i];
  //   }

  averageMarks = Number((averageMarks / marksStudents.length).toFixed(2));
  console.log(averageMarks);

  //ordenar lista de mayor a menor con sort

  const marksSorted = marksStudents.sort((a, b) => b - a);

  //   console.log(marksSorted);

  // Obtener cantidad de estudiantes aprobados y reprobados haciendo uso de la funcion creada y destructuracion

  const [approvedStudents, failedStudents] =
    howManyApprovedAndFailedStudents(marksSorted);

  //   console.log(approvedStudents);
  //   console.log(failedStudents);

  //Mostra feedback por medio de la funcion creada

  feedbackMessageBuilder(
    marksSorted,
    markMax,
    markMin,
    averageMarks,
    approvedStudents,
    failedStudents
  );
}
