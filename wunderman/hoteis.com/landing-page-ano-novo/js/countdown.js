window.onload=function(){
  countDownWeeks();
} 

function countDownWeeks(){

  //Variáveis com a data limite, no caso 31/12/2013 às 23:59:59.
  var years = 2013;
  var months = 11;
  var days = 31;
  var hours = 23;
  var minutes = 59;
  var seconds = 59;

  //Variável com a Data atual.
  var today = new Date();

  //Variável com a Data do Ano novo configurada.
  var newYear = new Date(years, months, days, hours, minutes, seconds);

  // Total dos dias de hoje até o ano novo em segundos.
  var totalSeconds = parseInt((newYear - today) /1000);
  
  // 1 dia é igual a 86400 segundos.
  var daySeconds = 60 * 60 * 24; 

  // 7 dias é igual a 604800 segundos.
  var weekSeconds = daySeconds * 7; 

  // Números de semanas até o Ano Novo.
  var numberOfWeeks = parseInt(totalSeconds / weekSeconds);

  switch(numberOfWeeks){
    case 8 :
      document.getElementById('firstNum').innerHTML = '<img src="img/0.png" />';
      document.getElementById('secondNum').innerHTML = '<img src="img/8.png" />';
      break;
    case 7 :
      document.getElementById('firstNum').innerHTML = '<img src="img/0.png" />';
      document.getElementById('secondNum').innerHTML = '<img src="img/7.png" />';
      break;
    case 6 :
      document.getElementById('firstNum').innerHTML = '<img src="img/0.png" />';
      document.getElementById('secondNum').innerHTML = '<img src="img/6.png" />';
      break;
    case 5 :
      document.getElementById('firstNum').innerHTML = '<img src="img/0.png" />';
      document.getElementById('secondNum').innerHTML = '<img src="img/5.png" />';
      break;
    case 4 :
      document.getElementById('firstNum').innerHTML = '<img src="img/0.png" />';
      document.getElementById('secondNum').innerHTML = '<img src="img/4.png" />';
      break;
    case 3 :
      document.getElementById('firstNum').innerHTML = '<img src="img/0.png" />';
      document.getElementById('secondNum').innerHTML = '<img src="img/3.png" />';
      break;
    case 2 :
      document.getElementById('firstNum').innerHTML = '<img src="img/0.png" />';
      document.getElementById('secondNum').innerHTML = '<img src="img/2.png" />';
      break;
    case 1 :
      document.getElementById('firstNum').innerHTML = '<img src="img/0.png" />';
      document.getElementById('secondNum').innerHTML = '<img src="img/1.png" />';
      break;
    default : 
      document.getElementById('firstNum').innerHTML = '<img src="img/0.png" />';
      document.getElementById('secondNum').innerHTML = '<img src="img/0.png" />';
      break;
  }
} 