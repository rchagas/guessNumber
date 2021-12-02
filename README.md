# Guess Number

Esta é minha implementação de um teste prático para uma vaga de front-end.

O desafio consiste em dado um número obtido pela requisição de uma API externa,
fazer a implementação de um jogo de adivinhação de um número até 3 digitos.
A cada tentativa é dado uma ajuda informando se o palpite é maior ou menor do
que o número a ser adivinhado.

Para exibição dos numeros deve ser usado uma simulação de um display digital de 7 
segmentos. Para construção deste display foi utilizado uma sprite autoral com os
os 10 digitos em 3 cores, preto, verde e vermelho. Com o uso de css cada numero é
exibido de forma independente.

A logica do programa consiste em fazer o request de um numero no carregamento
da pagina e salva-lo em uma variavel.
O mapeamento dos numeros na sprite e feito por um arquivo css especifico para
manipular os numeros com o uso de classes.