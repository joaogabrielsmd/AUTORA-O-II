
'use strict';

// 1. Selecionar os elementos HTML.

const campoCPF = document.querySelector('#cpf');
const botaoGerar = document.querySelector('#gerar');
const resultado = document.querySelector('#resultado');


// 2. Extrair somente os números do CPF.
// Percorre a string com for...of, sem utilizar expressão regular.

function extrairDigitos(texto) {

  let digitos = '';

  for (let caractere of texto) {

    if (caractere >= '0' && caractere <= '9') {
      digitos += caractere;
    }

  }

  return digitos;
}


// 3. Calcular um dígito verificador.
// pesoInicial permite reutilizar a função para os dois DVs.

function calcularDV(digitos, pesoInicial) {

  let soma = 0;

  for (let i = 0; i < digitos.length; i++) {

    let peso = pesoInicial - i;

    soma += Number(digitos[i]) * peso;

  }

  let resto = (soma * 10) % 11;

  if (resto === 10) {
    return 0;
  }

  return resto;
}


// 4. Formatar o CPF.

function formatarCPF(cpf) {

  return cpf.substring(0, 3) + '.' +
         cpf.substring(3, 6) + '.' +
         cpf.substring(6, 9) + '-' +
         cpf.substring(9, 11);

}


// 5. Identificar a região fiscal pelo nono dígito.

function identificarRegiao(digito) {

  switch (digito) {

    case '1':
      return 'DF, GO, MS, MT e TO';

    case '2':
      return 'AC, AM, AP, PA, RO e RR';

    case '3':
      return 'CE, MA e PI';

    case '4':
      return 'AL, PB, PE e RN';

    case '5':
      return 'BA e SE';

    case '6':
      return 'MG';

    case '7':
      return 'ES e RJ';

    case '8':
      return 'SP';

    case '9':
      return 'PR e SC';

    case '0':
      return 'RS';

    default:
      return 'Região não identificada';

  }

}


// 6. Validar o CPF.

function validarCPF() {

  // Extrair somente os dígitos.
  let cpf = extrairDigitos(campoCPF.value);

  resultado.className = 'invalido';

  // (a) Verificar se possui exatamente 11 dígitos.

  if (cpf.length !== 11) {

    resultado.textContent =
      'CPF inválido: informe exatamente 11 dígitos.';

    return;
  }


  // (b) Verificar se todos os dígitos são iguais.

  let todosIguais = true;

  for (let i = 1; i < cpf.length; i++) {

    if (cpf[i] !== cpf[0]) {
      todosIguais = false;
      break;
    }

  }

  if (todosIguais) {

    resultado.textContent =
      'CPF inválido: todos os dígitos são iguais.';

    return;
  }


  // (c) Calcular e verificar o primeiro DV.

  let primeiroDV = calcularDV(cpf.substring(0, 9), 10);

  if (primeiroDV !== Number(cpf[9])) {

    resultado.textContent =
      'CPF inválido: primeiro dígito verificador incorreto. ' +
      'Valor esperado: ' + primeiroDV + '.';

    return;
  }


  // (d) Calcular e verificar o segundo DV.

  let segundoDV = calcularDV(cpf.substring(0, 10), 11);

  if (segundoDV !== Number(cpf[10])) {

    resultado.textContent =
      'CPF inválido: segundo dígito verificador incorreto. ' +
      'Valor esperado: ' + segundoDV + '.';

    return;
  }


  // Se passou por todas as verificações, o CPF é válido.

  let cpfFormatado = formatarCPF(cpf);

  let nonoDigito = cpf[8];

  let regiao = identificarRegiao(nonoDigito);

  resultado.className = 'valido';

  resultado.textContent =
    'CPF válido!\n' +
    'CPF: ' + cpfFormatado + '\n' +
    'Região fiscal: ' + regiao;

}


// 7. Gerar um CPF de teste.

function gerarCPF() {

  let primeirosNove;

  do {

    primeirosNove = '';

    // Sortear nove dígitos.
    for (let i = 0; i < 9; i++) {

      primeirosNove += Math.floor(Math.random() * 10);

    }

  } while (todosDigitosIguais(primeirosNove));


  // Calcular o primeiro DV.
  let dv1 = calcularDV(primeirosNove, 10);

  // Acrescentar o primeiro DV aos nove dígitos.
  let dezDigitos = primeirosNove + dv1;

  // Calcular o segundo DV.
  let dv2 = calcularDV(dezDigitos, 11);

  // Montar o CPF completo.
  let cpfCompleto = dezDigitos + dv2;

  // Preencher o campo com o CPF formatado.
  campoCPF.value = formatarCPF(cpfCompleto);

  // Validar o CPF gerado.
  validarCPF();

}


// Função auxiliar para verificar os nove dígitos sorteados.

function todosDigitosIguais(texto) {

  for (let i = 1; i < texto.length; i++) {

    if (texto[i] !== texto[0]) {
      return false;
    }

  }

  return true;

}


// 8. Eventos.

// Validar automaticamente enquanto o usuário digita.
campoCPF.addEventListener('input', validarCPF);

// Gerar um CPF de teste quando clicar no botão.
botaoGerar.addEventListener('click', gerarCPF);
