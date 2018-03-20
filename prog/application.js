var QUIZ_CALCUL = QUIZ_CALCUL || {};

(function() {
	"use strict";
	
	//Objet littéral pour les questions du quiz
	var questionsQuiz = {
		nbQuestions : 5,
		question1: {
				probleme: "Quel est l'élément le plus rapide dans l'univers?",
				choix: ["La lumière","Le son", "La chaleur"],
				bonneReponse: 0
			},
		question2: {
				probleme: "Comment s'appelle la réaction qui se passe dans le centre du soleil et créer de l'énergie?",
				choix: ["La combustion","La fision","La fusion"],
				bonneReponse: 2
			},

		question3: {
				probleme: "Qu'est-ce qu'un Tesseract?",
				choix: ["Un autre nom pour les Trous Noirs","Un cube en 4 dimensions","Le nom d'un vaisseau spatial dans Star Trek"],
				bonneReponse: 1
			},

		question4: {
				probleme: "Comment un trou noir se forme-t-il?",
				choix: ["Lorsque deux planètes entre en collision","Quand une étoile meurt","Quand une géante gazeuse devient trop grosse"],
				bonneReponse: 1
			},

		question5: {
				probleme : "Qui a découvert la gravité?",
				choix: ["Isaac Newton","Albert Einstein","Nicolas Tesla"],
				bonneReponse: 0
			}
	}

	//variables
	var noQuestionEnCours, laQuestion, lesChoixDeReponses, etatQuiz, boutonSuivant, score;
	
	
	//Chargement de la page
	window.addEventListener("load", function (){

		laQuestion = document.querySelector("#titre");
		lesChoixDeReponses = document.querySelectorAll(".choix");
		etatQuiz = document.querySelector("footer > p");
		boutonSuivant = document.querySelector("footer > div")
		
		//afficher la fenêtre de bienvenu
		afficherFenetreDebut();
	}, false );

	//initialisation du quizz
	function initialiserQuiz (evt) {
		noQuestionEnCours = 0;
        score = 0;
        //Première question
        afficherProchaineQuestion();
	};
	
	//Afficher les questions suivantes
	function afficherProchaineQuestion (evt) {
		//Prochaine question
		noQuestionEnCours++;

		if(noQuestionEnCours <= questionsQuiz.nbQuestions){
			//Question
			laQuestion.innerHTML = questionsQuiz["question" + noQuestionEnCours].probleme;
			//Choix de réponse
			for (var i=0 ; i < 3 ; i++){
				lesChoixDeReponses[i].innerHTML = questionsQuiz["question" + noQuestionEnCours].choix[i];
				lesChoixDeReponses[i].ID= i;
				lesChoixDeReponses[i].addEventListener("mousedown", choisirReponse, false);	
			}	

		} else {
			finJeu();
		}

        gererBoutonSuivant(false);
	};
    
    //Le choix de la réponse
    function choisirReponse (evt) {
		for (var i=0 ; i < 3 ; i++){
			lesChoixDeReponses[i].removeEventListener("mousedown", choisirReponse, false);
		}

		if(evt.target.ID == questionsQuiz["question" +noQuestionEnCours].bonneReponse){
			score++;
		}
		
		etatQuiz.innerHTML = ("Votre score actuel est de " + score + " point(s).");
		gererBoutonSuivant(true);
	};
    
    //Lorsque le jeu est teminé
	function finJeu(){
		gererBoutonSuivant(false);
		afficherFenetre();
	}

	//Faire afficher la fenêtre du début de jeu
	function afficherFenetreDebut(){
		var laPage= document.querySelector("body");
		var posX = laPage.offsetWidth/4,
			posY = -350,
			largeur = laPage.offsetWidth/2,
			hauteur = laPage.offsetHeight/2,
			texte = "La physique pour les nuls - Bienvenu dans ce quiz simple pour tester vaut connaissances de la physique général. Pour chaque question, vous devez choisir votre réponse dans un des trois choix fournis. Une fois fait, cliquez sur le bouton 'Question suivante'.";
			
		//Créer la fenêtre	
		var uneFenetre= new QUIZ_CALCUL.Fenetre(posX,posY, largeur, hauteur, "fenetre", texte, rejouer, laPage);
	}
    
	//Faire afficher la fenêtre
	function afficherFenetre(){
		var laPage= document.querySelector("body");
		var posX = laPage.offsetWidth/4,
			posY = -350,
			largeur = laPage.offsetWidth/2,
			hauteur = laPage.offsetHeight/2,
			texte = "Le quiz est terminé. Cliquer dans la fenêtre pour rejouer! Votre score est de "+score+" point(s). ";
			if (localStorage.meilleurScore) {
				texte += "Le meilleur score est de "+localStorage.meilleurScore;
			} else {
				texte += "Vous n'avez pas encore de meilleur score!";
				localStorage.meilleurScore = score;
			}

			if (localStorage.meilleurScore) {
				if(localStorage.meilleurScore < score) {
					localStorage.meilleurScore = score;
				}
			}
		//Créer la fenêtre	
		var uneFenetre= new QUIZ_CALCUL.Fenetre(posX,posY, largeur, hauteur, "fenetre", texte, rejouer, laPage);
	}
    
    //Pour gerer le bouton qui permet de passer à la prochaine question
	function gererBoutonSuivant (actif) {

		if(actif == true) {
			boutonSuivant.addEventListener("mousedown", afficherProchaineQuestion, false);
			boutonSuivant.style.backgroundColor = "rgb(140,84,37)";
		} else {
			boutonSuivant.removeEventListener("mousedown", afficherProchaineQuestion, false);
			boutonSuivant.style.opacity = "gray";
		}                
	}
	
	//Pour relancer le quiz une fois terminé
	function rejouer(){
		initialiserQuiz();
		etatQuiz.innerHTML = "Bienvenu sur ce quiz de fin de session! Bonne chance!"
	}
	
})();//Fin IIFE