class A {

    D = 10;


    B() {
        return this.D
    }

    C = () => {
        return this.D
    }
}

class F {

    D = 5;
    a = new A();

    getB() {
        return this.a.B()
    }

    getC() {
        return this.a.C()
    }
}

const f = new F();
console.log(f.getB());
console.log(f.getC());




/*
 * Complete the 'sortRoman' function below.
 *
 * The function is expected to return a STRING_ARRAY.
 * The function accepts STRING_ARRAY names as parameter.
 */
const dict = {M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1};

const romanToInt = (str) => {
    let prev;
    let current;
    let result = dict[str.charAt(0)];
    for(let i = 1; i < str.length; i++){
        current = dict[str.charAt(i)];
        prev = dict[str.charAt(i-1)];
        result =  current <= prev ? result + current : result - prev * 2 + current
    }

    return result;
};

const intToRoman = (num) => {
    let result = "";
    for (let i in dict) {
        while (num >= dict[i]) {
            result += i;
            num -= dict[i];
        }
    }
    return result;
};

function sortRoman(names) {
    const convertedToInt = names.map(item => {
        const splitted = item.split(" ");
        splitted[1] = romanToInt(splitted[1]);
        return splitted[0] + " " + splitted[1];
    });
    const sortByNumber = convertedToInt.sort((a, b) => a.match(/\d+$/)[0] - b.match(/\d+$/)[0]);
    const sortedInAlph = sortByNumber.sort((a, b) => a[0].localeCompare(b[0]));
    return sortedInAlph.map(item => {
        const splitted = item.split(" ");
        splitted[1] = intToRoman(splitted[1]);
        return splitted[0] + " " + splitted[1];
    });

}

const names1 = ["Lovro XII", "Lovro XXXIX", "Lovro XLVIII", "Lovro XLIX", "Lovro IX"];

const names = ['Anna XI', 'Louis II', 'Louis I', 'George III'];

console.log(sortRoman(names1)); // ['Anna XI', 'George III', 'Louis I', 'Louis II']


//Палиндром. Вернуть true - если слова читается сзаду наперед так же , как и обычно.

const isPal = (name) => {
    //разделить пополам и сделать реверс второй половине
    const str = name.toLowerCase();
    return str ===  str.split('').reverse().join('')
};

console.log(isPal('Anna'));
console.log(isPal('Jack'));

//Перевернуть строку

const revertStr = (str) => {
    let  result = '';
    for ( let char of str) {
        result = char + result
    }
    return result
};

console.log(revertStr('ira'));


const convert = (str) => str.toLowerCase().split('').sort().join('');
const anagram = (str0, str1) => convert(str0) === convert(str1);

console.log(anagram('finder', 'friend'));
console.log(anagram('hello', 'bye'));




const findVowels = str => {
    let result = 0;
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    for (let char of str.toLowerCase()) {
        if(vowels.includes(char)) {
            result++
        }
    }
    return result;
};

console.log(findVowels('ira'));


const  add = (num) => {
    return function (num2) {
        return num + num2
    }
};
console.log(add(1)(2));

//Посчитать количетво уникальных символов в строке

const getUnique = (str) => {
    const obj = {};
    for (let char of str) {
        obj[char] = obj[char] + 1 || 1
    }
    let result = 0;
    return Object.keys(obj).forEach(key => obj[key] === 1 && result++ )
    // return result
};

console.log(getUnique('kkllsmppoo'));






const sum = (a) => {
    return a + a
};

const memo = (func) => {
    const cache = {};
    return function (num) {
        // return func(num)
        if (cache[num]) {
            console.log('in cache');
            return cache[num]
        } else {
            console.log('new calc');
            cache[num] = func(num);
            return cache[num]
        }
    }
};

const memoSum = memo(sum);
console.log(memoSum(1));
console.log(memoSum(1));
console.log(memoSum(1));
console.log(memoSum(2));

//Каждый вызов будет обнулять cache так как будет создаваься новое лексическое окружение при каждом запуске
// а в примере выше cache сохраняется так как область видимости  для memo, где лежит cache создается одмн раз. а потом уже вызывается memoSum,
// это отдельная функция , но она смотрит по ссылке на свое внешнее откружение, в котором она была создана и видит там cache

const memo2 = (num) => {
    const cache = {};
    // return function (num) {
    if (cache[num]) {
        console.log('in cache');
        return cache[num]
    } else {
        console.log('new calc');
        cache[num] = sum(num);
        return cache[num]
    }
    // }
};

console.log(memo2(1));
console.log(memo2(1));
console.log(memo2(1));


function makeArmy() {
    let shooters = [];

    let i = 0;
    while (i < 10) {
        let shooter = function() { // функция shooter
            console.log( i ); // должна выводить порядковый номер
        };
        shooters.push(shooter);
        i++;
    }

    return shooters;
}

let army = makeArmy();

army[0](); // у 0-го стрелка будет номер 10
army[5](); // и у 5-го стрелка тоже будет номер 10
// ... у всех стрелков будет номер 10, вместо 0, 1, 2, 3...




function Book() {
    this.name = 'foo'
}

Book.prototype = {
    getName: function() {
        return this.name;
    }
};

var book = new Book();

Book.prototype.getUpperName = function() {
    return this.getName().toUpperCase();
};

console.log(book.getUpperName());




