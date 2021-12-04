# Guess Number

Esta é minha implementação de um teste prático para uma vaga para desenvolvedor front-end.

O desafio consiste em dado um número obtido pela requisição de uma API externa,
fazer a implementação de um jogo de adivinhação de um número de até 3 digitos.
A cada tentativa é dada uma ajuda informando se o palpite é maior ou menor do
que o número a ser adivinhado.

Para exibição dos números deve ser usado uma simulação de um display digital de 7 
segmentos. Para construção deste display foi utilizado uma sprite autoral com os
os 10 dígitos em 3 cores, preto, verde e vermelho. Com o uso de css cada número é
exibido de forma independente.
![](../img/number.png)

A lógica do programa consiste em fazer uma requisição para obter um número aleatório
de uma API externa no carregamento da página e salvá-lo em uma variável.
O mapeamento dos números para o display de 7 segmentos foi feito por um arquivo 
.css específico para manipular os números na imagem da sprite com o uso de classes no html.

O resultado final pode ser visto através do link:
https://rchagas.github.io/guessNumber