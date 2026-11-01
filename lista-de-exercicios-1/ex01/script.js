'use strict';

// 1. Funções puras com a regra do problema (testáveis isoladamente).


function cParaf(c) {
  return c*(9/5) + 32;
}

function cParak(c){
  return c + 273.15;
}





// 2. Integração com a página (leitura, validação e exibição).
document.querySelector('#formulario').addEventListener('submit', (evento) => {
  evento.preventDefault();
  const c = document.querySelector('#entrada').value.trim();
  const saida = document.querySelector('#saida');
  const celsius = Number(c.replace(',', '.'));
 // const converte = document.querySelector("#converte");
  const processar = document.querySelector("#processar");


  if (c === '') {
    saida.textContent = 'Preencha o campo de entrada!';
    return;
  }

   if (!Number.isFinite(celsius)) {
    saida.textContent = 'Preencha o campo de entrada com valores numéricos!';
    return;
  }

  if (celsius < -273.15) {
    saida.textContent = 'Temperatura abaixo do zero absoluto!';
    return;
  }
   
   const fahrenheit = cParaf(celsius);
   const kelvin = cParak(celsius);
  saida.textContent = `${celsius} °C equivalem a ${fahrenheit.toFixed(2)} °F e ${kelvin.toFixed(2)} K`;

});
 