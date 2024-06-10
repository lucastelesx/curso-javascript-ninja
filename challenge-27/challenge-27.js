/*
Aproveitando a lib DOM que fizemos na semana anterior, crie agora para ela
métodos semelhantes aos que existem no array, mas que sirvam para os
elementos do DOM selecionados.
Crie os seguintes métodos:
- forEach, map, filter, reduce, reduceRight, every e some.

Crie também métodos que verificam o tipo do objeto passado por parâmetro.
Esses métodos não precisam depender de criar um novo elmento do DOM, podem
ser métodos estáticos.

Métodos estáticos não obrigam o uso do `new`, podendo ser usados diretamente
no objeto, como nos exemplos abaixo:
DOM.isArray([1, 2, 3]) // true
DOM.isFunction(function() {}); // true
DOM.isNumber('numero'); // false

Crie os seguintes métodos para verificação de tipo:
- isArray, isObject, isFunction, isNumber, isString, isBoolean, isNull.
O método isNull deve retornar `true` se o valor for null ou undefined.
*/
(function (doc){
  'use strict'
  function DOM(elements) {
    this.element = document.querySelectorAll(elements);
  }
  DOM.prototype.forEach = function forEach(){
    return Array.prototype.forEach.apply(this.element, arguments)
  }
  DOM.prototype.map = function map(){
    return Array.prototype.map.apply(this.element, arguments)
  }
  DOM.prototype.filter = function filter(){
    return Array.prototype.filter.apply(this.element, arguments)
  }
  DOM.prototype.reduce = function reduce(){
    return Array.prototype.reduce.apply(this.element, arguments)
  }
  DOM.prototype.reduceRight = function reduceRight(){
    return Array.prototype.reduceRight.apply(this.element, arguments)
  }
  DOM.prototype.every = function every(){
    return Array.prototype.every.apply(this.element, arguments)
  }
  DOM.prototype.some = function some(){
    return Array.prototype.some.apply(this.element, arguments)
  }
  var $a = new DOM('[data-js="link"]')
  console.log($a)
  console.log('---')

  $a.forEach( function (item){
    console.log('foreach', item.firstChild.nodeValue)
  })
  console.log('---')

  var 
  dataJs = $a.map( function (element){
    return element.getAttribute('data-js')
  })
  console.log('map',dataJs)
  console.log('---')
  
  var 
  filterLinks = $a.filter( function (element) {
    return element < 2
  })
  console.log('filter', filterLinks)
  console.log('---')
  
  var 
  somaLinks = $a.reduce( function (acc,item, index) {
    return `${acc} ${item.getAttribute('data-js')}${index}`
  },0)
  console.log('reduce',somaLinks)
  console.log('---')

  var 
  somaLinks2 = $a.reduceRight( function (acc,item, index) {
    return `${acc} ${item.getAttribute('data-js')}${index}`
  },0)
  console.log('ReduceRight',somaLinks2)
  console.log('---')

  var 
  everyLink = $a.every( function (element) {
    return element
  })
  console.log('every',everyLink)
  console.log('---')

  var 
  someLink = $a.some( function (element) {
    return `${element.getAttribute('data-js')}`
  })
  console.log('some',someLink)
  console.log('---')

  function getType(obj, type) {
    return Object.prototype.toString.call(obj) === `[object ${type}]`
  }

  DOM.prototype.isObject = function isObject(obj) {
    console.log('isObject called with:', obj)
    return getType(obj, 'Object')
  }

  DOM.prototype.isFunction = function isFunction(obj) {
    console.log('isFunction called with:', obj)
    return getType(obj, 'Function')
  }

  DOM.prototype.isArray = function isArray(obj) {
    console.log('isArray called with:', obj)
    return getType(obj, 'Array')
  }

  DOM.prototype.isNumber = function isNumber(obj) {
    console.log('isNumber called with:', obj)
    return getType(obj, 'Number')
  }

  DOM.prototype.isString = function isString(obj) {
    console.log('isString called with:', obj)
    return getType(obj, 'String')
  }

  DOM.prototype.isBoolean = function isBoolean(obj) {
    console.log('isBoolean called with:', obj)
    return getType(obj, 'Boolean')
  }

  DOM.prototype.isNull = function isNull(element) {
    console.log('isNull called with:', element)
    return getType(obj, 'Null') || getType(obj, 'Undefined')
  }

// Instância do DOM
const dom = new DOM('body');

// Objetos de teste
const testCases = {
  obj: {},
  func: function() {},
  arr: [],
  num: 42,
  str: "Hello",
  bool: true,
  nul: null,
  undef: undefined
};

// Teste dos métodos
console.log('isObject:', dom.isObject(testCases.obj)) // true
console.log('isObject false:', dom.isObject(testCases.func)) // false
console.log('---')
console.log('isFunction:', dom.isFunction(testCases.func)) // true
console.log('---')
console.log('isFunction false:', dom.isFunction(testCases.obj)) // false
console.log('---')
console.log('isArray:', dom.isArray(testCases.arr)) // true
console.log('isArray: false', dom.isArray(testCases.arr)) // true
console.log('---')
console.log('isNumber:', dom.isNumber(testCases.num)) // true
console.log('isNumber: false', dom.isNumber(testCases.num)) // true
console.log('---')
console.log('isString:', dom.isString(testCases.str)) // true
console.log('isString: false', dom.isString(testCases.str)) // true
console.log('---')
console.log('isBoolean:', dom.isBoolean(testCases.bool)) // true
console.log('isBoolean: false', dom.isBoolean(testCases.bool)) // true
console.log('---')
console.log('isNull (null):', dom.isNull(testCases.nul)) // true
console.log('isNull (undefined):', dom.isNull(testCases.undef)) // true
console.log('isNull (string):', dom.isNull(testCases.str)) // false
console.log('isNull (string): false', dom.isNull(testCases.str)) // false

  DOM.prototype.on = function on(event, callback){
    Array.prototype.forEach.call(this.element, function(element){
      element.addEventListener(event,callback, false)
    })
  }
  DOM.prototype.off = function off(event, callback){
    Array.prototype.forEach.call(this.element, function(element){
      element.removeEventListener(event,callback, false)
    })
  }
  DOM.prototype.get = function get() {
    return this.element
  }
})(document)
