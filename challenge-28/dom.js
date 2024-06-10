(function(win, doc){
  'use strict'

  function DOM(elements) {
    this.element = doc.querySelectorAll(elements);
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
  
  function getType(obj, type) {
    return Object.prototype.toString.call(obj) === `[object ${type}]`
  }

  DOM.prototype.isObject = function isObject(obj) {
    return getType(obj, 'Object')
  }

  DOM.prototype.isFunction = function isFunction(obj) {
    return getType(obj, 'Function')
  }

  DOM.prototype.isArray = function isArray(obj) {
    return getType(obj, 'Array')
  }

  DOM.prototype.isNumber = function isNumber(obj) {
    return getType(obj, 'Number')
  }

  DOM.prototype.isString = function isString(obj) {
    return getType(obj, 'String')
  }

  DOM.prototype.isBoolean = function isBoolean(obj) {
    return getType(obj, 'Boolean')
  }

  DOM.prototype.isNull = function isNull(element) {
    return getType(obj, 'Null') || getType(obj, 'Undefined')
  }

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
  win.DOM = DOM
})(window,document)