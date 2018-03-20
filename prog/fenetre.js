/**
 * Classe Fenetre
 * 582-345 Programmation Animation II
 * @version 2016-12-06
 */
var QUIZ_CALCUL = QUIZ_CALCUL || {};

(function() {
	"use strict";
	
		/**
		  * Classe permettant de créer d'afficher une fenêtre
		  * et, d'appeler une fonction du conteneur parent
		  * @param {Number} posX - position du mot sur l'axe des X
		  * @param {Number} posY - position du mot sur l'axe des Y
		  * @param {Number} largeur - largeur de la fenêtre
		  * @param {Number} hauteur - hauteur de la fenêtre
		  * @param {String} classeCSS  - classe CSS pour la mise en forme de la fenêtre
		  * @param {String} texte  - texte à afficher dans la fenêtre
		  * @param {Function} action  - fonction à appeler sur un mousedown
		  * @param {HTMLElement} conteneurParent -  balise HTML pour afficher les mots animés
		  */
	
		function Fenetre(posX, posY, largeur, hauteur, classeCSS, texte, action, conteneurParent){		
			this.posX = posX;
			this.posY = posY;
			this.largeur = largeur;
			this.hauteur = hauteur;
			this.classeCSS = classeCSS;
			this.texte = texte;
			this.action = action;
			this.conteneurParent = conteneurParent;
			this.requeteID = 0;
			this.pourcentageEchelle = -350;
			//Créeation la fenêtre
			this.creerFenetre();
		}

		/**
		  * Méthode pour créer et afficher les instances de la classe Fenetre
		  */
		Fenetre.prototype.creerFenetre = function(){
			//Créer une balise <div>
			this.elHTML = document.createElement('div');
			//Appliquer les éléments de style
			this.elHTML.style.position = "absolute";
			this.elHTML.style.width = this.largeur + "px";
			this.elHTML.style.height = this.hauteur + "px";
			this.elHTML.style.left = this.posX + "px";
			this.elHTML.style.top = this.posY + "px";
			this.elHTML.classList.add(this.classeCSS);
			this.elHTML.style.transformOrigin = "50% 50%";
			this.elHTML.style.webkitTransformOrigin = "50% 50%";

			//Texte
			this.elHTML.innerHTML = this.texte;
			this.conteneurParent.appendChild(this.elHTML);
			
			//Écouteur
			this.elHTML.addEventListener("mousedown", this.fermerFenetre.bind(this), false );
			
			//Requête
			this.requeteID = window.requestAnimationFrame(this.animerArriveeFenetre.bind(this));
		}

		
		/**
		  * Méthode pour animer la fenêtre au moment de son affichage
		  */
		Fenetre.prototype.animerArriveeFenetre = function(tempsActuel){	
            
			this.elHTML.classList.add("animationFenetre");
		}
		
		Fenetre.prototype.fermerFenetre = function(evt){
			//Enlever l'écouteur sur l'élément HTML
			this.elHTML.removeEventListener("mousedown", this.fermerFenetre, false );

			//Enlever la fenetre
			this.conteneurParent.removeChild(this.elHTML);
			
			//Appeler la fonction passée en paramètre
			this.action();
			
			//Arrêter la propagation
			evt.stopPropagation();
		}	

		QUIZ_CALCUL.Fenetre = Fenetre;

})();