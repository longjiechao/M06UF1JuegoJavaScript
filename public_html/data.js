/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//botones invisibles al comienzo de la partida
wait();

//prueba quitar cookies
/*test2();
function test2(){
    modCookie("jugadas",0);
    modCookie("ganadas",0);
    modCookie("perdidas",0);
    modCookie("rendidas",0);
}*/

test();
function test(){
    console.log(getCookie("jugadas"));
    console.log(getCookie("ganadas"));
    console.log(getCookie("perdidas"));
    console.log(getCookie("rendidas"));
    
}

//variables
//páginas
    var words;
    var fight;
    var stats;
    var elegido;

//cookies
setCookie("jugadas",0);
setCookie("ganadas",0);
setCookie("perdidas",0);
setCookie("rendidas",0);

//Separar las palabras y phacer que sean un array
var palabras = sessionStorage.getItem("palabras").split(",");

// en caso de que el usuario no ponga nada
if (palabras == ""){
   palabras = ["Depresión", "Trauma", "Trastorno de estrés postraumático", "Zorro", "Tribunal", "Cachorro", "Letrado", "Encadenado"];
}   


//Variables para página fight
    var alphabeta = "QWERTYUIOPASDFGHJKLÑZXCVBNMÁÉÍÓÚ";
    //variable donde se guardan las letras que el jugador ha introducido
    var letrasIntroducidas = "";
    var fightLetra;
    //vida personaje
    var life = 6;
    
//test
//show(palabras);



//muestra los arrays, sirve para tests
function show(palabra){
    for (i=0;i<palabra.length;i++){
        document.write("|" + palabra[i] + " " + i + "| ");
    }
}
//Botones

    document.getElementById("start").addEventListener("click", abrirVentanas);
    document.getElementById("start").addEventListener("click", showStats);
    document.getElementById("end").addEventListener("click",cerrar);
    //Sirve para escribir la letra
    document.getElementById("fight").addEventListener("click", fighting);
    //Cambiar palabra
    document.getElementById("rendir").addEventListener("click", rendir);





//Start Functions
    //index.
    //Abrir y cerrar ventanas
    function abrirVentanas() {
        modCookie("jugadas",(parseInt(getCookie("jugadas")) + 1));
        elegido = getRandomWord(palabras).toUpperCase().trim();
        play();
        words = window.open("words.html", "Stats", "top=1000, left=0, width=500, height=400");  
        fight = window.open("fight.html", "Fight", "top=1000, left=500, width=500, height=400");
        stats = window.open("stats.html", "Words", "top=1000, left=1000, width=500, height=400");
        //en caso de usarlo en otra página
        sessionStorage.setItem("elegido", elegido);
    }
    

    function cerrar(){
        words.close();
        fight.close();
        stats.close();
        wait();
        
    }
    
    
    //Rendir, sirve para resetear los valores y comenzar una nueva partida
    function rendir(){
        modCookie("jugadas",(parseInt(getCookie("jugadas")) + 1));
        modCookie("rendidas",(parseInt(getCookie("rendidas")) + 1));
        stats.location.reload();
        elegido = getRandomWord(palabras).toUpperCase().trim();
        console.log(elegido);
        //en caso de usarlo en otra página
        sessionStorage.setItem("elegido", elegido);
        
    }
    
    
    //Son ara cuando puedes poner letras y cuando no
    function wait(){
        document.getElementById("start").style.visibility = 'visible';
        document.getElementById("fight").style.visibility = 'hidden';
        document.getElementById("rendir").style.visibility = 'hidden';
    }
    function play(){
        document.getElementById("start").style.visibility = 'hidden';
        document.getElementById("fight").style.visibility = 'visible';
        document.getElementById("rendir").style.visibility = 'visible';
        letrasIntroducidas = "";
        life = 6;
        
    }
    
    //coge un array y sali un variable del array, seleccionada de forma aleatoria
    function getRandomWord(arrayP){
        var pRandom = Math.floor((Math.random() * arrayP.length));
        return  arrayP[pRandom];
    }
    
    //Fight.html
        function fighting() {
        //Al introducir una cosa que más de una letra, esta borra los espacios y coge la primera letra que vea
            fightLetra = prompt("Introduce una letra").toUpperCase();
            fightLetra = fightLetra.toUpperCase().replaceAll(" ", "").split("");
            fightLetra = fightLetra[0];
            //Detección de carácteres, si es valido o no, si está repetido o no                
            if (alphabeta.includes(fightLetra)){
                if (letrasIntroducidas.includes(fightLetra)){
                    alert("Carácter repetido");
                    lifeCheck(1);
                }else{
                    if (elegido.includes(fightLetra)){
                        letrasIntroducidas = letrasIntroducidas.concat(fightLetra);
                    }else {
                        alert("No está en la palabra");
                        lifeCheck(1);
                    }
                }
            }else{
                alert("Carácter invalido");
                lifeCheck(1);
            }
            if (life == 0){
                fight.document.getElementById("fight").style.visibility = 'hidden';
                alert("Has perdido esta ronda");
                wait();
                modCookie("perdidas",(parseInt(getCookie("perdidas")) + 1));
                stats.location.reload();
            }
            rellenar(elegido);
        }
        
        //funcion que cambia la vida del personaje
            function lifeCheck(dmg){
                life = life - dmg;
                var hName = "";
                hName = hName.concat("pics/health/",life,"Health.png");
                fight.document.getElementById("health").src=hName;
                if (life == 0){
                    fight.document.getElementById("isaac").src="pics/playerportrait_16_theforgotten.png";
                }
            }
            
        //funcion que cambia la vida del jefe
        function bossLife(totalDMG){
            fight.document.getElementById("mHealth").max = elegido.length;
            fight.document.getElementById("mHealth").value = elegido.length - totalDMG;
            if ((elegido.length - totalDMG) < elegido.length/2){
                fight.document.getElementById("monstro").src="pics/portrait_43.0_monstro2.png";
            }
            
            if ((elegido.length - totalDMG) == 0){
                fight.document.getElementById("monstro").style.visibility = 'hidden';
            } else {
                fight.document.getElementById("monstro").style.visibility = 'visible';
            }

        }

        
        
        //stats.html
            //Escribe las letras
                function rellenar(elegido){
                    var points = 0;
                    var escribir = "| ";
                    for (i=0;i<elegido.length;i++){
                        if (letrasIntroducidas.includes(elegido[i])){
                            escribir = escribir.concat(elegido[i]," | ");
                            points++;
                            bossLife(points);
                        }
                        else if(alphabeta.includes(elegido[i])){
                            escribir = escribir.concat("__"," | ");
                        }else {
                            escribir = escribir.concat(elegido[i]," | ");
                        }
                        if (points == elegido.length){
                            wait();
                            alert("Felicidades, has ganado esta ronda");
                            modCookie("ganadas",(parseInt(getCookie("ganadas")) + 1));
                            stats.location.reload();
                        }
                    }
                    words.document.getElementById("mLetra").innerText = escribir;
                }
                
                function showStats(){
                    document.getElementById("jugadas").innerHTML = getCookie("jugadas");
                    document.getElementById("ganadas").innerText = getCookie("ganadas");
                    document.getElementById("perdidas").innerText = getCookie("perdidas");
                    document.getElementById("rendidas").innerText = getCookie("rendidas");
                }
                
//End Functions


//Start Cookies
function setCookie(cname, cvalue) {
    //solo crea el cookie si no existe
  if (document.cookie.indexOf(cname) == -1){
      var d = new Date();
    d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
}

function modCookie(cname, cvalue) {
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
//End Cookies