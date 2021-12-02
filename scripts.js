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
const signboard = [
  document.getElementById('digit-one'), 
  document.getElementById('digit-two'), 
  document.getElementById('digit-three')
];
const tip = document.getElementById('tip');

let drawnNumber;


/**
 * Start the game
 */
async function startGame(){
  drawnNumber = await getNumber()
  console.log('Drawn Number: '+drawnNumber);
}

/**
 * Send button function, set the signboard with input number
 * and check result
 */
function send(){
  let input = document.getElementById('number-input').value;
  if(input > 0 && input < 999){
    digitalScreen(input);
    compareNumbers(input, drawnNumber);    
  }
  else{
    for(element of signboard)
    element.classList.add('red');
    tip.innerHTML = 'ERRO: Fora do intervalo';
    tip.style.color = '#CC3300';
  }
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
        digitalScreen(response.status)
        for(element of signboard)
          element.classList.add('red');
        tip.innerHTML = 'ERRO';
        tip.style.color = '#CC3300';
        endProgram();
      }
  })
  .then(res => { return res.value;})
  .catch(error => {console.error(error);})
}

/**
 * Display one number until 3 digits on digital display
 */
function digitalScreen(number){
  
  let numbersDictionary = {0:'zero', 1:'one', 2:'two', 3:'three', 4:'four', 5:'five', 6:'six', 7:'seven', 8:'eight', 9:'nine'}
  
  if(number < 100){
    signboard[2].style.display = 'none';
    if(number<10)
      signboard[1].style.display = 'none';
    else{
      signboard[1].style.display = 'inline-block';
    }
  }
  else{
    signboard[2].style.display = 'inline-block';
    signboard[1].style.display = 'inline-block';
  }
  signboard[2].className = 'number '.concat(numbersDictionary[(number - number%100)/100]);
  number = number%100;
  signboard[1].className = 'number '.concat(numbersDictionary[(number - number%10)/10]);
  number = number%10;
  signboard[0].className = 'number '.concat(numbersDictionary[number]);
}

/**
 * Compare drawn number with user number:
 * If the numbers are the same end the program
 * either set tip as "É menor" or "É maior"
 */
function compareNumbers(numberOne,numberTwo){
  if(numberOne == numberTwo){
    for(element of signboard)
      element.classList.add('green');
    tip.innerHTML = 'Você acertou!!!'
    tip.style.color = '#32BF00';   
    endProgram();
  }
  else if (numberOne < numberTwo)
    tip.innerHTML = 'É maior'
  else tip.innerHTML = 'É menor'
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