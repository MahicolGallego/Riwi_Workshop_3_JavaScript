//Reto 2: Validador de Contraseñas seguras

let validateQuantity;
let validateNum;
let validateLetter;
let validateSpecialCharacter;
let messageFeedback = "";
let specialCharacters = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "+",
  "=",
  "_",
  "-",
  "{",
  "}",
  "[",
  "]",
  ":",
  ";",
  '"',
  "'",
  "?",
  "<",
  ">",
  ",",
  ".",
  "|",
  "/",
  "\\",
  "~",
  "`",
];

function builderMessageFeedBackRequeriments(
  validate,
  propertyRequired,
  message
) {
  if (propertyRequired === "special character") {
    if (validate) {
      message += "\nContiene caracter especial: Cumple";
    } else {
      message += "\nContiene caracter especial: No cumple";
    }
  } else if (propertyRequired === "number") {
    if (validate) {
      message += "\nContiene numeros: Cumple";
    } else {
      message += "\nContiene numeros: No cumple";
    }
  } else if (propertyRequired === "letter") {
    if (validate) {
      message += "\nContiene letras: Cumple";
    } else {
      message += "\nContiene letras: No Cumple";
    }
  } else {
    if (validate) {
      message += "\nContiene minimo 8 caracteres: Cumple";
    } else {
      message += "\nContiene minimo 8 caracteres: No cumple";
    }
  }

  return message;
}

while (true) {
  let passwordUser = prompt("Validar contraseña segura. indica la contraseña")
    .trim()
    .toLowerCase();

  passwordUser.length >= 8
    ? (validateQuantity = true)
    : (validateQuantity = false);

  for (let i = 0; i < passwordUser.length; i++) {
    let character = passwordUser.charAt(i);
    // console.log(character);
    if (specialCharacters.includes(character)) {
      validateSpecialCharacter = true;
    } else if (
      isNaN(character) &&
      character !== " " &&
      !specialCharacters.includes(character)
    ) {
      validateLetter = true;
    } else if (!isNaN(Number(character))) {
      validateNum = true;
    }
  }

  // console.log(
  //   validateQuantity,
  //   validateNum,
  //   validateLetter,
  //   validateSpecialCharacter
  // );

  messageFeedback = builderMessageFeedBackRequeriments(
    validateQuantity,
    "quantity",
    messageFeedback
  );

  messageFeedback = builderMessageFeedBackRequeriments(
    validateNum,
    "number",
    messageFeedback
  );

  messageFeedback = builderMessageFeedBackRequeriments(
    validateLetter,
    "letter",
    messageFeedback
  );

  messageFeedback = builderMessageFeedBackRequeriments(
    validateSpecialCharacter,
    "special character",
    messageFeedback
  );

  if (
    validateSpecialCharacter &&
    validateLetter &&
    validateNum &&
    validateQuantity
  ) {
    alert(`Tu contraseña es segura\n${messageFeedback}`);
    break;
  } else {
    alert(
      `Tu contraseña no es segura\n${messageFeedback}\n\nIntentalo de nuevo`
    );
    messageFeedback = "";
    validateSpecialCharacter = false;
    validateQuantity = false;
    validateLetter = false;
    validateNum = false;
  }
}
