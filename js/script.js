/*

*/

"use strict";
 
    
campoMinato();

/**
 * Main function of CampoMinato
 */
function campoMinato() {

//iniziamo con le varibili che vogliamo tenere accessibili alle funzioni children
 //numero bombe
  const NUM_BOMBS = 16;
  //massimo numero di tentativi
  let max_attempt;
  //array delle bombe
  let bombs;
  //punteggio giocatore
  let score;
  //fine partita
  let gameOver = false;
  //div da mostrare a fine partita
  const winEl = document.getElementById('win');
  winEl.classList.add('d-none');
  //bottone per lanciare il gioco
  const btn = document.querySelector("button"); 
  btn.addEventListener("click", play);
  

  /**
   * Play - lancio il gioco
   */
  function play() {
    if(!winEl.classList.contains('d-none')){
        winEl.classList.toggle("d-none");
    }
        const level = document.getElementById("level").value;
        //numero di quadratini da generare
        let numSquare = selectLevel(level);    
        //console.log(numSquare);
        //azzero lo score ad inizio partita
        score = 0;
        //imposto numero massimo tentativi
        max_attempt = numSquare - NUM_BOMBS;
        //array bombe
         bombs = generateBombs(numSquare);
        //numero quadratini per lato
        const squareWidth = Math.sqrt(numSquare);
        //mi prendo la griglia di gioco
        const playground = document.getElementById("playground");
        playground.innerHTML = "";
        //ciclo per stampare i quadratini
        for (let i = 1; i <= numSquare; i++) {
          //genero quadratino
          let square = drawSquare(i, squareWidth);
    
          //appendo il quadratino all griglia
          playground.append(square);
        }
         
    }
  

    /**
     * Draw a square
     * @param {any} content
     * @param {Number} squareWidth
     * @returns {Object} created square
     * Mette a disposizione una funzione al click drawClick
     */
    function drawSquare(content, squareWidth) {
        //console.log(squareWidth);
        const square = document.createElement("div");
        square.classList.add("square");
        square.style.width = `calc(100% / ${squareWidth})`;
        square.style.height = square.style.width;
        square.innerHTML = content;
        square.addEventListener("click", drawClick);
        return square;
    }

    /**
     * Eventlistener funcion on square
     * @returns {void}
     */
    function drawClick(){
        if (!this) return;
        this.removeEventListener('click',drawClick);
        // console.log(bombs);
        // console.log(this.textContent)           
        if(bombs.includes(parseInt(this.textContent))){
            this.classList.add("bomb");
            this.style.color = "black";
            this.innerHTML = '<i class="fa-solid fa-bomb fa-beat"></i>';
            gameOver = true;
        } else {
            this.classList.add("active");
            this.style.color = "black";
            //console.log(this.textContent);
        }
        setMessage();  
    }

    /**
     * Select game level
     * @param {String} level 
     * @returns {Number} number of square
     */
    function selectLevel(level) {
        let numSquare; 
        switch (level) {
        case "medium":
            numSquare = 81;
            break;
        case "difficult":
            numSquare = 49;
            break;
        default:
            numSquare = 100;
        }
        return numSquare;
        // console.log(numSquare);
        //return ( level === 'medium') ? 81 : (level === 'difficult') ? 49 : 100;
    }


    function generateBombs(numSquare){
        //creo array che conterrà le bombe
        const bombsArray = [];
        while(bombsArray.length < NUM_BOMBS){
            let bomb = getRndInteger(1, numSquare);//33 , 44,70,80,33
            //console.log(bomb);
        if(!bombsArray.includes(bomb)){
            bombsArray.push(bomb);
        }
        }
    console.log(bombsArray);
        return bombsArray;

    }

    /**
     * Is Game over
     * 
     * @param {Boolean} loose 
     * @returns 
     */
    function setMessage(){
        let message;
            if(!gameOver) {
                score++;
                if(score < max_attempt) { 
                    document.getElementById('score').innerHTML = `Il tuo punteggio è: ${score}`;
                    return; 
                } else {
                    message =`
                    <h1>Hai vinto !!!</h1> 
                    <p> Il tuo punteggio è: ${score}</p>
                `; 
                }                
            } else {
                message = `
                <h1> Hai perso !!!</h1
                <p> Il tuo punteggio è: ${score}</p>
            `;
            }
            onGameOver(message);
        
    }

    /**
     * Game Over
     * @param {string} message 
     */
    function onGameOver(message){
        const arraySquareBombs = document.getElementsByClassName('square');
        for(let i = 0; i < arraySquareBombs.length; i++){
            let el = arraySquareBombs[i];
            el.removeEventListener('click',drawClick);
            if(bombs.includes(parseInt(el.textContent))){
                el.classList.add("bomb");
                el.style.color = "black";
                el.innerHTML = '<i class="fa-solid fa-bomb fa-beat"></i>';
            }
        }
        const winEl = document.getElementById('win');
        winEl.classList.toggle("d-none");
        winEl.innerHTML = message;
    }
}
