/*
1.Почему код дает именно такие результаты?
var a = 1, b = 1, c, d;
c = ++a; alert(c);       // 2 Перед выводом числа сработал прединкремент
d = b++; alert(d);       // 1 Сначала происходит вывод числа, а только потом срабатывает постинкремент
c = (2+ ++a); alert(c);  // 5 a уже равно 3 и перед сложением срабатывает прединкремент
d = (2+ b++); alert(d);  // 4 b уже равно 2, и постинкремент сработает только после сложения
alert(a);                // 3 a никак не изменялась
alert(b);                // 3 b увеличилось на 1 опсле постинкремента
*/

/*
2.Чему будет равен x? 
var a = 2;
var x = 1 + (a *= 2); // = 5.
1 + (2 *2) = 1 + 4 = 5
*/

/*
3.Объявить две целочисленные переменные — a и b 
и задать им произвольные начальные значения. 
Затем написать скрипт, который работает по следующему принципу:
если a и b положительные, вывести их разность;
если а и b отрицательные, вывести их произведение;
если а и b разных знаков, вывести их сумму;
Ноль можно считать положительным числом.
*/

let a = 234;
let b = 32;

if (a >= 0 && b >= 0) console.log(a - b);
else if (a < 0 && b < 0) console.log(a * b);
else console.log(a + b);

/*
3.Присвоить переменной а значение в промежутке [0..15]. 
С помощью оператора switch организовать вывод чисел от a до 15.
*/
let c = 4;

switch (c) {
  case 0:
    console.log(c++);
  case 1:
    console.log(c++);
  case 2:
    console.log(c++);
  case 3:
    console.log(c++);
  case 4:
    console.log(c++);
  case 5:
    console.log(c++);
  case 6:
    console.log(c++);
  case 7:
    console.log(c++);
  case 8:
    console.log(c++);
  case 9:
    console.log(c++);
  case 10:
    console.log(c++);
  case 11:
    console.log(c++);
  case 12:
    console.log(c++);
  case 13:
    console.log(c++);
  case 14:
    console.log(c++);
  case 15:
    console.log(c);
    break;
}

/*
5.Реализовать четыре основные арифметические операции в виде функций 
с двумя параметрами. Обязательно использовать оператор return.
*/

/**
 *
 * @param number a
 * @param number b
 * @returns a + b
 */
function sum(a, b) {
  return a + b;
}

/**
 *
 * @param number a
 * @param number b
 * @returns a / b
 */
function div(a, b) {
  return a / b;
}

/**
 *
 * @param number a
 * @param number b
 * @returns a * b
 */
function mul(a, b) {
  return a * b;
}

/**
 *
 * @param number a
 * @param number b
 * @returns a - b
 */
function sub(a, b) {
  return a - b;
}

/*
6.Реализовать функцию с тремя параметрами: 
function mathOperation(arg1, arg2, operation), 
где arg1, arg2 — значения аргументов, operation — 
строка с названием операции. 
В зависимости от переданного значения выполнить одну из арифметических операций (использовать функции из пункта 5) и вернуть полученное значение (применить switch).
*/

/**
 *
 * @param number arg1
 * @param number arg2
 * @param math.function operation
 * @returns math.function(arg1, arg2)
 */
function mathOperation(arg1, arg2, operation) {
  switch (operation) {
    case "sum":
      return sum(arg1, arg2);
    case "sub":
      return sub(arg1, arg2);
    case "div":
      return div(arg1, arg2);
    case "mul":
      return mul(arg1, arg2);
  }
}

console.log(mathOperation(10, 15, "sum"));

/*
7.Сравнить null и 0. Объяснить результат.
*/

console.log(null == 0); // false
console.log(null === 0); // false
// null это отсутствие значения, и при сравнивании с числом он к нулю не приводится

/*
8.С помощью рекурсии организовать функцию возведения числа в степень. 
Формат: function power(val, pow), 
где val — заданное число, pow –— степень.
*/

function power(val, pow) {
  if (pow === 1) {
    return val;
  } else {
    return val * power(val, pow - 1);
  }
}

console.log(power(2, 4));
