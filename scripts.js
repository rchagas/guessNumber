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

const digitalDisplay = [
  document.getElementById('digit-one'),
  document.getElementById('digit-two'),
  document.getElementById('digit-three')
];

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
  else error(999,'ERRO: Fora do intervalo');
}


/**
 * Display one number until 3 digits on digital display
 */
function writeNumbersOnDisplay(number){ 
  const numbersDictionary = {0:'zero', 1:'one', 2:'two', 3:'three', 4:'four', 5:'five', 6:'six', 7:'seven', 8:'eight', 9:'nine'}
  
  visibleNumbers(number);
  
  digitalDisplay[2].className = 'number '.concat(numbersDictionary[(number - number%100)/100]);
  number = number%100;
  digitalDisplay[1].className = 'number '.concat(numbersDictionary[(number - number%10)/10]);
  number = number%10;
  digitalDisplay[0].className = 'number '.concat(numbersDictionary[number]);
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
    writeTip('É maior','#FF6600');
  else writeTip('É menor','#FF6600');
}

function matchNumbers(){
  colorNumbers('green');
  writeTip('Você acertou!!!', '#32BF00');
  endProgram();
}

/**
 * Perform finais settings to end the program
 * - Set replay button as visible 
 * - Set input number and send button as disable
 * - Make design changes
 */
function endProgram(){
  let sendButton = document.getElementById("send-button");
  let replayButton = document.getElementById('replay-button');
  let input = document.getElementById("number-input");

  replayButton.style.visibility = 'visible';

  sendButton.disabled = true;
  input.disabled = true;

  sendButton.style.background = 'none';
  sendButton.style.backgroundColor = '#DDDDDD'

  input.value = '';
  input.style.borderColor = '#CFCFCF';
  input.style.backgroundColor = '#F5F5F5'
}

function visibleNumbers(number){
  digitalDisplay[0].style.display = 'inline-block';
  for(digitos = digitalDisplay.length-1 ; digitos>0 ; digitos--){
    if(number >= Math.pow(10,digitos)){
      for(digitos ; digitos>0 ; digitos--)
        digitalDisplay[digitos].style.display = 'inline-block';
      break;
    }
    else {
      digitalDisplay[digitos].style.display = 'none';
    }
  }
}

function error(code, message){
  writeNumbersOnDisplay(code);
  writeTip(message,'#CC3300');
  colorNumbers('red');
}

function colorNumbers(color){
  if(color !== ''){
    for(element of digitalDisplay)
      element.classList.add(color);
  }
  else {
    for(element of digitalDisplay)
      element.classList.remove('red','green');
  }
}

function writeTip (message, color) {
  const tip = document.getElementById('tip');
  tip.innerHTML = message;
  tip.style.color = color;
}
