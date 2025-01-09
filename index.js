//Some
Array.prototype.polyfillSome = function (callback) {
  if (typeof callback !== "function")
    throw new Error(callback + " is not a function");

  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      return true;
    }
  }
};

//Every
Array.prototype.polyfillEvery = function (callback) {
  if (typeof callback !== "function")
    throw new Error(callback + " is not a function");

  for (let i = 0; i < this.length; i++) {
    if (!callback(this[i], i, this)) {
      return false;
    }
  }
  return true;
};

//Map
Array.prototype.polyfillMap = function (callback) {
  if (typeof callback !== "function")
    throw new Error(callback + " is not a function");
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
};

//Filter
Array.prototype.polyfillFilter = function (callback) {
  if (typeof callback !== "function")
    throw new Error(callback + " is not a function");
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) result.push(this[i]);
  }
  return result;
};

//Reduce
Array.prototype.polyfillReduce = function (callback, initialValue) {
  if (typeof callback !== "function")
    throw new Error(callback + " is not a function");
  let accumulator = initialValue !== undefined ? initialValue : this[0];
  const startIndex = initialValue !== undefined ? 0 : 1;
  for (let i = startIndex; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], i, this);
  }
  return accumulator;
};

const arr = [1, 2, 3, 4, 5, -1];
//Some
const isThereNegative = arr.polyfillSome((x) => x < 0);
console.log("Some -", isThereNegative); // true
//Every
const isAllPositive = arr.polyfillEvery((x) => x > 0);
console.log("Every -", isAllPositive); // false
//Map
const mappedArray = arr.polyfillMap((x) => x * 2);
console.log("Map -", mappedArray); // [ 2, 4, 6, 8, 10, -2 ]
//Filter
const evenNumbers = arr.polyfillFilter((x) => x % 2 === 0);
console.log("Filter -", evenNumbers); // [2, 4]
//Reduce
const sum = arr.polyfillReduce((acc, curr) => acc + curr, 0);
console.log(sum); // 14
