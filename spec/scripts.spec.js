describe("Function compareNumbers", function() {
  beforeEach(function() {
    let html = '<div id="tip"></div>' +
      '<div id="digit-one"></div>' +
      '<div id="digit-two"></div>' +
      '<div id="digit-three"></div>' +
      '<button id="replay-button">ENVIAR</button>' +
      '<input id="number-input">' +
      '<button id="send-button">ENVIAR</button>';

    document.body.insertAdjacentHTML(
      'afterbegin',
      html)
  })

  it("Should write number in display with green color and end the game", function() {
    compareNumbers(234,234);

    expect(document.getElementById('tip').innerHTML).toEqual('Você acertou!!!');
    expect(document.getElementById('tip').style.color).toEqual('rgb(51, 191, 0)');    

    expect(document.getElementById('digit-one').classList.contains('green')).toBeTrue()
    expect(document.getElementById('digit-two').classList.contains('green')).toBeTrue()
    expect(document.getElementById('digit-three').classList.contains('green')).toBeTrue()    
    
    expect(document.getElementById('replay-button').style.visibility).toEqual('visible');
    expect(document.getElementById("send-button").disabled).toBeTrue();
    expect(document.getElementById("send-button").style.background).toEqual('none rgb(221, 221, 221)');   
    expect(document.getElementById("number-input").disabled).toBeTrue();
    expect(document.getElementById("number-input").value).toEqual('');
    expect(document.getElementById("number-input").style.borderColor).toBe('rgb(207, 207, 207)')
    expect(document.getElementById("number-input").style.backgroundColor).toBe('rgb(245, 245, 245)');
  })
  
  it("Should write number in Display and write 'É maior'", function() {
    compareNumbers(234,254);
    expect(document.getElementById('digit-one').classList.contains('green','red')).toBeFalse()
    expect(document.getElementById('digit-two').classList.contains('green','red')).toBeFalse()
    expect(document.getElementById('digit-three').classList.contains('green','red')).toBeFalse()
    expect(document.getElementById('tip').innerHTML).toEqual('É maior');
    expect(document.getElementById('tip').style.color).toEqual('rgb(255, 102, 0)');
    
  })

  it("Should write number in Display and write 'É menor'", function() {
    compareNumbers(234,204);
    expect(document.getElementById('digit-one').classList.contains('green','red')).toBeFalse()
    expect(document.getElementById('digit-two').classList.contains('green','red')).toBeFalse()
    expect(document.getElementById('digit-three').classList.contains('green','red')).toBeFalse()
    expect(document.getElementById('tip').innerHTML).toEqual('É menor');
    expect(document.getElementById('tip').style.color).toEqual('rgb(255, 102, 0)');
    
  })  
})

describe("Function matchNumbers", function() {
  beforeEach(function() {
    let html = '<div id="tip"></div>' +
      '<div id="digit-one"></div>' +
      '<div id="digit-two"></div>' +
      '<div id="digit-three"></div>' +
      '<button id="replay-button">ENVIAR</button>' +
      '<input id="number-input">' +
      '<button id="send-button">ENVIAR</button>';

    document.body.insertAdjacentHTML(
      'afterbegin',
      html)
  })

  it("Should insert 'Você acertou!!!' and color green in element tip and numbers", function() {
    matchNumbers();
    expect(document.getElementById('digit-one').classList.contains('green')).toBeTrue()
    expect(document.getElementById('digit-two').classList.contains('green')).toBeTrue()
    expect(document.getElementById('digit-three').classList.contains('green')).toBeTrue()
    expect(document.getElementById('tip').innerHTML).toEqual('Você acertou!!!');
    expect(document.getElementById('tip').style.color).toEqual('rgb(51, 191, 0)');   
  })

})

describe("Function Erro", function() {
  beforeEach(function() {
    let html = '<div id="tip"></div>' +
      '<div id="digit-one"></div>' +
      '<div id="digit-two"></div>' +
      '<div id="digit-three"></div>';

    document.body.insertAdjacentHTML(
      'afterbegin',
      html)
  })

  it("Should insert text and color in element tip", function() {
    error('123','texto');
    expect(document.getElementById('digit-one').classList.contains('three','red')).toBeTrue()
    expect(document.getElementById('digit-two').classList.contains('two','red')).toBeTrue()
    expect(document.getElementById('digit-three').classList.contains('one','red')).toBeTrue()
    expect(document.getElementById('tip').innerHTML).toEqual('texto');
    expect(document.getElementById('tip').style.color).toEqual('rgb(204, 51, 0)');
    
  })
})

describe("Function writeTip", function() {
  beforeEach(function() {
    let html = '<div id="tip"></div>'

    document.body.insertAdjacentHTML(
      'afterbegin',
      html)
  })

  it("Should insert text and color in element tip", function() {
    writeTip('texto','black');
    const tip = document.getElementById('tip');
    expect(tip.innerHTML).toEqual('texto');
    expect(tip.style.color).toEqual('black');
  })
})

describe("Function WriteNumbersOnDisplay", function() {
  
  beforeEach(function() {
    let digits = '<div id="digit-one"></div>' +
      '<div id="digit-two"></div>' +
      '<div id="digit-three"></div>';

    document.body.insertAdjacentHTML(
      'afterbegin',
      digits)
  })

  it("The input number sould be a class in component", function() {
    const numbersDictionary = {0:'zero', 1:'one', 2:'two', 3:'three', 4:'four', 5:'five', 6:'six', 7:'seven', 8:'eight', 9:'nine'}  
    for(i=0 ; i<=9 ; i++){
      writeNumbersOnDisplay(i*111);
      expect(document.getElementById('digit-one').classList.contains(numbersDictionary[i])).toBeTrue()
      expect(document.getElementById('digit-two').classList.contains(numbersDictionary[i])).toBeTrue()
      expect(document.getElementById('digit-three').classList.contains(numbersDictionary[i])).toBeTrue()
    }
  })    
})

describe("Function visibleNumbers", function() {
  
  beforeEach(function() {
    let digits = '<div id="digit-one"></div>' +
      '<div id="digit-two"></div>' +
      '<div id="digit-three"></div>';

    document.body.insertAdjacentHTML(
      'afterbegin',
      digits)
  })

  it("All numbers should be visible", function() {
    for(i=111 ; i<=999 ; i=i+111){
      visibleNumbers(i);
      expect(document.getElementById('digit-one').style.display).toEqual('inline-block');
      expect(document.getElementById('digit-two').style.display).toEqual('inline-block');
      expect(document.getElementById('digit-three').style.display).toEqual('inline-block');
    }
  })

  it("Only first and second numbers should be visible", function() {
    for(i=11 ; i<=99 ; i=i+11){
      visibleNumbers(i);
      expect(document.getElementById('digit-one').style.display).toEqual('inline-block');
      expect(document.getElementById('digit-two').style.display).toEqual('inline-block');
      expect(document.getElementById('digit-three').style.display).toEqual('none');
    }
  })

  it("Only first number should be visible", function() {
    for(i=0 ; i<=9 ; i++){
      visibleNumbers(i);
      expect(document.getElementById('digit-one').style.display).toEqual('inline-block');
      expect(document.getElementById('digit-two').style.display).toEqual('none');
      expect(document.getElementById('digit-three').style.display).toEqual('none');
    }
  })    
})

describe("Function colorNumbers", function() {

  beforeEach(function() {

    let digits = '<div id="digit-one"></div>' +
      '<div id="digit-two"></div>' +
      '<div id="digit-three"></div>';

    document.body.insertAdjacentHTML(
      'afterbegin',
      digits)
  })

  it("Should insert class red in display elements ", function() {
    colorNumbers('red');

    expect(document.getElementById('digit-one').classList.contains('red')).toBeTrue();
    expect(document.getElementById('digit-two').classList.contains('red')).toBeTrue();
    expect(document.getElementById('digit-three').classList.contains('red')).toBeTrue();
  })

  it("Should remove class red or green in display elements ", function() {
    colorNumbers('');

    expect(document.getElementById('digit-one').classList.contains('red')).toBeFalse();
    expect(document.getElementById('digit-two').classList.contains('red')).toBeFalse();
    expect(document.getElementById('digit-three').classList.contains('red')).toBeFalse();
    expect(document.getElementById('digit-one').classList.contains('green')).toBeFalse();
    expect(document.getElementById('digit-two').classList.contains('green')).toBeFalse();
    expect(document.getElementById('digit-three').classList.contains('green')).toBeFalse();
  })

})

describe("Function endProgram", function() {

  beforeEach(function() {

    let html = '<button id="replay-button">ENVIAR</button>' +
      '<input id="number-input">' +
      '<button id="send-button">ENVIAR</button>';

    document.body.insertAdjacentHTML(
      'afterbegin',
      html)
  })

  it("Check settings components after end program ", function() {
    const sendButton = document.getElementById("send-button");
    const replayButton = document.getElementById('replay-button');
    const input = document.getElementById("number-input");
    endProgram();
    
    expect(replayButton.style.visibility).toEqual('visible');
    
    expect(sendButton.disabled).toBeTrue();
    expect(sendButton.style.background).toEqual('none rgb(221, 221, 221)');   
    
    expect(input.disabled).toBeTrue();
    expect(input.value).toEqual('');
    expect(input.style.borderColor).toBe('rgb(207, 207, 207)')
    expect(input.style.backgroundColor).toBe('rgb(245, 245, 245)');
  })
})
