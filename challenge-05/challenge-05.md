## Functions

```js
function objAsString(objNameParam, caract) {
  var Obj = {
    "Obj_String": {
      objProp: "value"
    }
  }
  console.log(
  `Chamando function e seu obj como Strin ${objAsString(objNameParam)}`
);
```

No exemplo acima estou chamando o nome do objeto como string e chamando como parâmetro de uma função.
Para fácilitar o uso podemos declarar uma variável e utiliza-lo, como no exemplo abaixo:

```js
var objName = "NomeDoObjeto";
console.log(
  `Chamando propriedade de um obj as String ${objAsString(objName).objProp}`
);
```
