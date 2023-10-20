//FUNCION LIBRARY


/**
* [getRndInteger]
* Genera un numero intero random
*
* @param {Number} min il primo numero
* @param {Number} max il secondo numero
* 
* @returns {Number}  il numero randomico generato
*
*/
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


/**
 * Determina se il numero è pari
 * @param {Number} num 
 * @returns  {Boolean}
 */
  function isEven(num){
    //  if(num % 2 === 0){
    //   return true;
    //  } else {
    //   return false;
    //  }
    // let result = (num % 2 === 0) ? true : false;
    // return result;

  return (num % 2 === 0) ? true : false;
   
  }