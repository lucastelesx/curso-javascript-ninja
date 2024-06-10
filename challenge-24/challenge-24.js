(function(window, doc) {
  'use strict';
  var $visor = doc.querySelector('[data-js="visor"]');
  var $buttonsNumbers = doc.querySelectorAll('[data-js="button-number"]');
  var $buttonsOperations = doc.querySelectorAll('[data-js="button-operation"]');
  var $buttonCE = doc.querySelector('[data-js="button-ce"]');
  var $buttonEqual = doc.querySelector('[data-js="button-equal"]');

  function initialize() {
    initEvents();
  }

  function initEvents() {
    Array.prototype.forEach.call($buttonsNumbers, function(button) {
      button.addEventListener('click', handleClickNumber, false);
    });
    Array.prototype.forEach.call($buttonsOperations, function(button) {
      button.addEventListener('click', handleClickOperation, false);
    });
    $buttonCE.addEventListener('click', handleClickCE, false);
    $buttonEqual.addEventListener('click', handleClickEqual, false);  
  }

  function handleClickNumber() {
    var value = this.value === ',' ? '.' : this.value;
    if ($visor.value === '0') {
      $visor.value = value;
    } else {
      $visor.value += value;
    }
  }

  function getOperations() {
    return Array.prototype.map.call($buttonsOperations, function(button) {
      return button.value;
    });
  }

  function isLastItemAnOperation(number) {
    var operations = getOperations();
    var lastItem = number.split('').pop();
    return operations.some(function(operator) {
      return operator === lastItem;
    });
  }

  function handleClickOperation() {
    $visor.value = removeLastItemIfItIsAnOperator($visor.value);
    $visor.value += this.value;
  }

  function handleClickCE() {
    $visor.value = 0;
  }
  
  function regexOperations() {
    return new RegExp(`\\d+([.,]\\d+)?[${getOperations().join('')}]?`, 'g');
  }

  function handleClickEqual() {
    $visor.value = removeLastItemIfItIsAnOperator($visor.value);
    var allValues = $visor.value.match(regexOperations());
    $visor.value = allValues.reduce(calculateAllValues);
  }

  function removeLastItemIfItIsAnOperator(string) {
    if (isLastItemAnOperation(string)) {
      return string.slice(0, -1);
    }
    return string;
  }

  function doOperation(operator, firstValue, lastValue) {
    firstValue = firstValue.replace(',', '.');
    lastValue = lastValue.replace(',', '.');
    let result;
    switch (operator) {
      case '+':
        result = Number(firstValue) + Number(lastValue);
        break;
      case '-':
        result = Number(firstValue) - Number(lastValue);
        break;
      case 'x':
        result = Number(firstValue) * Number(lastValue);
        break;
      case '÷':
        result = Number(firstValue) / Number(lastValue);
        break;
    }
    return result.toString().replace('.', ',');
  }

  function getLastOperator(value) {
    return isLastItemAnOperation(value) ? value.split('').pop() : '';
  }

  function calculateAllValues(accumulated, actual) {
    var firstValue = accumulated.slice(0, -1);
    var operator = accumulated.split('').pop();
    var lastValue = removeLastItemIfItIsAnOperator(actual);
    var lastOperator = getLastOperator(actual);
    return doOperation(operator, firstValue, lastValue) + lastOperator;
  }

  initialize();
})(window, document);