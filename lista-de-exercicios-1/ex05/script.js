
'use strict';

// 1. Conexão com os elementos HTML

const ladoA = document.querySelector('#ladoA');
const ladoB = document.querySelector('#ladoB');
const ladoC = document.querySelector('#ladoC');

const botao = document.querySelector('#calcular');
const resultado = document.querySelector('#resultado');


// 2. Converter as entradas para números reais

function converterNumero(valor) {

  valor = valor.trim();

  // Aceitar números com ponto ou vírgula decimal

  if (!/^\d+([,.]\d+)?$/.test(valor)) {
    return null;
  }

  valor = valor.replace(',', '.');

  let numero = Number(valor);

  if (!Number.isFinite(numero) || numero <= 0) {
    return null;
  }

  return numero;
}


// 3. Comparar valores considerando a tolerância relativa

function valoresIguais(x, y) {

  let diferenca = Math.abs(x - y);

  let maiorValor = Math.max(Math.abs(x), Math.abs(y));

  return (diferenca / maiorValor) < 0.000001;
}


// 4. Calcular e classificar o triângulo

function calcularTriangulo() {

  resultado.textContent = '';

  // Receber os três lados

  let a = converterNumero(ladoA.value);
  let b = converterNumero(ladoB.value);
  let c = converterNumero(ladoC.value);

  // Validar as entradas

  if (a === null || b === null || c === null) {

    resultado.textContent =
      'Informe três medidas positivas e válidas.';

    return;
  }


  // 5. Verificar a desigualdade triangular

  if (a >= b + c || b >= a + c || c >= a + b) {

    resultado.textContent =
      'As medidas informadas não formam um triângulo válido.';

    return;
  }


  // 6. Classificar quanto aos lados

  let classificacaoLados;

  if (a === b && b === c) {

    classificacaoLados = 'Equilátero';

  } else if (a === b || a === c || b === c) {

    classificacaoLados = 'Isósceles';

  } else {

    classificacaoLados = 'Escaleno';
  }


  // 7. Identificar o maior lado

  let maior = Math.max(a, b, c);

  // Identificar os outros dois lados

  let somaQuadrados;

  if (maior === a) {

    somaQuadrados = (b * b) + (c * c);

  } else if (maior === b) {

    somaQuadrados = (a * a) + (c * c);

  } else {

    somaQuadrados = (a * a) + (b * b);
  }


  // 8. Comparar os quadrados para classificar os ângulos

  let maiorQuadrado = maior * maior;

  let classificacaoAngulos;

  if (valoresIguais(maiorQuadrado, somaQuadrados)) {

    classificacaoAngulos = 'Retângulo';

  } else if (maiorQuadrado > somaQuadrados) {

    classificacaoAngulos = 'Obtusângulo';

  } else {

    classificacaoAngulos = 'Acutângulo';
  }


  // 9. Calcular o perímetro

  let perimetro = a + b + c;


  // 10. Calcular a área pela fórmula de Heron

  let semiperimetro = perimetro / 2;

  let radicando =
    semiperimetro *
    (semiperimetro - a) *
    (semiperimetro - b) *
    (semiperimetro - c);

  let area = Math.sqrt(Math.max(0, radicando));


  // 11. Exibir os resultados

  resultado.textContent =
    'Triângulo válido!\n\n' +

    'Classificação quanto aos lados: ' +
    classificacaoLados + '\n' +

    'Classificação quanto aos ângulos: ' +
    classificacaoAngulos + '\n\n' +

    'Perímetro: ' + perimetro.toFixed(2) + ' m\n' +

    'Semiperímetro: ' + semiperimetro.toFixed(2) + ' m\n' +

    'Área: ' + area.toFixed(4) + ' m²';
}


// 12. Evento do botão

botao.addEventListener('click', calcularTriangulo);
