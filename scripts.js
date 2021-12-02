let dict = {0:'zero', 1:'one', 2:'two', 3:'three', 4:'four', 5:'five', 6:'six', 7:'seven', 8:'eight', 9:'nine'}
const url = 'https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300';

let matchNumber;
let signboard = [
  document.getElementById('digit-one'), 
  document.getElementById('digit-two'), 
  document.getElementById('digit-three')
];
let tip = document.getElementById('tip');

async function getNumber(){
  await fetch(url)
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
      }
  })
  .then(
    res => {
      matchNumber = res.value;
      console.log('SortNumber: '+matchNumber);
    }
  )
  .catch(error => {
    console.error(error);
  })
}

async function send(){
  let input = document.getElementById('number-input').value;
  digitalScreen(input);
  compareNumbers(input);
}

function digitalScreen(number){

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
  signboard[2].className = 'number '.concat(dict[(number - number%100)/100]);
  number = number%100;
  signboard[1].className = 'number '.concat(dict[(number - number%10)/10]);
  number = number%10;
  signboard[0].className = 'number '.concat(dict[number]);
}

function compareNumbers(number){
  if(number == matchNumber){
    for(element of signboard)
      element.classList.add('green');
    tip.innerHTML = 'Você acertou!!!'
    tip.style.color = '#32BF00';
    document.getElementById('new-match').style.visibility = 'visible';
    disableInput();
  }
  else if (number< matchNumber)
    tip.innerHTML = 'É maior'
  else tip.innerHTML = 'É menor'
}

function disableInput(){
  let button = document.getElementById("send-button");
  let input = document.getElementById("number-input");

  button.disabled = true;
  input.disabled = true;

  button.style.background = 'none';
  button.style.backgroundColor = '#DDDDDD'

  input.value = '';
  input.style.borderColor = '#CFCFCF';
  input.style.backgroundColor = '#F5F5F5'
}