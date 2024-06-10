(function($, APP) {
  'use strict';
  const app = (function (){
    return{
      init: function(){
        const cars = []
        
        this.companyInfo()
        this.initEvents()
        
        
        /* function getFormFields(){
          const 
          imageInput = $imgUrl.value,
          brand = $brandModel.value,
          year = $year.value,
          plate = $plate.value,
          color = $color.value
          
          const novoCarro = { imageInput,brand,year,plate,color }
          return novoCarro;
        } */
      },
      initEvents: function initEvents(){
        const $carForm = $('#car-form')
        $carForm.on('submit', this.handleSubmit, false)
        // addCar();
      },
      handleSubmit: function handleFormSubmit(e){
        e.preventDefault()
        const $carTable = $('#car-list').get()
        $carTable.appendChild(app.createNewCar())
      },
      createNewCar: function createNewCar(){
        const 
          $fragment = document.createDocumentFragment(),
          $tr = document.createElement('tr'),
          $tdImage = document.createElement('td'),
          $imageElement = document.createElement('img'),
          $tdBrandModel = document.createElement('td'),
          $tdYear = document.createElement('td'),
          $tdPlate = document.createElement('td'),
          $tdColor = document.createElement('td'),
          $imageInput = $('#image'),
          $brandModel = $('#brand-model'),
          $year = $('#year'),
          $plate = $('#plate'),
          $color = $('#color')     

        // $imageElement.src= $imageInput.get().value
        $imageElement.setAttribute('src', $imageInput.get().value);
        $tdImage.appendChild($imageElement)

        $tdBrandModel.textContent = $brandModel.get().value
        $tdYear.textContent = $year.get().value
        $tdPlate.textContent = $plate.get().value
        $tdColor.textContent = $color.get().value

        $tr.appendChild($tdImage)
        $tr.appendChild($tdBrandModel)
        $tr.appendChild($tdYear)
        $tr.appendChild($tdPlate)
        $tr.appendChild($tdColor)

        return $fragment.appendChild($tr)
      },
      /* updateTable: function updateTable(){
        $carTable.innerHTML = ''
        
        cars.forEach((car) => {
          const row = $carTable.insertRow()
          row.insertCell(0).innerHTML = `<img src="${car.imageInput}" alt="car">`
          row.insertCell(1).innerHTML = car.brand
          row.insertCell(2).innerHTML = car.year
          row.insertCell(3).innerHTML = car.plate
          row.insertCell(4).innerHTML = car.color
        })
      }, */
      companyInfo: function companyInfo(){
        const ajax = new XMLHttpRequest()
        ajax.open('GET', 'company.json', true)
        ajax.responseType = 'json'
        //ajax.onload = setInfoApp
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
