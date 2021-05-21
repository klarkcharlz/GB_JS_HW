/*
1.
Создать функцию, генерирующую шахматную доску.
Можно использовать любые html - теги.
Доска должна быть верно разлинована на черные и белые ячейки.
Строки должны нумероваться числами от 1 до 8,
столбцы — латинскими буквами A, B, C, D, E, F, G, H.
*/

function createTable() {
  // блок для шахматнйо доски
  let chess = document.createElement("div");
  chess.className = "chess";

  // шахматная доска будет реализована на базе таблицы
  let table = document.createElement("table");
  table.className = "board";
  table.style["border-collapse"] = "collapse";

  // создаем ячейки
  for (let i = 1; i < 9; i++) {
    let tr = document.createElement("tr");
    for (let j = 0; j < 9; j++) {
      let td = document.createElement("td");
      if (j === 0) {
        // подписываем ячейки слева, проставляем нумерацию
        td.innerHTML = i;
        td.style.width = "75px";
        td.style.height = "75px";
        td.style["font-size"] = "55px";
      } else if (i % 2 == j % 2) {
        td.className = "white box";
      } else {
        td.className = "black box";
      }
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }

  // подписываем ячейки снизу буквами
  let chars = [" ", "A", "B", "C", "D", "E", "F", "G", "H"];
  let tr = document.createElement("tr");
  for (char of chars) {
    let td = document.createElement("td");
    td.innerHTML = char;
    td.style.width = "75px";
    td.style.height = "75px";
    td.style["font-size"] = "55px";
    tr.appendChild(td);
  }
  table.appendChild(tr);

  // помещаем на страницу
  chess.appendChild(table);

  document.body.appendChild(chess);

  // настраиваем отображение
  let boxs = document.querySelectorAll(".box");
  let blacks = document.querySelectorAll(".black");

  for (box of boxs) {
    box.style.width = "100px";
    box.style.height = "100px";
    box.style.border = "1px solid black";
    box.innerHTML = "&nbsp";
  }

  for (black of blacks) {
    black.style["background-color"] = "black";
  }
}

createTable(); // вызываем функцию

/*
2.
Сделать генерацию корзины динамической: 
верстка корзины не должна находиться в HTML-структуре. 
Там должен быть только div, в который будет вставляться корзина, 
сгенерированная на базе JS:
Пустая корзина должна выводить строку «Корзина пуста»;
Наполненная должна выводить «В корзине: n товаров на сумму m рублей».
*/

const basket = {
  products: [
    {
      id: 1,
      name: "SSD",
      price: 1400,
      quantity: 12,
    },
    {
      id: 2,
      name: "HDD",
      price: 1500,
      quantity: 8,
    },
  ],
  totalPrice() {
    return this.products.reduce(function (totalPrice, productsPrice) {
      return totalPrice + productsPrice.price;
    }, 0);
  },
  totalQuantity() {
    return this.products.reduce(function (totalQuantity, productsQuantity) {
      return totalQuantity + productsQuantity.quantity;
    }, 0);
  },
};

// создаем блок
let basketDiv = document.createElement("div");
basketDiv.className = "basket";
basketDiv.style["border-width"] = "1";
basketDiv.style["border-color"] = "black";
basketDiv.style["border-style"] = "solid";
basketDiv.style["background-color"] = "grey";
basketDiv.style["font-size"] = "45px";

// выводим сообщение
if (basket.products.length === 0) {
  basketDiv.innerHTML = "<h1>Коризна Пуста!</h1>";
} else {
  basketDiv.innerHTML = `<h1>В корзине:<br> ${basket.totalQuantity()} товаров<br>На сумму ${basket.totalPrice()} рублей.</h1>`;
}

// помещаем на страницу
document.body.appendChild(basketDiv);

/*
3.
Сделать так, чтобы товары в каталоге выводились при помощи JS:
Создать массив товаров (сущность Product);
При загрузке страницы на базе данного массива генерировать вывод из него.
HTML-код должен содержать только div id=”catalog” без вложенного кода. 
Весь вид каталога генерируется JS.
*/

// создаем блок
let catalogDiv = document.createElement("div");
catalogDiv.className = "catalog";
catalogDiv.style["border-width"] = "1";
catalogDiv.style["border-color"] = "black";
catalogDiv.style["border-style"] = "solid";

const catalog = {
  SSD: {
    id: 1,
    price: 1400,
    inStock: 15,
  },

  HDD: {
    id: 2,
    price: 1500,
    inStock: 14,
  },

  PC: {
    id: 3,
    price: 2800,
    inStock: 7,
  },
};

//создаем таблицу
let shop = document.createElement("table"); // создаем таблицу
shop.style["font-size"] = "55px"; // размер шрифта в таблице
shop.style["border-collapse"] = "collapse";

//создадим заголовок таблицы
let catalogTitle = document.createElement("caption");
catalogTitle.innerHTML = "Каталог товаров";
shop.appendChild(catalogTitle);

// создадим заголовки
let headers = ["Name", "Price", "In stock", "Buy"];
let tr = document.createElement("tr");
for (head of headers) {
  let th = document.createElement("th");
  th.innerHTML = head;
  th.className = "boxCatalog";
  tr.appendChild(th);
}
shop.appendChild(tr);

//наполним таблицу
for (let key in catalog) {
  let tr = document.createElement("tr");

  let name = key;
  let price = catalog[key].price;
  let inStock = catalog[key].inStock;

  let nameTd = document.createElement("td");
  let priceTd = document.createElement("td");
  let inStockTd = document.createElement("td");

  let buttonTd = document.createElement("td");
  let form = document.createElement("form");
  let btn = document.createElement("button");
  btn.style.width = "100px";
  btn.style.height = "75px";
  btn.style["font-size"] = "40px";
  btn.innerHTML = "Buy";

  let nmbr = document.createElement("input");
  nmbr.setAttribute("type", "number");
  nmbr.setAttribute("min", "1");
  nmbr.setAttribute("max", catalog[key].inStock);
  nmbr.setAttribute("step", "1");
  nmbr.setAttribute("value", "1");
  nmbr.style.width = "100px";
  nmbr.style["font-size"] = "50px";

  nameTd.className = "boxCatalog";
  priceTd.className = "boxCatalog";
  inStockTd.className = "boxCatalog";
  buttonTd.className = "boxCatalog";

  nameTd.innerHTML = name;
  priceTd.innerHTML = price;
  inStockTd.innerHTML = inStock;

  tr.appendChild(nameTd);
  tr.appendChild(priceTd);
  tr.appendChild(inStockTd);

  form.appendChild(nmbr);
  form.appendChild(btn);
  buttonTd.appendChild(form);
  tr.appendChild(buttonTd);

  shop.appendChild(tr);
}

// поместим на страницу

catalogDiv.appendChild(shop);
document.body.appendChild(catalogDiv);

// настроим отображение
let boxs = document.querySelectorAll(".boxCatalog");
for (box of boxs) {
  box.style.width = "150px";
  box.style.height = "150px";
  box.style.border = "1px solid black";
}
