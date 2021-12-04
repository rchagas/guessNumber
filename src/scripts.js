/**
 * A logica do programa consiste em fazer o request de um numero no carregamento
 * da pagina e salva-lo em uma variavel.
 * Os digitos foram realizados apartir de uma sprite de fundo transparente contendo
 * os numeros em preto, vermelho e verde. O mapeamento dos numeros na sprite e feito
 * por um arquivo css especifico para tal com o uso de classes.
 */

const minRange = 1;
const maxRange = 300;

const url = 'https://us-central1-ss-devops.cloudfunctions.net/rand?min='+minRange+'&max='+maxRange;

let drawnNumber;

/**
 * Start the game
 */
async function startGame(){
  drawnNumber = await getNumber()
  console.log('Drawn Number: ' + drawnNumber);
}

/**
 * Request Drawn Number
 */
 async function getNumber(){
  return await fetch(url)
  .then(
    response => {
      if(response.status == 200){
        return response.json();
      }
      else{
        error(response.status,'ERRO');
        endProgram();
        throw new Error('Erro '+ response.status);
      }
  })
  .then(res => { return res.value;})
  .catch(error => {console.error(error);})
}

/**
 * Send button function, set the signboard with input number
 * and check result
 */
function send(){
  let input = document.getElementById('number-input').value;
  if(input > 0 && input < 1000){
    writeNumbersOnDisplay(input);
    compareNumbers(input, drawnNumber);
  }
  else {
    error(999,'ERRO: Fora do intervalo');
    throw new Error('Erro entrada fora do intervalo');
  }
}

/**
 * Compare drawn number with user number:
 * If the numbers are the same end the program
 * either set tip as "É menor" or "É maior"
 */
function compareNumbers(numberOne,numberTwo){
  if(numberOne == numberTwo){
    matchNumbers();
  }
  else if (numberOne < numberTwo)
    writeTip('É maior','rgb(255, 102, 0)');
  else writeTip('É menor','rgb(255, 102, 0)');
}

function matchNumbers(){
  colorNumbers('green');
  writeTip('Você acertou!!!', 'rgb(51, 191, 0)');
  endProgram();
}

function error(code, message){
  writeNumbersOnDisplay(code);
  writeTip(message,'rgb(204, 51, 0)');
  colorNumbers('red');
}

function writeTip (message, color) {
  const tip = document.getElementById('tip');
  tip.innerHTML = message;
  tip.style.color = color;
}

/**
 * Display one number until 3 digits on digital display
 */
 function writeNumbersOnDisplay(number){ 
  const numbersDictionary = {0:'zero', 1:'one', 2:'two', 3:'three', 4:'four', 5:'five', 6:'six', 7:'seven', 8:'eight', 9:'nine'}
  const digitalDisplay = [
    document.getElementById('digit-one'),
    document.getElementById('digit-two'),
    document.getElementById('digit-three')
  ];

  visibleNumbers(number);
  
  for(symbolDisplay = digitalDisplay.length-1 ; symbolDisplay>=0 ; symbolDisplay--){
    auxNumber = Math.pow(10,symbolDisplay);
    digitalDisplay[symbolDisplay].className = 
      'number '.concat(numbersDictionary[(number-number%auxNumber)/auxNumber]);
    number %= auxNumber;
  }
}

function visibleNumbers(number){
  const digitalDisplay = [
    document.getElementById('digit-one'),
    document.getElementById('digit-two'),
    document.getElementById('digit-three')
  ];

  digitalDisplay[0].style.display = 'inline-block';
  for(digit = digitalDisplay.length-1 ; digit>0 ; digit--){
    if(number >= Math.pow(10,digit)){
      for(digit ; digit>0 ; digit--)
        digitalDisplay[digit].style.display = 'inline-block';
      break
    }
    else {
      digitalDisplay[digit].style.display = 'none';
    }
  }
}

function colorNumbers(color){
  const digitalDisplay = [
    document.getElementById('digit-one'),
    document.getElementById('digit-two'),
    document.getElementById('digit-three')
  ];

  if(color !== ''){
    for(element of digitalDisplay)
      element.classList.add(color);
  }
  else {
    for(element of digitalDisplay)
      element.classList.remove('red','green');
  }
}

/**
 * Perform finais settings to end the program
 * - Set replay button as visible 
 * - Set input number and send button as disable
 * - Make design changes
 */
 function endProgram(){
  const sendButton = document.getElementById("send-button");
  const replayButton = document.getElementById('replay-button');
  const input = document.getElementById("number-input");

  replayButton.style.visibility = 'visible'

  sendButton.disabled = true
  input.disabled = true

  sendButton.style.background = 'none'
  sendButton.style.backgroundColor = 'rgb(221, 221, 221)'

  input.value = '';
  input.style.borderColor = 'rgb(207, 207, 207)';
  input.style.backgroundColor = 'rgb(245, 245, 245)'
}
