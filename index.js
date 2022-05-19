'use strict'



const preencherFormulario = (endereco) => {
    document.getElementById('Rua').value = endereco.logradouro;
    document.getElementById('Bairro').value = endereco.bairro;
    document.getElementById('Cidade').value = endereco.localidade;
    document.getElementById('UF').value = endereco.uf;
    document.getElementById('IBGE').value = endereco.ibge;
    document.getElementById('DDD').value = endereco.ddd;
}

function limparFormulario (endereco)  {
    document.getElementById('Rua').value = '...';
    document.getElementById('Bairro').value = '...';
    document.getElementById('Cidade').value = '...';
    document.getElementById('UF').value = '...';
    document.getElementById('IBGE').value = '...';
    document.getElementById('DDD').value = '...';
    inputSemCor(document.getElementById('cep'));
    inputSemCor(document.getElementById('Rua'));
    inputSemCor(document.getElementById('Bairro'));
    inputSemCorMaior(document.getElementById('Cidade'));
    inputSemCorMaior(document.getElementById('IBGE'));
    inputSemCorMenor(document.getElementById('UF'));
    inputSemCorMenor(document.getElementById('DDD'));
}


const cepValido = (cep) => cep.length ==8;

 async function pesquisarCep() {

    limparFormulario();
    setTimeout ( async function(){ 
     const cep = document.getElementById('cep').value;
     const url = `https://viacep.com.br/ws/${cep}/json/`;
     if (cepValido(cep)){
        const dados = await fetch(url)
        const endereco = await dados.json();
        if (endereco.hasOwnProperty('erro')){
            errorValidation(document.getElementById('cep'), 'CEP inválido');
            console.log(endereco);
        }else{
            successValidation(document.getElementById('cep'));
            successValidation(document.getElementById('Rua'));
            successValidation(document.getElementById('Bairro'));
            successValidationMaior(document.getElementById('Cidade'));
            successValidationMenor(document.getElementById('UF'));
            successValidationMaior(document.getElementById('IBGE'));
            successValidationMenor(document.getElementById('DDD'));

            preencherFormulario (endereco);
        }
    } else{
        errorValidation(document.getElementById('cep'), 'CEP incorreto!');
    }
    },2000); 
}
 document.getElementById('cep').addEventListener('focusout',pesquisarCep);
         




function errorValidation(input, message){
    const controleform = input.parentElement;
    const small = controleform.querySelector('small');

    small.innerText = message;
    controleform.className = 'controle_form error';
    document.getElementById('Rua').value = '';
    document.getElementById('Bairro').value = '';
    document.getElementById('Cidade').value = '';
    document.getElementById('UF').value = '';
    document.getElementById('IBGE').value = '';
    document.getElementById('DDD').value = '';
}

function successValidation(input){
    const controleform = input.parentElement;

    controleform.className = 'controle_form success';
}         

function successValidationMenor(input){
    const controleform = input.parentElement;
    
    controleform.className = 'controle_form_menor success';
}         
function successValidationMaior(input){
    const controleform = input.parentElement;
    
    controleform.className = 'controle_form_maior success';
}       

function inputSemCor(input){
    const controleform = input.parentElement;
    
    controleform.className = 'controle_form';
}       

function inputSemCorMaior(input){
    const controleform = input.parentElement;
    
    controleform.className = 'controle_form_maior';
}       

function inputSemCorMenor(input){
    const controleform = input.parentElement;
    
    controleform.className = 'controle_form_menor';
}       
