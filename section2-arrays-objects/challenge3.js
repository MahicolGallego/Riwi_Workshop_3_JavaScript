// Sistema de gestion de inventario

let exit = false;
const productsInventory = [];
const blacklistedProducts = [];
let id = 0;
const badWords = ["palabra1", "palabra2", "palabra3", "palabra4", "palabra5"];

// functions

function questionWithNumberVerification(text) {
  let userAnswer;
  while (true) {
    userAnswer = Number(
      prompt(text + "\n(Si no indicas nada se tomara como 0)").trim()
    );
    if (!isNaN(userAnswer)) {
      break;
    }
    alert("Indica un dato numerico por favor");
  }
  return userAnswer;
}

function questionWithStringVerification(text) {
  let userAnswer;
  while (true) {
    userAnswer = prompt(text).trim().toLowerCase();
    if (userAnswer !== "") {
      break;
    }
    alert("Completa el campo por favor");
  }
  return userAnswer;
}

function verifyEmptyInventory(inventory) {
  if (inventory.length === 0) {
    return true;
  }
  return;
}

function showInventory(inventory, blacklistWords) {
  let message =
    "Inventario\n(Para las descripciones con malas palabras, Descripciones = ***)\n";
  emptyInventory = verifyEmptyInventory(inventory);
  if (emptyInventory) {
    return (message += "\nEl inventario esta vacio");
  }

  let haveBadWord;
  inventory.forEach((element, index) => {
    element.productDescription.split(" ").forEach((word) => {
      if (blacklistWords.includes(word)) {
        haveBadWord = true;
      }
    });

    message += `\n${index + 1}. Producto: ${element.productName}\nPrecio: ${
      element.productPrice
    }\nCantidad: ${element.productQuantity}\nDescripcion: ${
      haveBadWord ? "***" : element.productDescription
    }\n`;
    haveBadWord = false;
  });

  return message;
}

function showInventoryBlackList(inventory) {
  let message = "Blacklist de productos por malas palabras en su descripcion\n";
  emptyInventory = verifyEmptyInventory(inventory);
  if (emptyInventory) {
    return (message += "\nEl inventario esta vacio");
  }

  inventory.forEach((element, index) => {
    message += `\n${index + 1}. Producto: ${element.productName}\nPrecio: ${
      element.productPrice
    }\nCantidad: ${element.productQuantity}\nDescripcion: ${
      element.productDescription
    }\n`;
  });

  return message;
}

while (!exit) {
  const userAction = prompt(`Por favor ingresa una de las siguientes opciones: 
                            \n 1. Agregar un producto
                            \n 2. Ver/Buscar productos
                            \n 3. Actualizar producto
                            \n 4. Eliminar producto
                            \n 5. Venta de productos
                            \n 6. Compra de productos
                            \n 7. Calculo valor total de inventario
                            \n 8. Ordenar productos
                            \n 9. Identificacion de productos con malas palabras
                            \n 10. Reporte general de productos
                            \n 11. Salir del sistema
                            `);
  switch (userAction) {
    case "1":
      // solicitamos los datos del producto
      const productName = questionWithStringVerification(
        "Por favor ingresa el nombre del producto: "
      );

      // Preguntamos si el producto existe en el inventario
      // para dado el caso duplicarlo y añadir el sufijo,
      // para ello implementamos un contador

      let counterProductExist = 0;
      productsInventory.forEach((element) => {
        if (element.productName.startsWith(productName)) {
          counterProductExist++;
        }
      });

      if (counterProductExist) {
        let DuplicateProduct;
        do {
          DuplicateProduct = prompt(
            `ya existe en el inventario un producto con nombre similar o igual, ¿deseas registrarlo como un duplicado?\nY: si\nN: no`
          ).toLowerCase();
        } while (DuplicateProduct !== "y" && DuplicateProduct !== "n");

        // si si lo desea duplicar
        if (DuplicateProduct === "y") {
          for (let element of productsInventory) {
            if (element.productName.startsWith(productName)) {
              // duplicamos el producto
              const productCopy = element;
              //Le damos el formato correcto
              const newDuplicatedProduct = Object.assign(
                {},
                {
                  id: id++,
                  productName:
                    productCopy.productName + " copy " + counterProductExist,
                  productPrice: productCopy.productPrice,
                  productQuantity: productCopy.productQuantity,
                  productDescription: productCopy.productDescription,
                }
              );
              // agregamos el producto al inventario
              productsInventory.push(newDuplicatedProduct);

              //Preguntamos si el producto contiene badWords en la descripcion para añadirlo a la blacklistedproduct

              let haveBadWord = false;
              newDuplicatedProduct.productDescription
                .split(" ")
                .forEach((element) => {
                  if (badWords.includes(element)) {
                    console.log("bad word: " + element);
                    haveBadWord = true;
                  }
                });

              // lo añadimos si tiene BackWords

              if (haveBadWord) {
                blacklistedProducts.push(newDuplicatedProduct);
              }

              console.log(blacklistedProducts);

              alert(
                `El producto ha sido añadido con el nombre de ${
                  productsInventory[productsInventory.length - 1].productName
                }`
              );
              break;
            }
          }
          break;
        }
      }

      const productPrice = questionWithNumberVerification(
        "Por favor ingresa el precio del producto: "
      );

      const productQuantity = questionWithNumberVerification(
        "Por favor ingresa la cantidad del producto: "
      );
      const productDescription = questionWithStringVerification(
        "Por favor ingresa la descripcion del producto: "
      );
      // creamos el producto como objeto
      const product = Object.assign(
        {},
        {
          id: ++id,
          productName,
          productPrice,
          productQuantity,
          productDescription,
        }
      );
      // agregamos el producto al inventario
      productsInventory.push(product);
      alert(`El producto ha sido añadido`);

      //Preguntamos si el producto contiene badWords en la descripcion para añadirlo a la blacklistedproduct

      let haveBadWord = false;
      product.productDescription.split(" ").forEach((element) => {
        if (badWords.includes(element)) {
          haveBadWord = true;
        }
      });

      // lo añadimos si tiene BackWords

      if (haveBadWord) {
        blacklistedProducts.push(product);
      }

      break;
    case "2":
      searchProducts: while (true) {
        const typeSearch = prompt(
          `${showInventory(
            productsInventory,
            badWords
          )}\n1. Buscar productos por nombre\n2. Buscar productos por rango de precio\n3. Volver a atras`
        );

        switch (typeSearch) {
          case "1":
            const productNameToSearch = prompt(
              "Por favor ingresa el nombre del producto a buscar: "
            )
              .trim()
              .toLowerCase();

            const productsFound = productsInventory.filter((product) =>
              product.productName.includes(productNameToSearch)
            );

            if (!productsFound.length) {
              alert(
                "No se encontraron coincidencias de productos con ese nombre"
              );
              break searchProducts;
            }

            alert(
              `Busqueda por: ${productNameToSearch}\n\n${showInventory(
                productsFound,
                badWords
              )}`
            );
            break searchProducts;

          case "2":
            const productPriceToSearch1 = questionWithNumberVerification(
              "Por favor ingresa el primer valor para el rango de precio: "
            );

            const productPriceToSearch2 = questionWithNumberVerification(
              "Por favor ingresa el segundo valor para el rango de precio: "
            );

            const productsFoundByPrice = productsInventory.filter((product) =>
              productPriceToSearch2 < productPriceToSearch1
                ? product.productPrice >= productPriceToSearch2 &&
                  product.productPrice <= productPriceToSearch1
                : product.productPrice >= productPriceToSearch1 &&
                  product.productPrice <= productPriceToSearch2
            );

            if (!productsFoundByPrice.length) {
              alert(
                "No se encontraron coincidencias de productos entre ese rango de precios"
              );
              break searchProducts;
            }

            alert(
              `Busqueda entre: $${
                productPriceToSearch2 < productPriceToSearch1
                  ? productPriceToSearch2 + " - $" + productPriceToSearch1
                  : productPriceToSearch1 + " - $" + productPriceToSearch2
              }\n\n${showInventory(productsFoundByPrice, badWords)}`
            );
            break searchProducts;

          case "3":
            break searchProducts;

          default:
            alert("indica una opcion valida");
            break;
        }
      }
      break;
    case "3":
      if (!productsInventory.length) {
        alert("No existen productos registrados");
        break;
      }

      let indexByUpdate = questionWithNumberVerification(
        `Inventario\n${showInventory(
          productsInventory,
          badWords
        )}\nEscribe el numero correspondiente en la lista al producto que deseas actualizar: `
      );

      if (
        Number(indexByUpdate) - 1 >= productsInventory.length ||
        Number(indexByUpdate) - 1 < 0
      ) {
        alert("El producto no existe en el inventario");
        break;
      }

      const nameForUpdate = prompt(
        "Escribe el nombre al que deseas actualizar\nSi no deseas actualizar el nombre, solo presiona enter"
      )
        .trim()
        .toLowerCase();

      let priceForUpdate;
      while (true) {
        priceForUpdate = prompt(
          "Escribe el precio al que deseas actualizar\nSi no deseas actualizar el precio, solo presiona enter"
        ).trim();
        if (!isNaN(priceForUpdate)) {
          break;
        }
        alert("Indica un dato valido por favor");
      }

      let quantityForUpdate;
      while (true) {
        quantityForUpdate = prompt(
          "Escribe la cantidad a la que deseas actualizar\nSi no deseas actualizar la cantidad, solo presiona enter"
        ).trim();
        if (!isNaN(quantityForUpdate)) {
          break;
        }
        alert("Indica un dato valido por favor");
      }

      const descriptionForUpdate = prompt(
        "Escribe la descripcion a la que deseas actualizar\nSi no deseas actualizar la descripcion, solo presiona enter"
      )
        .trim()
        .toLowerCase();

      if (nameForUpdate) {
        productsInventory[indexByUpdate - 1].productName = nameForUpdate;
      }
      if (priceForUpdate) {
        productsInventory[indexByUpdate - 1].productPrice = priceForUpdate;
      }
      if (quantityForUpdate) {
        productsInventory[indexByUpdate - 1].productQuantity =
          quantityForUpdate;
      }

      if (descriptionForUpdate) {
        productsInventory[indexByUpdate - 1].productDescription =
          descriptionForUpdate;
      }

      alert(`El producto ha sido actualizado`);

      break;
    case "4":
      if (!productsInventory.length) {
        alert("No existen productos registrados");
        break;
      }

      let indexByDelete = questionWithNumberVerification(
        `Inventario\n${showInventory(
          productsInventory,
          badWords
        )}\nEscribe el numero correspondiente en la lista al producto que deseas actualizar: `
      );

      if (
        Number(indexByDelete) - 1 >= productsInventory.length ||
        Number(indexByDelete) - 1 < 0
      ) {
        alert("El producto no existe en el inventario");
        break;
      }

      productsInventory.splice(indexByDelete - 1, 1);
      alert("Producto eliminado");
      break;
    case "5":
      const productSell = questionWithStringVerification(
        "Nombre del producto a vender"
      );

      const productSellFound = productsInventory.find(
        (element) => element.productName === productSell
      );

      if (!productSellFound) {
        alert("El producto no existe en el inventario");
        break;
      }

      const quantitySell = questionWithNumberVerification("Cantidad a vender");

      if (!quantitySell) {
        alert("Has indicado 0, venta no realizada");
        break;
      }

      if (productSellFound.productQuantity >= quantitySell) {
        productSellFound.productQuantity -= quantitySell;
        alert(
          `Venta realizada\nStock del producto actualizado: ${productSellFound.productQuantity}`
        );
      }

      break;
    case "6":
      const productBuy = questionWithStringVerification(
        "Nombre del producto a comprar"
      );

      const productBuyFound = productsInventory.find(
        (element) => element.productName === productBuy
      );

      if (!productBuyFound) {
        alert("El producto no existe en el inventario");
        break;
      }

      const quantityBuy = questionWithNumberVerification("Cantidad a comprar");

      if (!quantityBuy) {
        alert("Has indicado 0, compra no realizada");
        break;
      }

      productBuyFound.productQuantity += quantityBuy;

      alert(
        `Compra realizada\nStock del producto actualizado: ${productBuyFound.productQuantity}`
      );

      break;
    case "7":
      const totalValueInventory = productsInventory.reduce(
        (acc, currentElement) =>
          (acc += currentElement.productQuantity * currentElement.productPrice),
        0
      );

      alert(`Inventario valuado en: $${totalValueInventory}`);

      break;
    case "8":
      orderProducts: while (true) {
        const typeOrder = prompt(
          `1. Ordenar productos por nombre\n2. Ordenar productos por precio\n3. Volver a atras`
        );

        switch (typeOrder) {
          case "1":
            while (true) {
              const howToOrder = prompt(
                `Como ordenar\n\n1. Ascendente \n2. Descendente`
              );

              if (howToOrder === "1") {
                productsInventory.sort((elementA, elementB) =>
                  elementB.productName.localeCompare(elementA.productName)
                );

                alert(showInventory(productsInventory, badWords));

                break orderProducts;
              } else if (howToOrder === "2") {
                productsInventory.sort((elementA, elementB) =>
                  elementA.productName.localeCompare(elementB.productName)
                );

                alert(showInventory(productsInventory, badWords));

                break orderProducts;
              } else {
                alert("indica una opcion valida");
              }
            }

          case "2":
            while (true) {
              const howToOrder = prompt(
                `Como ordenar\n\n1. Ascendente \n2. Descendente`
              );

              if (howToOrder === "1") {
                productsInventory.sort(
                  (elementA, elementB) =>
                    elementB.productPrice - elementA.productPrice
                );

                alert(showInventory(productsInventory, badWords));

                break orderProducts;
              } else if (howToOrder === "2") {
                productsInventory.sort(
                  (elementA, elementB) =>
                    elementA.productPrice - elementB.productPrice
                );

                alert(showInventory(productsInventory, badWords));

                break orderProducts;
              } else {
                alert("indica una opcion valida");
              }
            }

          case "3":
            break orderProducts;

          default:
            alert("indica una opcion valida");
            break;
        }
      }
      break;
    case "9":
      alert(showInventoryBlackList(blacklistedProducts));
      break;
    case "10":
      // reporte general de productos:
      //cantidad de productos

      const quantityProducts = productsInventory.length;

      //valor total del inventario

      const totalValue = productsInventory.reduce(
        (acc, currentElement) =>
          (acc += currentElement.productQuantity * currentElement.productPrice),
        0
      );

      //cantidad de productos más caros

      //generamos una lista solo con los precios para luego filtar

      const allPriceProducts = productsInventory.map(
        (product) => product.productPrice
      );

      //filtramos preguntando por max/min

      const expensiveProducts = allPriceProducts.filter(
        (element) => element === Math.max(...allPriceProducts)
      );

      //cantidad de productos más baratos

      const cheapestProducts = allPriceProducts.filter(
        (element) => element === Math.min(...allPriceProducts)
      );

      //cantidad de productos con mayor cantidad disponible (metodo profe)

      const mostAvailableProducts = productsInventory.filter(
        (element) =>
          element.productQuantity ===
          Math.max(
            ...productsInventory.map((element) => element.productQuantity)
          )
      );

      //cantidad de productos con menor cantidad disponible

      const leastAvailableProducts = productsInventory.filter(
        (element) =>
          element.productQuantity ===
          Math.min(
            ...productsInventory.map((element) => element.productQuantity)
          )
      );

      //cantidad de productos con posibles malas palabras en la descripción.

      const productsWithBadWords = blacklistedProducts.length;

      //Mostrar balance general

      alert(
        `Balance general inventario\n\nCantidad de productos: ${quantityProducts}\nValor total del inventario: ${totalValue}\nCantidad de productos mas caros: ${expensiveProducts.length}\nCantidad de productos mas baratos: ${cheapestProducts.length}\nCantidad de productos con mas stock disponible: ${mostAvailableProducts.length}\nCantidad de productos con menos stock disponible: ${leastAvailableProducts.length}\nCantidad de productos con posibles malas palabras en su descripcion: ${productsWithBadWords}`
      );
      break;
    case "11":
      exit = true;
      break;
    default:
      alert("Indica una opcion valida por favor");
      break;
  }
}
