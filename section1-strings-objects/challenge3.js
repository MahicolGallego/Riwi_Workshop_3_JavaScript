//Reto 3: Validador de Correos Electrónicos
while (true) {
  const emailUSer = prompt(
    "Validar correo electronico\n\nIngresa tu correo electronico"
  )
    .trim()
    .toLowerCase();

  const checkHasAt = (email) => email.includes("@");

  const checkHasDotAfterAt = function (email) {
    if (!checkHasAt(email)) return false;

    return email.split("@")[1].includes(".");
  };

  const checkAtAndDotNotTogheter = (email) => {
    if (!checkHasAt(email)) return false;

    return !email.includes("@.");
  };

  const checkHasNotEmptySpace = (email) => !email.includes(" ");

  const validateHasAt = checkHasAt(emailUSer);
  const validateHasDotAfterAt = checkHasDotAfterAt(emailUSer);
  const validateAtAndDotNotTogheter = checkAtAndDotNotTogheter(emailUSer);
  const validateHasNotEmptySpace = checkHasNotEmptySpace(emailUSer);

  if (
    !validateHasAt ||
    !validateHasDotAfterAt ||
    !validateAtAndDotNotTogheter ||
    !validateHasNotEmptySpace
  ) {
    alert("Formato de correo incorrecto");
  } else {
    alert("Formato de correo correcto");
    break;
  }
}
