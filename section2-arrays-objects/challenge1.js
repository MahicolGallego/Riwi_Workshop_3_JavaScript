let userSelection;

//Regla para verificar las el formato del dato de notas
// const onlyNumbersAndComma = new RegExp("^[0-9,]$");

while (true) {
  do {
    userSelection = prompt(
      "Calculadora de promedios de calificaciones por estudiante\n1. Calcular promedio\n2. salir"
    ).trim();
  } while (userSelection !== "1" && userSelection !== "2");

  if (userSelection === "2") {
    alert("Que tengas un buen dia. Adios!");
    break;
  } else {

    //Preguntamos y verifcamos las notas del estudiante
    const  marksStudent = prompt(
        "Por favor indica las notas del estudiante separadas por comas(,)"
      ).trim();

    //Usamos .map para llenar la lista con los numberos separados y casteados para poder operar con ellos

    const arrayNotasInNumber = marksStudent.split(",").map(element => Number(element)) 

    //Con punto reduce obtnemos la suma y luego le sacamos el promedio

    const averageMarks = (arrayNotasInNumber.reduce((suma, element) => suma + element)) / arrayNotasInNumber.length;

    alert(`El promedio de notas para este estudiante es de: ${averageMarks}`)

  }
}
