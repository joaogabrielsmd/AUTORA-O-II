
'use strict';

// 1. Conexão com os elementos HTML

const senha = document.querySelector('#senha');
const resultado = document.querySelector('#resultado');


// 2. Analisar a senha

function analisarSenha() {

  // Receber a senha digitada

  let texto = senha.value;

  // Inicializar os contadores

  let minusculas = 0;
  let maiusculas = 0;
  let digitos = 0;
  let simbolos = 0;
  let comprimento = 0;

  // 3. Percorrer cada caractere da senha

  for (let caractere of texto) {

    comprimento++;

    // Verificar letras minúsculas

    if (caractere >= 'a' && caractere <= 'z') {

      minusculas++;

    }

    // Verificar letras maiúsculas

    else if (caractere >= 'A' && caractere <= 'Z') {

      maiusculas++;

    }

    // Verificar números

    else if (caractere >= '0' && caractere <= '9') {

      digitos++;

    }

    // Os demais caracteres serão considerados símbolos

    else {

      simbolos++;

    }
  }


  // 4. Verificar se existe uma senha digitada

  if (comprimento === 0) {

    resultado.textContent =
      'Digite uma senha para iniciar a análise.';

    resultado.className = '';

    return;
  }


  // 5. Calcular o tamanho do alfabeto (N)

  let N = 0;

  if (minusculas > 0) {
    N += 26;
  }

  if (maiusculas > 0) {
    N += 26;
  }

  if (digitos > 0) {
    N += 10;
  }

  if (simbolos > 0) {
    N += 33;
  }


  // 6. Calcular a entropia (H)

  let H = comprimento * Math.log2(N);


  // 7. Classificar a senha

  let classificacao;
  let classeCSS;

  if (H < 40) {

    classificacao = 'Fraca';
    classeCSS = 'fraca';

  } else if (H < 80) {

    classificacao = 'Média';
    classeCSS = 'media';

  } else {

    classificacao = 'Forte';
    classeCSS = 'forte';
  }


  // 8. Exibir as contagens e os resultados

  let mensagem =
    'Comprimento: ' + comprimento + ' caracteres\n\n' +

    'Minúsculas: ' + minusculas + '\n' +
    'Maiúsculas: ' + maiusculas + '\n' +
    'Dígitos: ' + digitos + '\n' +
    'Símbolos: ' + simbolos + '\n\n' +

    'Tamanho do alfabeto (N): ' + N + '\n' +

    'Entropia (H): ' + H.toFixed(1) + ' bits\n\n' +

    'Classificação: ' + classificacao;


  // 9. Alertas adicionais

  if (comprimento < 8) {

    mensagem +=
      '\n\nAtenção: sua senha possui menos de 8 caracteres.';
  }


  // Contar quantos tipos de caracteres foram utilizados

  let tipos = 0;

  if (minusculas > 0) {
    tipos++;
  }

  if (maiusculas > 0) {
    tipos++;
  }

  if (digitos > 0) {
    tipos++;
  }

  if (simbolos > 0) {
    tipos++;
  }


  if (tipos === 1) {

    mensagem +=
      '\nAtenção: sua senha utiliza apenas um tipo de caractere.';
  }


  // 10. Atualizar o resultado na página

  resultado.textContent = mensagem;

  resultado.className = classeCSS;

}


// 11. Atualizar o diagnóstico a cada caractere digitado

senha.addEventListener('input', analisarSenha);