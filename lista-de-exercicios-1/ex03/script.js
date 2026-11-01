'use strict';

// 1. Funções puras com a regra do problema (testáveis isoladamente).

function conversorServidor(s){
    let dias = Math.floor(s / 86400);
    let horas = Math.floor((s % 86400) / 3600);
    let minutos = Math.floor((s % 3600) / 60);
    let segundos = s % 60;
     horas = String(horas).padStart(2, '0');
    minutos = String(minutos).padStart(2, '0');
    segundos = String(segundos).padStart(2, '0');

      if (s >= 86400) {
        return `${dias} dias, ${horas}:${minutos}:${segundos}`;
    } else {
        return `${horas}:${minutos}:${segundos}`;
    }

}

function conversorIso(s){
    let dias = Math.floor(s / 86400);
    let horas = Math.floor((s % 86400) / 3600);
    let minutos = Math.floor((s % 3600) / 60);
    let segundos = s % 60;

    let resultado = 'P';

   
    if(dias > 0){
        resultado += `${dias}D`;
    }
    if (horas > 0 || minutos > 0 || segundos > 0 || s === 0) {
        resultado += 'T';
    }
    if (horas > 0) {
        resultado += `${horas}H`;
    }

    if (minutos > 0) {
        resultado += `${minutos}M`;
    }

    if (segundos > 0) {
        resultado += `${segundos}S`;
    }

    if (s === 0) {
        resultado += '0S';
    }

    return resultado;
}
// 2. Integração com a página (leitura, validação e exibição).
document.querySelector('#formulario').addEventListener('submit', (evento) => {
  evento.preventDefault();
  const texto = document.querySelector('#entrada').value.trim();
  const saida = document.querySelector('#saida');
  const s = Number(texto.replace(',' , '.'));

    let conversaoIso;
    let conversaoServidor;
if (texto === '' || !Number.isFinite(s) || s < 0 || !Number.isInteger(s)) {
    saida.textContent = 'O número de segundos deve ser inteiro e positivo!';
    return;
} else {
    conversaoIso = conversorIso(s);
    conversaoServidor = conversorServidor(s);
}

  saida.textContent = ` ${s} Segundos tem duração de ${conversaoServidor} para contagem uptime de servidor e ${conversaoIso} de acordo com a ISO 8601 .`;
});
