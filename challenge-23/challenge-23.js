
/*
Vamos desenvolver mais um projeto. A ideia é fazer uma mini-calculadora.
As regras são:

- Deve ter somente 1 input, mas não deve ser possível entrar dados nesse input
diretamente;
- O input deve iniciar com valor zero;
- Deve haver 10 botões para os números de 0 a 9. Cada botão deve ser um número;
- Deve haver 4 botões para as operações principais: soma (+), subtração(-),
multiplicação(x) e divisão(÷);
- Deve haver um botão de "igual" (=) que irá calcular os valores e um botão "CE"
que irá limpar o input, deixando-o com valor 0;

- A cada número pressionado, o input deve atualizar concatenando cada valor
digitado, como em uma calculadora real;
- Ao pressionar um botão com uma das 4 operações, deve aparecer o símbolo da
operação no input. Se o último caractere no input já for um símbolo de alguma
operação, esse caractere deve ser substituído pelo último pressionado.
Exemplo:
- Se o input tem os valores: "1+2+", e for pressionado o botão de
multiplicação (x), então no input deve aparecer "1+2x".
- Ao pressionar o botão de igual, o resultado do cálculo deve ser mostrado no
input;
- Ao pressionar o botão "CE", o input deve ficar zerado.
*/
(function(doc,win){
'use strict'

var 
  $elInput = doc.querySelector('[data-calc="input"]'),
  $btOperation = doc.querySelectorAll('[data-operation]'),
  $btNumero = doc.querySelectorAll('[data-number]'),
  $btResultado = doc.querySelector('[data-calc="resultado"]'),
  $btLimpa = doc.querySelector('[data-calc="limpa"]')

  //var compareOperations = Array.prototype.slice.call($btOperation)
  //var compareOperations = [...$btOperation]
  //var compareOperations = Array.from($btOperation)
  var compareOperations = ["+", "-", "x", "/"]

  function cleanInput(){
    $elInput.value = 0
  }
  
  function addNumber() {
    var numero = this.textContent
    //console.log(numero);
    if ($elInput.value === '0') {
        $elInput.value = numero
    } else {
        $elInput.value += numero;
    }
  }

  
  function addOperation(){
    $elInput.value = removeLastItemIfIsAnOperator($elInput.value)
    $elInput.value += this.textContent
  }
  
  function isLastItemOperation(number){
    var lastChar = number.value.split('').pop()
    return compareOperations.includes(lastChar)
  }

  function removeLastItemIfIsAnOperator(number){
    if(isLastItemOperation(number))
      return number.slice(0,-1)
    return number
  }
  
  function calcResult(){
    $elInput.value= removeLastItemIfIsAnOperator($elInput.value)
    var allValues = $elInput.value.match(/\d+[+x/-]?/g)
    $elInput.value = allValues.reduce(function(accumulated, actual){
      var firstValue = accumulated.slice(0, -1)  
      var operator = accumulated.split('').pop()
      var lastValue = removeLastItemIfIsAnOperator(actual);
      var lastOperator = isLastItemOperation(actual) ? actual.split('').pop() : ''
      
      switch(operator){
        case '+':
          return ( Number(firstValue) + Number(lastValue) ) + lastOperator 
        case '-':
          return ( Number(firstValue) - Number(lastValue) ) + lastOperator
        case 'x':
          return ( Number(firstValue) * Number(lastValue) ) + lastOperator
        case '/':
          return ( Number(firstValue) / Number(lastValue) ) + lastOperator
      }
    })
  }
  
  Array.prototype.forEach.call($btNumero, function(button) {
    button.addEventListener('click', addNumber, false);
  });
  Array.prototype.forEach.call($btOperation, function(button) {
    button.addEventListener('click', addOperation, false);
  });
  
  //$btSoma.addEventListener('click', soma)//ok
  $btLimpa.addEventListener('click', cleanInput, false)//ok
  $btResultado.addEventListener('click', calcResult, false)//ok

})(document,window)