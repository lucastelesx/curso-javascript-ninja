  /*
  No HTML:
  - Crie um formulário com um input de texto que receberá um CEP e um botão
  de submit;
  - Crie uma estrutura HTML para receber informações de endereço:
  "Logradouro, Bairro, Estado, Cidade e CEP." Essas informações serão
  preenchidas com os dados da requisição feita no JS.
  - Crie uma área que receberá mensagens com o status da requisição:
  "Carregando, sucesso ou erro."

  No JS:
  - O CEP pode ser entrado pelo usuário com qualquer tipo de caractere, mas
  deve ser limpo e enviado somente os números para a requisição abaixo;
  - Ao submeter esse formulário, deve ser feito um request Ajax para a URL:
  "https://viacep.com.br/ws/[CEP]/json/", onde [CEP] será o CEP passado
  no input criado no HTML;
  - Essa requisição trará dados de um CEP em JSON. Preencha campos na tela
  com os dados recebidos.
  - Enquanto os dados são buscados, na área de mensagens de status, deve mostrar
  a mensagem: "Buscando informações para o CEP [CEP]..."
  - Se não houver dados para o CEP entrado, mostrar a mensagem:
  "Não encontramos o endereço para o CEP [CEP]."
  - Se houver endereço para o CEP digitado, mostre a mensagem:
  "Endereço referente ao CEP [CEP]:"
  - Utilize a lib DOM criada anteriormente para facilitar a manipulação e
  adicionar as informações em tela.
  */
(function (DOM){
  'use strict'
  
  function app(){
    const 
      $formCEP = new DOM('[data-js="form-cep"]'),
      $inputCep = new DOM('#cep'),
      $infoLogradouro = new DOM('[data-end="logradouro"]'),
      $infoBairro = new DOM('[data-end="bairro"]'),
      $infoEstado = new DOM('[data-end="estado"]'),
      $infoCidade = new DOM('[data-end="cidade"]'),
      $infoCEP = new DOM('[data-end="cep"]'),
      $statusMessage = new DOM('#status-message'),
      ajax = new XMLHttpRequest()

      $formCEP.on('submit', handleSubmitFormCep)

    function handleSubmitFormCep(event){
      event.preventDefault()
      let url = getUrl()
      
      ajax.open('GET', url, true)
      ajax.send();
      getMessage('loading')
      ajax.addEventListener('readystatechange', handleReadyStateChange, false)
    }

    function handleReadyStateChange(){
      if ( isRequestSuccessful() ) {
        getMessage('ok')
        fillCepFields()
      }
    }

    function isRequestSuccessful (){
      return ajax.readyState === 4 && ajax.status === 200 
    }
  
    function parseData(){
      let result
      try{
        result = JSON.parse(ajax.responseText);
      }catch(e){
        result = null
      }
      return result
    }
  
    function fillCepFields(){
      let data = parseData()
      if (!data){
        getMessage('error')
        data = clearData()
      }
  
      $infoLogradouro.get()[0].textContent = `Logradouro: ${data.logradouro || ''}`;
      $infoBairro.get()[0].textContent = `Bairro: ${data.bairro || ''}`;
      $infoEstado.get()[0].textContent = `Estado: ${data.uf || ''}`;
      $infoCidade.get()[0].textContent = `Cidade: ${data.localidade || ''}`;
      $infoCEP.get()[0].textContent = `CEP: ${data.cep || ''}`;
    }
  
    function clearData(){
      return{
        logradouro: '-',
        bairro: '-',
        uf: '-',
        localidade: '-',
        cep: '-'
      }
    }
  
    function getUrl(){
      return `https://viacep.com.br/ws/${formatCep()}/json/`
    }

    function formatCep(){
      return $inputCep.get()[0].value.replace(/\D/g,'')
    }

    function getMessage(type){
      let valueCep = formatCep()
      let messages = {
        loading: `Buscando informações para o CEP ${valueCep}...`,
        ok: `Endereço referente ao CEP ${valueCep}:`,
        error: `Não encontramos o endereço para o CEP ${valueCep}.`
      }
      
      $statusMessage.get()[0].textContent = messages[type]
      
    }
  }
  app()

})(window.DOM)