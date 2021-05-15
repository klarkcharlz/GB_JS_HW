/*
1.Написать функцию, преобразующую число в объект. 
Передавая на вход число от 0 до 999, 
надо получить на выходе объект, 
в котором в соответствующих свойствах описаны единицы, 
десятки и сотни. 
Например, для числа 245 надо получить следующий объект: 
{‘единицы’: 5, ‘десятки’: 4, ‘сотни’: 2}. 
Если число превышает 999, 
необходимо выдать соответствующее сообщение с помощью console.log 
и вернуть пустой объект.
*/
console.log("Task № 1");

/**
 *
 * @param {number} number 0 - 999
 * @returns object {"hundreds": , "tens": , "units": }
 */
function createObj(number) {
  if (isNaN(number)) {
    console.log("Пожалуйста вводите числа.");
    return {};
  } else if (number > 999 || number < 0) {
    console.log(`Введенное число ${number} вне допустимого диапазона 0 - 999.`);
    return {};
  }

  number = ("000" + String(number)).slice(-3);

  let hundreds = number[0];
  let tens = number[1];
  let units = number[2];
  return { units: units, tens: tens, hundreds: hundreds };
}

let numbers = +prompt("Пожалуйста введите число от 0 до 999.");

let newObj = createObj(numbers);

console.log(newObj);

/*
2.Продолжить работу с интернет-магазином:
В прошлом домашнем задании вы реализовали корзину на базе массивов. 
Какими объектами можно заменить их элементы?
Реализуйте такие объекты.
Перенести функционал подсчета корзины на объектно-ориентированную базу.
*/
console.log("Task № 2");
// я так и сделал уже в предыдущей домашней работе

let basket = [
  { name: "Meat", price: 122.3 },
  { name: "Apple", price: 115.4 },
  { name: "Fish", price: 22.3 },
  { name: "beer,", price: 12.3 },
  { name: "bread,", price: 188.43 },
  { name: "Water", price: 1000.01 },
];

function fullPrice(bskt) {
  let total = 0;
  for (product of bskt) {
    total += product.price;
  }
  return total;
}

totalPrice = fullPrice(basket);

console.log(totalPrice);

/*
3.Подумать над глобальными сущностями. 
К примеру, сущность «Продукт» в интернет-магазине актуальна 
не только для корзины, но и для каталога. 
Стремиться нужно к тому, 
чтобы объект «Продукт» имел единую структуру для различных модулей сайта, 
но в разных местах давал возможность вызывать разные методы.
*/
console.log("Task № 3");

/**
 *
 * @param {string} type тип будущего обьекта, определяет доступные методы
 * @returns {object} product типа корзина или каталог
 */
function createProduct(type) {
  let product = {};

  if (type === "catalog") {
    // добавление продукта в каталог
    /**
     *
     * @param {string} name имя продукта
     * @param {number} price цена продукта
     */
    product.add_product = function (name, price) {
      product[name] = {
        price: price,
        counter: 0,
      };
    };
    // добавление продукта в корзину
    /**
     *
     * @param {object} basket корзина
     * @param {string} name имя продукта
     * @param {number} n количество
     */
    product.add_to_basket = function (basket, name, n) {
      basket[name] = {
        price: product[name]["price"],
        counter: product[name]["counter"] + n,
      };
    };
  }

  if (type === "basket") {
    // считаем общую стоимость товаров в корзине
    /**
     *
     * @returns {number} total_suma общая стоимость товаров в корзине
     */
    product.total_sum = function () {
      let total_suma = 0;
      for (let key in product) {
        if (typeof catalog[key] === "object") {
          total_suma += product[key]["price"] * product[key]["counter"];
        }
      }

      return total_suma;
    };
  }

  return product;
}

// создаем сущности для работы
let catalog = createProduct("catalog");
let backet = createProduct("basket");

// добавим товаров в каталог
catalog.add_product("Хлеб", 100);
catalog.add_product("Сыр", 150);
catalog.add_product("Мясо", 200);

// добавим товаров в корзину
catalog.add_to_basket(backet, "Хлеб", 2);
catalog.add_to_basket(backet, "Сыр", 3);
catalog.add_to_basket(backet, "Мясо", 4);

// посчитаем общую стоимость
console.log(backet.total_sum()); // 1450
