
'use strict';

// 1. Conexão com os elementos HTML

const compra = document.querySelector('#compra');
const pago = document.querySelector('#pago');
const botao = document.querySelector('#calcular');
const resultado = document.querySelector('#resultado');


// 2. Converter valores monetários para centavos inteiros

function converterCentavos(valor) {

  valor = valor.trim();

  // Aceita números inteiros ou até duas casas decimais
  // utilizando vírgula como separador decimal.

  if (!/^\d+(,\d{1,2})?$/.test(valor)) {
    return null;
  }

  let partes = valor.split(',');

  let reais = Number(partes[0]);
  let centavos = Number((partes[1] || '').padEnd(2, '0'));

  let total = reais * 100 + centavos;

  if (!Number.isSafeInteger(total)) {
    return null;
  }

  return total;
}


// 3. Descobrir a próxima denominação

function proximaDenominacao(centavos) {

  switch (centavos) {

    case 20000: return 10000;
    case 10000: return 5000;
    case 5000: return 2000;
    case 2000: return 1000;
    case 1000: return 500;
    case 500: return 200;
    case 200: return 100;
    case 100: return 50;
    case 50: return 25;
    case 25: return 10;
    case 10: return 5;
    case 5: return 1;
    case 1: return 0;

    default: return 0;
  }
}


// 4. Formatar centavos para exibição monetária

function formatarMoeda(centavos) {

  let reais = Math.floor(centavos / 100);
  let resto = String(centavos % 100).padStart(2, '0');

  return 'R$ ' + reais.toLocaleString('pt-BR') + ',' + resto;
}


// 5. Calcular o troco

function calcularTroco() {

  resultado.textContent = '';

  // Receber os valores informados

  let valorCompra = converterCentavos(compra.value);
  let valorPago = converterCentavos(pago.value);

  // Validar entradas

  if (valorCompra === null || valorPago === null) {
    resultado.textContent =
      'Informe valores válidos, utilizando no máximo duas casas decimais.';
    return;
  }

  // Verificar se o pagamento é insuficiente

  if (valorPago < valorCompra) {

    let falta = valorCompra - valorPago;

    resultado.textContent =
      'Pagamento insuficiente! Faltam ' + formatarMoeda(falta);

    return;
  }

  // Verificar se não existe troco

  if (valorPago === valorCompra) {

    resultado.textContent = 'Sem troco!';

    return;
  }

  // Calcular o valor do troco em centavos

  let troco = valorPago - valorCompra;

  let restante = troco;
  let totalPecas = 0;

  // Exibir o valor total do troco

  const titulo = document.createElement('p');

  titulo.textContent = 'Troco total: ' + formatarMoeda(troco);

  resultado.appendChild(titulo);

  // Criar lista para apresentar as denominações utilizadas

  const lista = document.createElement('ul');

  // 6. Algoritmo guloso: maior denominação para a menor

  for (
    let d = 20000;
    d > 0;
    d = proximaDenominacao(d)
  ) {

    // Descobrir quantas peças dessa denominação serão utilizadas

    let quantidade = Math.floor(restante / d);

    // Atualizar o valor restante

    restante = restante % d;

    // Somar ao total de peças utilizadas

    totalPecas += quantidade;

    // Exibir somente as denominações utilizadas

    if (quantidade > 0) {

      const item = document.createElement('li');

      let tipo = d >= 200 ? 'Moeda' : 'Moeda';

      if (d >= 200) {
        tipo = 'Cédula';
      }

      item.textContent =
        quantidade + ' ' + tipo + '(s) de ' + formatarMoeda(d);

      lista.appendChild(item);
    }
  }

  // 7. Exibir os resultados

  resultado.appendChild(lista);

  const total = document.createElement('p');

  total.textContent = 'Total de peças: ' + totalPecas;

  resultado.appendChild(total);
}


// 8. Evento do botão

botao.addEventListener('click', calcularTroco);
