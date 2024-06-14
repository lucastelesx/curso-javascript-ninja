/*botão de remover.*/
(function($, APP) {
  'use strict';
  const app = (function (){
    return{
      init: function(){
        this.initVariables()
        this.companyInfo()
        this.initEvents()
      },
      initVariables: function initVariables(){
        this.cars = [],
        this.$table = $('table').get(),
        this.$carForm = $('#car-form'),
        this.$imgUrl = $('#image'),
        this.$brandModel = $('#brand-model'),
        this.$year = $('#year'),
        this.$plate = $('#plate'),
        this.$color = $('#color')
      },
      initEvents: function initEvents(){
        this.$carForm.on('submit', this.handleSubmit.bind(this), false)
      },
      getFormFields: function getFormFields() {
        const imageInput = this.$imgUrl.get().value;
        const brand = this.$brandModel.get().value;
        const year = this.$year.get().value;
        const plate = this.$plate.get().value;
        const color = this.$color.get().value;
      
        const novoCarro = { imageInput, brand, year, plate, color };
        return novoCarro;
      },
      handleSubmit: function handleFormSubmit(e){
        e.preventDefault()
        const car = app.getFormFields();
        const $carTable = $('#car-list').get()
        $carTable.appendChild(this.createNewCar(car))
        this.clearFormFields();
      },
      clearFormFields: function clearFormFields() {
        this.$imgUrl.get().value = '';
        this.$brandModel.get().value = '';
        this.$year.get().value = '';
        this.$plate.get().value = '';
        this.$color.get().value = '';
      },
      removeCarButton: function removeCarButton(){
        const $btnRemoveCar =`
          <td>
            <button data-js="remove-car">Remover</button>
          </td>
        `
        table.inserAdjacentHTML("afterend", $btnRemoveCar)
      },
      createTableCell: function createTableCell(content, isHTML = false) {
        const $td = document.createElement('td');
        if (isHTML) {
          $td.innerHTML = content
        }else{
        $td.textContent = content
        }
        
        return $td;
      },
      createNewCar: function createNewCar(car) {
        const $tr = document.createElement('tr');
        const imageCell = this.createTableCell(
          `<img src="${car.imageInput}" alt="Car Image" style="max-width:100px;"/>`, 
          true
        )
        $tr.appendChild(imageCell);
        const values = [car.brand, car.year, car.plate, car.color];
        
        values.forEach((value) => {
          const $td = this.createTableCell(value)
          $tr.appendChild($td);
        });

        const $tdRemove = this.createTableCell(
          `<td><button data-js=remove-car>Deletar</button></td>`,
          true
        )
        $tdRemove.addEventListener('click', this.removeTableRow.bind(this, $tr));

        $tr.appendChild($tdRemove)
        
        return $tr;
      },
      removeTableRow: function removeTableRow($tr) {
        $tr.remove()
      },
      companyInfo: function companyInfo(){
        const ajax = new XMLHttpRequest()
        ajax.open('GET', 'company.json', true)
        ajax.responseType = 'json'
        ajax.send()
        ajax.addEventListener('readystatechange', this.getCompanyInfo.bind(this), false)
      },
      getCompanyInfo: function getCompanyInfo(){
        if(!this.isReady.call(this)){
          return
          const 
          json = JSON.parse(this.responseText),
          $companyName = $('#company-name'),
          $companyPhone = $('#company-phone')
          $companyName.textContent = json.name
          $companyPhone.textContent = json.phone
        }
      },
      isReady: function isReady(){
        return this.readyState=== 4 && this.status == 200
      }
    }
  })()
  app.init()
})(window.DOM, window.APP)
