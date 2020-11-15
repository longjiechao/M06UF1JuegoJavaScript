/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var Palabras = prompt("Introduce las palabras separadas por un ','");
//En caso de que no ponga nada, que se añada estas palabras       
sessionStorage.setItem("palabras", Palabras);