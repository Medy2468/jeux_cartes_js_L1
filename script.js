// NSANGOU Medy Lord Exauce L1GL
// Recupération des cartes sous forme de tableau d'objets
var cartes = [
    { id: 1, image: 'images/angular.png' },
    { id: 2, image: 'images/csharp.png' },
    { id: 3, image: 'images/css.png' },
    { id: 4, image: 'images/html.png' },
    { id: 5, image: 'images/java.png' },
    { id: 6, image: 'images/js.png' },
    { id: 7, image: 'images/lc.png' },
    { id: 8, image: 'images/lcplus.png' },
    { id: 9, image: 'images/mysql.png' },
    { id: 10, image: 'images/ordi.png' },
    { id: 11, image: 'images/php.png' },
    { id: 12, image: 'images/sql.png' },
];

var img;
var nbEssais = 5;
var gagner = cartes.length;
var tabImages = [];
var initial = 0;

function init_Contenu() {
    melanger_cartes();
    // Recupération de la division d'id jeu pour contenir les cartes
    jeu = document.getElementById('jeu');
    for (j = 1; j <= 2; j++) {
        for (i = 0; i < cartes.length; i++) {
            //Création de la balise img
            var elt_img = document.createElement('img');
            //Ajout de l'attribut src
            elt_img.src = cartes[i].image;
            elt_img.style.width = "100%";
            elt_img.style.height = '250px';
            elt_img.style.visibility = 'hidden';
            idImage = "" + cartes[i].id + j;
            elt_img.setAttribute('id', idImage)
            //Création de la division pour la carte
            var elt_div = document.createElement('div');
            elt_div.setAttribute('class', 'carte');
            //Ajout de l'image dans la carte
            elt_div.appendChild(elt_img);
            elt_div.setAttribute('onclick', "clic(" + idImage + ")");
            // Ajout la carte dans la division 
            jeu.appendChild(elt_div);
        }
    }
}


function clic(n) {
    decompte();
    if (initial == 0) {
        img = document.getElementById(n); //Recupération de l'image cliquée
        img.style.visibility = 'visible';
        tabImages.push(img) //Mettre l'image dans un tableau

        if (tabImages.length == 2) { // Lorsque le tableau contient deux images
            initial = 1;
            nbEssais --;
            if (tabImages[0].src != tabImages[1].src) { // Vérifier si les images ne sont pas identiques
                setTimeout("tabImages[0].style.visibility = 'hidden';tabImages[1].style.visibility = 'hidden';",200);
            }else {
                gagner--;
            }
        } else { // Le tableau contient 0 ou plus de 2 éléments
            initial = 0;
        }
    } else { 
        initial = 0;
        tabImages = [];
        img = document.getElementById(n);
        img.style.visibility = 'visible';
        tabImages.push(img)
    }

    fin_partie();

}



function fin_partie(){
    if (nbEssais == 0) {
        alert('Vous avez épuisé le nombre de tentatives !');
        document.getElementById('rejouer').style.visibility = 'visible';
        afficher_faces();
    }

    if (gagner == 0) {
        alert('Vous avez gagné');
        if (confirm('Voulez-vous rejouer ?')) {
            rejouer();
        } else{
            document.getElementById('rejouer').style.visibility = 'visible';
        }
    }
}

//Affichage des faces de toutes les cartes
function afficher_faces(){
    for (let j = 1; j <=2; j++) {
        for (let i = 0; i < cartes.length; i++) {
            idImage = "" + cartes[i].id + j;
            img = document.getElementById(idImage);
            img.style.visibility = 'visible';
        }
    }
}

function rejouer(){
    window.location.reload();
    //decompte();
} 

 document.getElementById('rejouer').onclick = function (){
     rejouer();
 }

 function melanger_cartes(){
    for(let i =cartes.length-1; i>= 1; i--){

        var indice_alea = Math.floor(Math.random()*(i+1));
        //console.log(indice_alea);

        var svg = cartes[i];
        cartes[i] = cartes[indice_alea];
        cartes[indice_alea]= svg;

    }
 }

 compteur=120;
function decompte() {
 if (compteur>0) compteur--;
  decompteur= Math.floor(compteur/60)   +":"+ (compteur-(Math.floor(compteur/60)*60)) ;
  window.document.getElementById('compteur').value=decompteur;
  if (compteur==0)
     {
     
      rejouer();
     document.forms['form_valide'].submit(); 
    }
    document.getElementById('rejouer').onclick = function (){
     rejouer();
 }
 setTimeout("decompte()",1000);
}