function square(number) {
    return number * number;
}

// console.dir(square);
console.dir(square.__proto__);
console.dir(square.prototype);

console.log(square.__proto__ === Function.prototype); // true ①
console.log(square.__proto__ === square.prototype); // false
console.log(square.prototype.constructor === square); // true ②
console.log(square.__proto__.constructor === square.prototype.constructor); // false
