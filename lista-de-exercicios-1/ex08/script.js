
'use strict';

// 1. Selecionar os elementos HTML.
const seletorCor = document.querySelector('#seletorCor');

const hexadecimal = document.querySelector('#hexadecimal');
const inteiro = document.querySelector('#inteiro');
const binario = document.querySelector('#binario');

const canalR = document.querySelector('#canalR');
const canalG = document.querySelector('#canalG');
const canalB = document.querySelector('#canalB');

const luminancia = document.querySelector('#luminancia');

const contrasteBranco = document.querySelector('#contrasteBranco');
const contrastePreto = document.querySelector('#contrastePreto');
const corTexto = document.querySelector('#corTexto');
const resultadoAA = document.querySelector('#resultadoAA');

const complementar = document.querySelector('#complementar');
const amostraComplementar = document.querySelector('#amostraComplementar');

const amostra = document.querySelector('#amostra');


// 2. Converter um canal RGB para luminância linear.
function calcularCanalLinear(valor) {

  let c = valor / 255;

  if (c <= 0.04045) {
    return c / 12.92;
  } else {
    return ((c + 0.055) / 1.055) ** 2.4;
  }

}


// 3. Calcular a luminância relativa da cor.
function calcularLuminancia(r, g, b) {

  let rLin = calcularCanalLinear(r);
  let gLin = calcularCanalLinear(g);
  let bLin = calcularCanalLinear(b);

  return 0.2126 * rLin +
         0.7152 * gLin +
         0.0722 * bLin;

}


// 4. Analisar a cor escolhida.
function analisarCor() {

  // Obter o valor hexadecimal.
  let cor = seletorCor.value;

  hexadecimal.textContent = cor;

  // Converter hexadecimal em inteiro de 24 bits.
  let n = parseInt(cor.substring(1), 16);

  inteiro.textContent = n;

  // Extrair os canais usando operadores bit a bit.
  let r = (n >> 16) & 0xFF;
  let g = (n >> 8) & 0xFF;
  let b = n & 0xFF;

  // Exibir os canais em decimal.
  canalR.textContent = r;
  canalG.textContent = g;
  canalB.textContent = b;

  // Converter para binário e completar 24 bits.
  let representacaoBinaria = n.toString(2).padStart(24, '0');

  binario.textContent = representacaoBinaria;

  // Calcular a luminância relativa.
  let L = calcularLuminancia(r, g, b);

  luminancia.textContent = L.toFixed(6);


  // 5. Calcular as razões de contraste.
  let cBranco = 1.05 / (L + 0.05);
  let cPreto = (L + 0.05) / 0.05;

  contrasteBranco.textContent = cBranco.toFixed(2) + ':1';
  contrastePreto.textContent = cPreto.toFixed(2) + ':1';


  // Escolher automaticamente o texto com maior contraste.
  let textoRecomendado;
  let maiorContraste;

  if (cBranco > cPreto) {
    textoRecomendado = '#FFFFFF';
    maiorContraste = cBranco;
  } else {
    textoRecomendado = '#000000';
    maiorContraste = cPreto;
  }

  corTexto.textContent = textoRecomendado;


  // Verificar se atende ao nível AA.
  if (maiorContraste >= 4.5) {
    resultadoAA.textContent = 'Atende ao nível AA (4,5:1 ou superior).';
  } else {
    resultadoAA.textContent = 'Não atende ao nível AA.';
  }


  // 6. Inverter os 24 bits para obter a cor complementar.
  let nComplementar = (~n) & 0xFFFFFF;

  let hexComplementar = '#' +
    nComplementar.toString(16).padStart(6, '0').toUpperCase();

  complementar.textContent = hexComplementar;

  // Aplicar a cor complementar à amostra.
  amostraComplementar.style.backgroundColor = hexComplementar;


  // 7. Atualizar a amostra de texto.
  amostra.style.backgroundColor = cor;
  amostra.style.color = textoRecomendado;

}


// 8. Executar a análise quando a cor mudar.
seletorCor.addEventListener('input', analisarCor);


// Executar uma análise inicial ao abrir a página.
analisarCor();
