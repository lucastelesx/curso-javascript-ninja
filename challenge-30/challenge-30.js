(function($, APP) {
  'use strict';
  const app = (function (){
    return{
      init: function(){
        const cars = []
        
        this.companyInfo()
        this.initEvents()
        
      },
      initEvents: function initEvents(){
        const $carForm = $('#car-form')
        $carForm.on('submit', this.handleSubmit, false)
      },
      handleSubmit: function handleFormSubmit(e){
        e.preventDefault()
        const car = app.getFormFields();
        const $carTable = $('#car-list').get()
        $carTable.appendChild(app.createNewCar(car))
      },
      createTableCell: function createTableCell(content) {
        const $td = document.createElement('td');
        $td.textContent = content;
        return $td;
      },
      createNewCar: function createNewCar(car) {
        const $tr = document.createElement('tr');
        const values = [car.imageInput, car.brand, car.year, car.plate, car.color];
        
        values.forEach((value) => {
          const $td = createTableCell(value)
          $tr.appendChild($td);
        });
        
        return $tr;
      },
      companyInfo: function companyInfo(){
        const ajax = new XMLHttpRequest()
        ajax.open('GET', 'company.json', true)
        ajax.responseType = 'json'
        ajax.send()
        ajax.addEventListener('readystatechange', this.getCompanyInfo, false)
      },
      getCompanyInfo: function getCompanyInfo(){
        if(!app.isReady.call(this)){
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
})(window.DOM, window.APP);
