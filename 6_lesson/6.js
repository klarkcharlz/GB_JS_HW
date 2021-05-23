/*
1.
Продолжаем реализовывать модуль корзины:
Добавлять в объект корзины выбранные товары по клику на кнопке «Купить» 
без перезагрузки страницы;
Привязать к событию покупки товара пересчет корзины и 
обновление ее внешнего вида.
*/

let basket = {
  // сущность корзины
  products: {}, // список товаров в корзине
  totalPrice() {
    // подсчет стоимости всех товаров
    let total_suma = 0;
    for (let key in this.products) {
      total_suma += this.products[key]["price"] * this.products[key]["total"];
    }
    return total_suma;
  },
  totalCnt() {
    // подсчет количество товаров
    let total_cnt = 0;
    for (let key in this.products) {
      total_cnt += this.products[key]["total"];
    }
    return total_cnt;
  },
  show_basket() {
    // обновление визуала корзины
    if (basket.products.length === 0) {
      basketDiv.innerHTML = "<h1>Коризна Пуста!</h1>";
    } else {
      basketDiv.innerHTML = `<h1>В корзине ${basket.totalCnt()} товаров:<br>На сумму ${basket.totalPrice()} рублей.</h1>`;
    }
    if (basket.products) {
      for (let key in basket.products) {
        if (basket.products[key]["total"] > 0) {
          let p = document.createElement("p");
          p.innerHTML = `${key}: ${basket.products[key]["total"]} шт. x ${
            basket.products[key]["price"]
          } руб. = ${
            basket.products[key]["total"] * basket.products[key]["price"]
          } руб.`;
          basketDiv.appendChild(p);
        }
      }
    }
  },
  add_basket(eventObj = undefined) {
    // добавляем товар
    if (eventObj) {
      let data = eventObj.target;
      let name = data.dataset.name;
      catalog.add_to_basket(basket, name, 1);
      let upd = document.querySelector(`td[data-name="${name}"]`);
      upd.innerHTML = catalog.products[name]["inStock"];
    }
    basket.show_basket();
  },
  deleteFromBasket(eventObj = undefined) {
    // удаляем из корзины товар
    if (eventObj) {
      let data = eventObj.target;
      let name = data.dataset.name;
      if (name in basket.products) {
        if (basket.products[name]["total"] > 0) {
          basket.products[name]["total"] -= 1;
          catalog.products[name]["inStock"] += 1;
          let upd = document.querySelector(`td[data-name="${name}"]`);
          upd.innerHTML = catalog.products[name]["inStock"];
          if (basket.products[name]["total"] == 0) {
            delete basket.products[name];
          }
        }
      }
    }
    basket.show_basket();
  },
  buy(eventObj = undefined) {
    if (Object.keys(basket.products).length > 0) {
      basket.products = {};
      basketDiv.innerHTML = "<h1>СПАСИБО ЗА ПОКУПКУ!</h1>";
    }
  },
};

let catalog = {
  // сущность каталог
  products: {}, // список товаров
  add_product(name, price, quanity) {
    // добавить в каталог новую позицию
    this.products[name] = {
      price: price,
      inStock: quanity,
    };
  },
  add_to_basket(basket, name, n) {
    // отправить товар в корзину
    if (catalog.products[name]["inStock"] > 0) {
      if (!(name in basket.products)) {
        basket.products[name] = {
          price: catalog.products[name]["price"],
          total: n,
        };
      } else {
        basket.products[name]["total"] += n;
      }
      catalog.products[name]["inStock"] -= n;
    }
  },
};

// добавим товаров в каталог
catalog.add_product("SSD", 3500, 12);
catalog.add_product("HHD", 2000, 8);
catalog.add_product("PC", 50000, 3);

// Создаем каталог на странице
let catalogDiv = document.createElement("div");
catalogDiv.className = "catalog";
//создаем таблицу
let shop = document.createElement("table"); // создаем таблицу
shop.className = "shop";
//создадим заголовок таблицы
let catalogTitle = document.createElement("caption");
catalogTitle.innerHTML = "Каталог товаров";
shop.appendChild(catalogTitle);
// создадим заголовки
let headers = ["Name", "Price", "In stock", "Add to Basket"];
let tr = document.createElement("tr");
for (head of headers) {
  let th = document.createElement("th");
  th.innerHTML = head;
  th.className = "boxCatalog";
  tr.appendChild(th);
}
shop.appendChild(tr);
//наполним таблицу
for (let key in catalog.products) {
  let tr = document.createElement("tr");
  let name = key;
  let price = catalog.products[key].price;
  let inStock = catalog.products[key].inStock;
  let nameTd = document.createElement("td");
  let priceTd = document.createElement("td");
  let inStockTd = document.createElement("td");
  inStockTd.dataset.name = name;
  let buttonTd = document.createElement("td");
  let form = document.createElement("form");
  let btnPlus = document.createElement("button");
  btnPlus.className = "btn";
  btnPlus.innerHTML = "+";
  btnPlus.setAttribute("type", "button");
  btnPlus.dataset.name = name;
  let btnMinus = document.createElement("button");
  btnMinus.className = "btn";
  btnMinus.innerHTML = "-";
  btnMinus.setAttribute("type", "button");
  btnMinus.dataset.name = name;
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
  form.appendChild(btnPlus);
  form.appendChild(btnMinus);
  buttonTd.appendChild(form);
  tr.appendChild(buttonTd);
  shop.appendChild(tr);
  btnPlus.onclick = basket.add_basket; // обработчик
  btnMinus.onclick = basket.deleteFromBasket;
}
// поместим на страницу
catalogDiv.appendChild(shop);
document.body.appendChild(catalogDiv);

// создаем блок корзины
let basketDiv = document.createElement("div");
basketDiv.className = "basket";
// помещаем на страницу
document.body.appendChild(basketDiv);
basket.show_basket();

// кнопка купить
let btnBuy = document.createElement("button");
btnBuy.className = "btn";
btnBuy.innerHTML = "BUY";
btnBuy.setAttribute("type", "button");
document.body.appendChild(btnBuy);
btnBuy.onclick = basket.buy;
