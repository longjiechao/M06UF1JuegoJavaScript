/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// Palabras por defecto + Selección aleatoria de las palabras



function show(palabra){
    for (i=0;i<palabra.length;i++){
        document.write(palabra[i]);
    }
}

//coge un array y sali un variable del array, seleccionada de forma aleatoria
function getRandomWord(arrayP){
    var pRandom = Math.floor((Math.random() * arrayP.length) + 1);
    return  arrayP[pRandom];
}






//Start Cookies
function setCookie(cname, cvalue) {
  var d = new Date();
  d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  var user = getCookie("username");
  if (user != "") {
    alert("Welcome again " + user);
  } else {
    user = prompt("Please enter your name:", "");
    if (user != "" && user != null) {
      setCookie("username", user, 365);
    }
  }
} 
//End Cookies