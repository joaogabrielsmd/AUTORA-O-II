
'use strict';

// 1. Selecionar os elementos HTML.

const entrada = document.querySelector('#entrada');
const botao = document.querySelector('#converter');
const resultado = document.querySelector('#resultado');


// 2. Retornar o símbolo correspondente a cada valor.

function simbolo(valor) {

  switch (valor) {

    case 1000: return 'M';
    case 900: return 'CM';
    case 500: return 'D';
    case 400: return 'CD';
    case 100: return 'C';
    case 90: return 'XC';
    case 50: return 'L';
    case 40: return 'XL';
    case 10: return 'X';
    case 9: return 'IX';
    case 5: return 'V';
    case 4: return 'IV';
    case 1: return 'I';

    default: return '';
  }

}


// 3. Encontrar o próximo valor da sequência.

function proximoValor(valor) {

  switch (valor) {

    case 1000: return 900;
    case 900: return 500;
    case 500: return 400;
    case 400: return 100;
    case 100: return 90;
    case 90: return 50;
    case 50: return 40;
    case 40: return 10;
    case 10: return 9;
    case 9: return 5;
    case 5: return 4;
    case 4: return 1;
    case 1: return 0;

    default: return 0;
  }

}


// 4. Converter decimal para romano utilizando recursividade.

function paraRomano(n) {

  // Caso-base.
  if (n === 0) {
    return '';
  }

  let valor = 1000;

  // Encontrar o maior valor que não excede n.
  while (valor > n) {
    valor = proximoValor(valor);
  }

  // Concatenar o símbolo e chamar a própria função.
  return simbolo(valor) + paraRomano(n - valor);

}


// 5. Retornar o valor decimal de cada símbolo romano.

function valorRomano(caractere) {

  switch (caractere) {

    case 'I': return 1;
    case 'V': return 5;
    case 'X': return 10;
    case 'L': return 50;
    case 'C': return 100;
    case 'D': return 500;
    case 'M': return 1000;

    default: return 0;
  }

}


// 6. Converter romano para decimal.

function paraDecimal(romano) {

  let soma = 0;

  for (let i = 0; i < romano.length; i++) {

    let atual = valorRomano(romano[i]);

    let seguinte = 0;

    // Verificar o próximo símbolo, se existir.
    if (i + 1 < romano.length) {
      seguinte = valorRomano(romano[i + 1]);
    }

    // Aplicar a regra de subtração ou adição.
    if (atual < seguinte) {
      soma -= atual;
    } else {
      soma += atual;
    }

  }

  return soma;

}


// 7. Gerar a decomposição do numeral romano.

function decomporRomano(romano) {

  let decomposicao = '';
  let soma = 0;

  for (let i = 0; i < romano.length; i++) {

    let atual = valorRomano(romano[i]);
    let seguinte = 0;

    if (i + 1 < romano.length) {
      seguinte = valorRomano(romano[i + 1]);
    }

    let parcela;

    if (atual < seguinte) {
      parcela = -atual;
    } else {
      parcela = atual;
    }

    // Acrescentar o sinal de adição ou subtração.
    if (decomposicao !== '') {
      if (parcela < 0) {
        decomposicao += ' - ' + Math.abs(parcela);
      } else {
        decomposicao += ' + ' + parcela;
      }
    } else {
      decomposicao += parcela;
    }

    soma += parcela;

  }

  return decomposicao + ' = ' + soma;

}


// 8. Exibir mensagens de erro.

function exibirErro(mensagem) {

  resultado.className = 'erro';
  resultado.textContent = mensagem;

}


// 9. Identificar o tipo de entrada e realizar a conversão.

function converter() {

  let texto = entrada.value.trim();

  resultado.textContent = '';

  // Verificar se o campo está vazio.
  if (texto === '') {
    exibirErro('Digite um número decimal ou romano.');
    return;
  }


  // Verificar se a entrada contém somente algarismos decimais.
  let ehDecimal = true;

  for (let caractere of texto) {

    if (caractere < '0' || caractere > '9') {
      ehDecimal = false;
      break;
    }

  }


  // 10. DECIMAL PARA ROMANO.

  if (ehDecimal) {

    let numero = Number(texto);

    // Verificar se é um inteiro entre 1 e 3999.
    if (!Number.isInteger(numero) || numero < 1 || numero > 3999) {
      exibirErro('Número inválido. Digite um inteiro entre 1 e 3999.');
      return;
    }

    let romano = paraRomano(numero);

    let decomposicao = decomporRomano(romano);

    resultado.className = 'sucesso';

    resultado.textContent =
      'Conversão decimal para romano:\n' +
      numero + ' = ' + romano + '\n\n' +
      'Decomposição:\n' +
      decomposicao;

    return;

  }


  // 11. ROMANO PARA DECIMAL.

  let romano = texto.toUpperCase();

  // Verificar se todos os caracteres são símbolos romanos.
  for (let caractere of romano) {

    if (valorRomano(caractere) === 0) {
      exibirErro('Caractere inválido: ' + caractere);
      return;
    }

  }


  // Converter o numeral romano para decimal.
  let numero = paraDecimal(romano);


  // Verificar se o resultado está dentro do intervalo.
  if (numero < 1 || numero > 3999) {
    exibirErro('Numeral romano fora do intervalo representável (1 a 3999).');
    return;
  }


  // 12. Verificar se a forma romana é canônica.
  let formaCorreta = paraRomano(numero);

  if (romano !== formaCorreta) {

    exibirErro(
      'Numeral romano não canônico.\n' +
      'Forma digitada: ' + romano + '\n' +
      'Forma canônica correta: ' + formaCorreta
    );

    return;
  }


  // 13. Exibir o resultado válido.
  let decomposicao = decomporRomano(romano);

  resultado.className = 'sucesso';

  resultado.textContent =
    'Conversão romano para decimal:\n' +
    romano + ' = ' + numero + '\n\n' +
    'Decomposição:\n' +
    decomposicao;

}


// 14. Evento do botão.

botao.addEventListener('click', converter);


// Também permite converter ao pressionar Enter.
entrada.addEventListener('keydown', function(evento) {

  if (evento.key === 'Enter') {
    converter();
  }

});
