'use strict';

// 1. Funções puras com a regra do problema (testáveis isoladamente).
function litros(dist,consumo) {
  return dist / consumo;
}
 

 function custoTotal(res,preco){
    return res * preco;

 }
 

 function custoPessoa(c,qtdPessoas){
    return c / qtdPessoas;
 }

//console.log(`Você precisará abastecer ${res.toFixed(2)} L. Litros a abastecer: ${Math.ceil(res)}. Custo Total: ${c.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}. Custo por pessoa: ${p.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`);

// 2. Integração com a página (leitura, validação e exibição).

document.querySelector('#formulario').addEventListener('submit', (evento) => {
  evento.preventDefault();
    console.log('O formulário foi enviado!');
    const distTexto = document.querySelector('#entradadist').value.trim();
    const consumoTexto = document.querySelector('#entradac').value.trim();
    const precoTexto = document.querySelector('#entradapreco').value.trim();
    const qtdPessoasTexto = document.querySelector('#entradap').value.trim();
    const saida = document.querySelector('#saida');
    const processar = document.querySelector('#processar');

     
    
   
    
    
   //CONVERSÃO DOS VALORES PARA NÚMEROS
    const dist = Number(distTexto.replace(',', '.'));
    const consumo = Number(consumoTexto.replace(',', '.'));
    const preco = Number(precoTexto.replace(',', '.'));
    const qtdPessoas = Number(qtdPessoasTexto.replace(',', '.'));
    const res = litros(dist,consumo);
    const c = custoTotal(res,preco);
    const p = custoPessoa(c,qtdPessoas);

     if(!Number.isInteger(qtdPessoas)){
      saida.textContent = 'O número de pessoas deve ser inteiro!'
      return;
    }

     if (dist <=0 || consumo <=0 || preco <=0 || qtdPessoas<=0) {
    saida.textContent = 'Os valores devem ser positivos e maiores que 0';
    return;
  }

   


  saida.textContent = `Você precisará abastecer ${res.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} L. Litros a abastecer: ${Math.ceil(res)}. Custo Total: ${c.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}. Custo por pessoa: ${p.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
});
