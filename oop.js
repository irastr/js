//Наследование объектов

//[[ Prototype]] скрытое свойство которое указывает на null или на другой ОБЬЕКТ
//__proto__ геттер и сеттер для прототипа у обьектов (еще есть Object.get/setPrototypeOf и Object.create(proto))
//prototype - свойство через которое можно прочитать/установить у конструкторов

const object1 = {
    name: 'a'
};

const object2 = {
    age: 2
};

object2.__proto__ = object1;
console.log(object1.name); //'a

//Конструкторы
function C(name) {
    this.name = name
}

C.prototype.sayName = function() {
    return 'Hi' + this.name
};
const c = new C('c');
console.log(c instanceof C);
console.log(c.name); // c
console.log(c.sayName()); // Hic

//Наследование конструкторов
function B(age) {
    this.age = age
}

B.prototype.__proto__ = C.prototype;
const b = new B(42);
console.log(b.sayName()); // Hiundefined

//Classes
class Color {
    constructor(name) {
        this.name = name
    }
    sayHi () {
        return this.name
    }
}

const blue = new Color('blue');
console.log(blue.name); //blue
console.log(blue.sayHi()); //blue
//под капотом класс все что в методе конструктор записывает в функцию-конструктор, а все что вне его - в прототип

//Наследование у классов

class Blue extends Color {
    //у класса без конструктора копируется конструктор родителя. если мы хотим добавить ему свои свойства - super
    constructor(name, age) {
        super(name);
        this.age = age
        //новые свойства указываем после супер, иначе перетрутся
    }
    sayHi () {
        return 'bruh'
        //метод родителя переопределится - полиморфизм
    }
}

//extends под капотом делает Blue.prototype.__proto__ = Color.prototype и копирует контсруктор родителя

//в классе есть приватные и публичные методы(инкапсуляция), реализуются через _метод + геттер/сеттер или через новое #свойство
//геттеры и сеттеры есть еще в обьектах, нужны что бы например сетить свойство, только если оно соответсвует опр условиям.


//DETAILS

// ФУНКЦИИ - КОНСТРУКТОРЫ

//используются для сздания множества однотипных обьектов. Конструктор - обычная функция, которая создает this,
// присваивает ему свойства и возвращает новый обьект
function User(name) {
    this.name = name;
    this.isAdmin = false;
}

let user = new User("Вася");

console.log(user.name); // Вася
console.log(user.isAdmin); // false

//проверить является является ли обькет случаем конструктора:
console.log(user.constructor === User); //true
//свойство constructor лежит в prototype User (User.prototype = { constructor: User }), от которого наследуется user, поэтому оно доступно
console.log(user instanceof User); // true
//второй вариант более надежный, так как свойство constructor может перетериться при присваивании прототипу нового обьекта на Object

//у конструктора в свойстве prototype лежит constructor по дефолту
console.log(User.prototype.constructor === User); // true

//можно создать метод в конструкторе
/*function User(name) {
    this.name = name;
    this.sayHi = function() {
        alert( "Меня зовут: " + this.name );
    };
}*/
//но методы лучше записывать в прототип (User.prototype.sayHi = ), что бы они не создавались заново для каждого экземпляра


// ПРОТОТИПНОЕ НАСЛЕДОВАНИЕ

// [[Prototype]] - скрытое свойство, которое ссылается или на null или на другой обьект

// отличие __proto__ от prototype. __proto__ - геттер и сеттер для прототипа обьекта  [[Prototype]].
// А prototype - свойство конструктора, которое записывает протопип  обьекта.
// Раньше прямого доступа к прототипу через __proto__ не было и юзалось только свойство prototype. Потом появился метод Object.create
// которое позволяло создовать обьекты с прототипом, но он не позволял устанавиливать/получать прототип.
// Тогда был реализован аксессор __proto__, который позволял устанавливать/получать прототип в любое время. а после
// А после были добавлены Object.setPrototypeOf и Object.getPrototypeOf, заменяющие собой аксессор __proto__

let animal2 = {
    eats: true
};
let rabbit1 = {
    jumps: true
};

rabbit1.__proto__ = animal2;
// теперь оба свойства есть в rabbit:
console.log(rabbit1.eats);
console.log(rabbit1.jumps);
// __proto__ !== [[Prototype]], а __proto__ - это геттер и сеттер для прототипа.
//когда цепочка, то прототип харанится в __proto__ of prototype. если не находит свойство втекущем обьекте, смотрит в прототипе,
//а потом в __proto__ прототипа итд.

// другие, более современные способы для установки и чтения прототипа:
Object.getPrototypeOf(rabbit1);
Object.setPrototypeOf(rabbit1, animal2);
//создание через Object.create()
const rabbit3000 = Object.create(animal2);

//PROTOTYPE

//.prototype - свойство конструктора
//свойство F.prototype (не путать с [[Prototype]]) устанавливает[[Prototype]] для новых объектов при вызове new F().
//конструктор  !== .prototype :) Конструктор нужен чисто для создания множества однотипных обьектов, а с помощью прототипа реализуется наследование.
// свойства , которые должны быть общими для нескольких обьектов не будут создаваться для каждого екземпляра, а будут лежать в прототипа и все инстансы
// будут ссылаться на него и получать их.
// .prototype нужен для задания прототипов для обьктов созданных с помощью функций-конструкторов

let animal = {
    eats: true
};

function Rabbit(name) {
    this.name = name;
}
console.log(Rabbit.prototype); //Rabbit
// По умолчанию "prototype" – объект с единственным свойством constructor, которое ссылается на функцию-конструктор.
// Rabbit.prototype = { constructor: Rabbit };
console.log(Rabbit.prototype.constructor === Rabbit); //true

Rabbit.prototype = animal;
// this overrides новым обьектом the constructor of Rabbit to Object and adds animal as prototype for Rabbit
//что бы избежать такого - не перезаписывать весь обьект prototype, а присваивать ему новые свойства prototype.newMethod()
console.log(Rabbit.prototype === animal); //true
console.log(Rabbit.prototype.constructor === Object); //true

let rabbit = new Rabbit("White Rabbit");

console.log(rabbit.__proto__);
console.log(Object.getPrototypeOf(rabbit));

//check constructor
console.log(rabbit instanceof Rabbit); //true
console.log(rabbit.constructor === Rabbit); //false
//overwritten to Object by Rabbit.prototype = animal;

//перезапись прототипа
Rabbit.prototype = {};
let rabbit2 = new Rabbit("White Rabbit");
console.log(rabbit2.__proto__);
//but
console.log(rabbit1.__proto__);

// Присвоение нового значения свойству Rabbit.prototype влияет на [[Prototype]] вновь создаваемых объектов, но не на прототип уже существующих.
function Rabbit000() {}
Rabbit000.prototype = {
    eats: true
};
let rabbit3 = new Rabbit();
Rabbit000.prototype = {};
console.log(rabbit3.eats); // true

//Наследование конструкторов:
function Lol2() {}
Rabbit000.prototype.__proto__ = Lol2.prototype;

//CLASSES

class MyClass {
    constructor() {}
    method1() {}
    method2() {}
    method3() {}
}

console.log(typeof MyClass); // function
// under the hood = >

/*Создаёт функцию с именем User, которая становится результатом объявления класса. Код функции берётся из метода constructor (она будет пустой, если такого метода нет).
Сохраняет все методы, такие как sayHi, в User.prototype.*/

// все что в constructor() {} запишется в функцию-конструктор MyClass, а то что за пределами в prototype

// нельзя написать за пределами констрктора свойство через this. потому что оно пойдет в прототип, а прототип - это обьект,
// в котором нельзя обратиться через this в отличии от функции конструктора. Но можно записать свойство класса так:

class User2 {
    // не всеми браузерами поодерживается, но так писать можно
    // name = "Аноним";
    sayHi() {
        console.log(`Привет, ${this.name}!`); // Привет, Антон
    }
}
new User2().sayHi();
// Свойство name не устанавливается в User.prototype.
// Вместо этого оно создаётся оператором new перед запуском конструктора, это именно свойство объекта.

//Не просто синтаксическиц сахар, основные отличия:
//код в режиме use strict
//функция, созданная с помощью class, помечена специальным внутренним свойством [[FunctionKind]]:"classConstructor",в отличие от обычных функций, конструктор класса не может быть вызван без new.
//методы класса являются неперечислимыми. Определение класса устанавливает флаг enumerable в false для всех методов в "prototype".


//Геттеры/сеттеры
class User666 {
    constructor(name) {
        // вызывает сеттер
        this.name = name;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        if (value.length < 4) {
            console.log("Имя слишком короткое.");
            return;
        }
        this._name = value;
    }

}
let user666 = new User666("Иван");
console.log(user666.name); // Иван
user667 = new User(""); // Имя слишком короткое.

//Геттеры/сеттеры в обьете:

let user567 = {
    name: "John",
    surname: "Smith",
    get fullName() {
        return `${this.name} ${this.surname}`;
    }
};
console.log(user567.fullName); // John Smith
//геттер/сеттер и свойство обьекта не могут называться одинаково !


// Наследование в классах

class Animal {
    constructor(name) {
        this.speed = 0;
        this.name = name;
    }
    run(speed) {
        this.speed += speed;
        console.log(`${this.name} бежит со скоростью ${this.speed}.`);
    }
    stop() {
        this.speed = 0;
        console.log(`${this.name} стоит.`);
    }
}

// Наследуем от Animal указывая "extends Animal"
class Rabbit222 extends Animal {
    hide() {
        console.log(`${this.name} прячется!`);
    }
}

let rabbit333 = new Rabbit222("Белый кролик");

rabbit333.run(5); // Белый кролик бежит со скоростью 5.
rabbit333.hide(); // Белый кролик прячется!

//Под капотом ключевое слово extends добавляет ссылку на [[Prototype]] из Rabbit.prototype в Animal.prototype:
Object.setPrototypeOf(Rabbit222.prototype, Animal.prototype);
//or
Rabbit.prototype.__proto__ = Animal.prototype;
// не Rabbit.prototype= Animal.prototype; потому что это просто перезапишет прототип кроллика, а нам надо указать [[Proto]] в прототипе

//Если под капотом мы получаем ссылку только на прототип , то как тогда Rabbit читает и свойства Animal ?
//Он находитсвойства родителя потому что по дефолту в его конструктор записывается свойства родителя
class Rabbit6666 extends Animal {
    // генерируется для классов-потомков, у которых нет своего конструктора
    constructor(...args) {
        super(...args);
    }
}
// SUPER
// super.method(...) вызывает родительский метод.
// super(...) вызывает родительский конструктор (работает только внутри нашего конструктора).

let animal1234 = {
    name: "Животное",
    eat() {         // animal.eat.[[HomeObject]] == animal
        console.log(`${this.name} ест.`);
    }
};

let rabbit1234 = {
    __proto__: animal1234,
    name: "Кролик",
    eat() {         // rabbit.eat.[[HomeObject]] == rabbit
        super.eat();
    }
};

// это работает благодаря тому , что у каждого метода потомка есть [[HomeObject]] на который super смотрит при вызове метода

//До сих пор у Rabbit не было своего конструктора.
// Согласно спецификации, если класс расширяет другой класс и не имеет конструктора, то автоматически создаётся такой «пустой» конструктор(пример выше)

//Давайте добавим конструктор для Rabbit.

class Rabbit66666 extends Animal {

    constructor(name, earLength) {
        super(name);
        this.earLength = earLength;
    }
}
// Нельзя вызывать конструктор потомка бех super, потому что в противном случае, свойства родителя не унаследуются, так как новый конструктор переопределит дефолтный
// constructor(...args) {super(...args);} и в новом конструкторе так же нужно кнаследовать через super конструктор родителя. Extends под капотом унаследует только прототип
// конструктора Rabbit.prototype.__proto__ = Animal.prototype; , а для унаследования свойств - используем super()

// Перечислять свойства потомка нужно после супер поскольку в другом случае, свойства ребенка перетрутся свойствами родителя


//Статические методы
//можно присвоить метод самой функции-классу, а не её "prototype". Такие методы называются статическими.
class User66666 {
    static staticMethod() {
        console.log(this === User66666);
    }
}

User66666.staticMethod(); // true
//Обычно статические методы используются для реализации функций, принадлежащих классу, но не к каким-то конкретным его объектам.

//Статические свойства(добавлены в язык недавно)
///Статические свойства используются в тех случаях, когда мы хотели бы сохранить данные на уровне класса, а не какого-то одного объекта.
class Article {
    // static publisher = "Илья Кантор";
}
// console.log( Article.publisher ); // Илья Кантор
//same as:
function A() {}
A.hello = 'hello';
console.log(A.hello);

//статические методы наследуются
class Animal10010 {}
class Rabbit10010 extends Animal {}
// для статики
console.log(Rabbit10010.__proto__ === Animal10010); // true
// для обычных методов
console.log(Rabbit10010.prototype.__proto__ === Animal10010.prototype); // false


//Приватные и защищенные методы и свойства

//В терминах ООП отделение внутреннего интерфейса от внешнего называется инкапсуляция.
//В JavaScript есть два типа полей (свойств и методов) объекта:
// Публичные: доступны отовсюду. Они составляют внешний интерфейс. До этого момента мы использовали только публичные свойства и методы.
// Приватные: доступны только внутри класса. Они для внутреннего интерфейса.
//Защищённые поля не реализованы в JavaScript на уровне языка, но на практике они очень удобны, поэтому их эмулируют.

class CoffeeMachine {
    // waterAmount = 0; // количество воды внутри
    constructor(power) {
        this.power = power;
        console.log( `Создана кофеварка, мощность: ${power}` );
    }
}
// создаём кофеварку
let coffeeMachine = new CoffeeMachine(100);
// добавляем воды
coffeeMachine.waterAmount = 200;

//waterAmount тут - это свойство обьекта написанное новым синтаксисом(без this.), оно не будет в прототипе а создается у нового обьекта созданного при помощи этого класса
// оно публичное, power через this написан в отличии, потому что принимаает переменную

/*class CoffeeMachine {
    _waterAmount = 0;
    set waterAmount(value) {
        if (value < 0) throw new Error("Отрицательное количество воды");
        this._waterAmount = value;
    }
    get waterAmount() {
        return this._waterAmount;
    }
    constructor(power) {
        this._power = power;
    }
}*/

// создаём новую кофеварку
// let coffeeMachine = new CoffeeMachine(100);
// устанавливаем количество воды
// coffeeMachine.waterAmount = -10; // Error: Отрицательное количество воды

// Теперь доступ под контролем, поэтому указать воду ниже нуля не удалось.

//Свойство только для чтения
// Иногда нужно, чтобы свойство устанавливалось только при создании объекта и после этого никогда не изменялось.

/*class CoffeeMachine {
    // ...
    constructor(power) {
        this._power = power;
    }
    get power() {
        return this._power;
    }

}*/
// создаём кофеварку
// let coffeeMachine = new CoffeeMachine(100);
// console.log(`Мощность: ${coffeeMachine.power}W`); // Мощность: 100W
// coffeeMachine.power = 25; // Error (no setter)

//Здесь мы использовали синтаксис геттеров/сеттеров. Но в большинстве случаев использование функций get.../set... предпочтительнее:

/*class CoffeeMachine {
    _waterAmount = 0;
    setWaterAmount(value) {
        if (value < 0) throw new Error("Отрицательное количество воды");
        this._waterAmount = value;
    }
    getWaterAmount() {
        return this._waterAmount;
    }
}
new CoffeeMachine().setWaterAmount(100);*/

//новая возможность
//Приватное свойство
//Приватные свойства и методы должны начинаться с #. Они доступны только внутри класса.

/*class CoffeeMachine {
    #waterLimit = 200;

    #checkWater(value) {
        if (value < 0) throw new Error("Отрицательный уровень воды");
        if (value > this.#waterLimit) throw new Error("Слишком много воды");
    }
}

let coffeeMachine = new CoffeeMachine();

// снаружи  нет доступа к приватным методам класса
coffeeMachine.#checkWater(); // Error
coffeeMachine.#waterLimit = 1000; // Error*/




//AGAIN GETTERS and SETTERS in classes and constructors

//созданно внутреннее свойство _power доступное только для чтения
class Phone {
    constructor(power) {
        this._power = power
    }

    get power() {
        return this._power
    }
}

//теперь добавлен сеттер для power
class Phone1 {
    constructor(power) {
        this._power = power
    }

    get power() {
        return this._power
    }

    set power(value) {
        if(value > 100) {
            this._power = value
        }
    }
}

//так же может быть запись через функции, а не геттер и сеттер
// в большинстве случаев использование функций get.../set... предпочтительнее:
class Phone2 {
    constructor(power) {
        this._power = power
    }

    getPower() {
        return this._power
    }

    setPower(value) {
        if(value > 100) {
            this._power = value
        }
    }
}
//используя функции-конструкторы ???:
function Phone3 (power) {
    this._power = power;
    this.setPower = function(value) {
        if(value > 100) {
            this._power = value
        }
    };
    this.getPower= function() {
        return this._power
    }
}
//get set не заюзать, так как они доступны только в обьекте

//отличие обьявлений функций
//function expression - тоже самое, но нельзя вызвать функцию до обьявления
//Если нет явной причины использовать Function Expression – предпочитайте Function Declaration, читаемость лучше
const Phone5 = function() {
};

//стрелочная функция отличается:
// у нее нет this, его значение берется снаружи => нельзя использовать с new, не могут быть использованы как конструкторы
// у нее нет переменной arguments
// так же у них нет super

const Phone4 = () => {
};

//РАСШИРЕНИЕ ВСТРОЕННЫХ КЛАССОВ

// встроенные методы массива (filter, map ...) будут использовать этот метод как конструктор => будут возвращать массивы, которые будут унаследованы от Array
/*class PowerArray extends Array {
    isEmpty() {
        return this.length === 0;
    }

    // встроенные методы массива будут использовать этот метод как конструктор
    static get [Symbol.species]() {
        return Array;
    }
}*/


// Такие методы как: Object.keys, Array.isArray - это статические методы встроенных обьектов, а не методы прототипа

//Отсутствие статического наследования встроенных классов
// Например, и Array, и Date наследуют от Object, так что в их экземплярах доступны методы из Object.prototype. Но Array.[[Prototype]] не ссылается на Object, поэтому нет методов Array.keys() или Date.keys().

//Проверка класса: "instanceof"
class Lol {}
let lol = new Lol();
console.log( lol instanceof Lol ); // true
//Также это работает с функциями-конструкторами
//Обычно оператор instanceof просматривает для проверки цепочку прототипов. Но это поведение может быть изменено при помощи статического метода Symbol.hasInstance.


//ПРИМЕСИ

//Примесь – общий термин в объектно-ориентированном программировании: класс, который содержит в себе методы для других классов.
// Некоторые другие языки допускают множественное наследование. JavaScript не поддерживает множественное наследование, но с помощью примесей мы можем реализовать нечто похожее, скопировав методы в прототип.

/*let sayHiMixin = {
    sayHi() {
        alert(`Привет, ${this.name}`);
    },
    sayBye() {
        alert(`Пока, ${this.name}`);
    }
};

// использование:
class User {
    constructor(name) {
        this.name = name;
    }
}

// копируем методы
Object.assign(User.prototype, sayHiMixin);

// теперь User может сказать Привет
new User("Вася").sayHi(); // Привет, Вася!*/

//Это не наследование, а просто копирование методов. Таким образом, класс User может наследовать от другого класса, но при этом также включать в себя примеси, «подмешивающие» другие методы


const f = () => {};
const a = [];
const u = undefined;

console.log({}.toString.call(a));
//instead of instance of



let user33 = {
    firstName: "Вася",
    sayHi() {
        console.log(`Привет, ${this.firstName}!`);
    }
};

// let sayHi = user33.sayHi.bind(user33); // (*)

let sayHi = user33.sayHi; // (*)

sayHi(); // Привет, Вася!



// const arr = [1, 1, 1, 2, 3, 6, 7, 6, 8, 7, 7, 2, 10];








