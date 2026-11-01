
'use strict';

// 1. Conexão com os elementos HTML

const valor = document.querySelector('#valor');
const taxa = document.querySelector('#taxa');
const parcelas = document.querySelector('#parcelas');

const botao = document.querySelector('#calcular');
const resultado = document.querySelector('#resultado');
const tabelaContainer = document.querySelector('#tabela-container');


// 2. Converter os valores informados para números

function converterNumero(valor) {

  valor = valor.trim();

  // Aceitar números com vírgula ou ponto decimal

  if (!/^\d+([,.]\d+)?$/.test(valor)) {
    return null;
  }

  valor = valor.replace(',', '.');

  let numero = Number(valor);

  if (!Number.isFinite(numero)) {
    return null;
  }

  return numero;
}


// 3. Formatar valores monetários para exibição

function formatarMoeda(numero) {

  return numero.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}


// 4. Calcular o financiamento

function calcularFinanciamento() {

  // Limpar resultados anteriores

  resultado.textContent = '';
  tabelaContainer.textContent = '';

  // Receber os valores informados

  let PV = converterNumero(valor.value);
  let i = converterNumero(taxa.value);
  let n = Number(parcelas.value);

  // Validar os dados

  if (PV === null || i === null || PV <= 0 || i < 0) {

    resultado.textContent =
      'Informe um valor financiado positivo e uma taxa de juros válida.';

    return;
  }

  if (
    parcelas.value.trim() === '' ||
    !Number.isInteger(n) ||
    n <= 0 ||
    !Number.isSafeInteger(n)
  ) {

    resultado.textContent =
      'Informe um número inteiro positivo de parcelas.';

    return;
  }


  // 5. Converter a taxa percentual para decimal

  i = i / 100;


  // 6. Calcular o valor da parcela fixa (PMT)

  let PMT;

  if (i === 0) {

    PMT = PV / n;

  } else {

    PMT = (PV * i) / (1 - Math.pow(1 + i, -n));

  }


  // 7. Inicializar as variáveis de controle

  let saldo = PV;

  let totalPago = 0;
  let totalJuros = 0;


  // 8. Criar a tabela HTML

  const tabela = document.createElement('table');

  const cabecalho = document.createElement('thead');
  const linhaCabecalho = document.createElement('tr');

  // Criar os títulos das colunas

  const titulo1 = document.createElement('th');
  titulo1.textContent = 'Parcela';

  const titulo2 = document.createElement('th');
  titulo2.textContent = 'Valor da parcela';

  const titulo3 = document.createElement('th');
  titulo3.textContent = 'Juros';

  const titulo4 = document.createElement('th');
  titulo4.textContent = 'Amortização';

  const titulo5 = document.createElement('th');
  titulo5.textContent = 'Saldo devedor';

  // Inserir os títulos na linha

  linhaCabecalho.appendChild(titulo1);
  linhaCabecalho.appendChild(titulo2);
  linhaCabecalho.appendChild(titulo3);
  linhaCabecalho.appendChild(titulo4);
  linhaCabecalho.appendChild(titulo5);

  cabecalho.appendChild(linhaCabecalho);
  tabela.appendChild(cabecalho);


  // Criar o corpo da tabela

  const corpo = document.createElement('tbody');


  // 9. Gerar as parcelas utilizando o laço for

  for (let parcela = 1; parcela <= n; parcela++) {

    // Calcular os juros do mês

    let juros = saldo * i;

    // Calcular a amortização

    let amortizacao = PMT - juros;

    // Atualizar o saldo devedor

    let novoSaldo = saldo - amortizacao;

    // Corrigir o pequeno resíduo numérico da última parcela

    if (parcela === n) {
      novoSaldo = 0;
    }

    // Acumular os totais

    totalPago += PMT;
    totalJuros += juros;


    // 10. Criar uma linha para a parcela atual

    const linha = document.createElement('tr');

    const coluna1 = document.createElement('td');
    coluna1.textContent = parcela;

    const coluna2 = document.createElement('td');
    coluna2.textContent = formatarMoeda(PMT);

    const coluna3 = document.createElement('td');
    coluna3.textContent = formatarMoeda(juros);

    const coluna4 = document.createElement('td');
    coluna4.textContent = formatarMoeda(amortizacao);

    const coluna5 = document.createElement('td');
    coluna5.textContent = formatarMoeda(novoSaldo);


    // Inserir as colunas na linha

    linha.appendChild(coluna1);
    linha.appendChild(coluna2);
    linha.appendChild(coluna3);
    linha.appendChild(coluna4);
    linha.appendChild(coluna5);


    // Inserir a linha no corpo da tabela

    corpo.appendChild(linha);


    // Atualizar o saldo para a próxima parcela

    saldo = novoSaldo;
  }


  // 11. Finalizar a tabela

  tabela.appendChild(corpo);

  tabelaContainer.appendChild(tabela);


  // 12. Exibir o resumo do financiamento

  resultado.textContent =

    'Valor financiado: ' + formatarMoeda(PV) + '\n' +

    'Taxa de juros mensal: ' + (i * 100).toFixed(2) + '%\n' +

    'Número de parcelas: ' + n + '\n' +

    'Valor da parcela fixa: ' + formatarMoeda(PMT) + '\n\n' +

    'Total pago: ' + formatarMoeda(totalPago) + '\n' +

    'Total de juros: ' + formatarMoeda(totalJuros);
}


// 13. Evento do botão

botao.addEventListener('click', calcularFinanciamento);
