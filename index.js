// Exercice sur les fonctions asynchrones
// Ici on soumet un formulaire qui est envoyé à 'https://mockbin.com/request') 
// le site nous répond avec ce qu'on lui a soumis
// Si on envoie un formulaire vide, alors message de warning avec setTimeOut : un message arrive et reste juste 3 secondes
//                                           ou  mieux même avec setInterval : le message clignote

// on récupère l'élément form
const theForm = document.getElementById('form');
// on récupère la valeur de l'input
const trucAEnvoyer = document.getElementById('value');
// on récupère l'élément result
const res = document.getElementById('result');

// Variable globale pour savoir si trucAEnvoyer a le focus
var hasFocus = false ;
var chgt = 0  ;
var myVar=0  ;

console.log(theForm);

// On regarde si trucAEnvoyer a pris le focus
trucAEnvoyer.addEventListener('focus', ()=> {
    
    trucAEnvoyer.style.background = "yellow"; 
    console.log('dans le focus');
    hasFocus = true ;
    if (myVar!=0) {
        clearInterval(myVar) ;
        myVar=0 ;
        res.innerText = "" ; 
    }

}) ; 

// On regarde si trucAEnvoyer a perdu le focus
trucAEnvoyer.addEventListener('blur', ()=> {
    trucAEnvoyer.style.background = "white"; 
    console.log('OUT focus'); 
    hasFocus = false ;  
   
}) ; 
 
// Si la forme est soumise (bouton)
theForm.addEventListener('submit', function(event) {
	event.preventDefault(); // pour éviter que la page se recharge (et donc que le contenu de la forme disparaisse)   
	console.log('dans le submit');
	
    // On fait clignoter 'You must enter something !' tant que le champ de soumission est vide ET qu'il n'a pas repris le focus   
    if (hasFocus==false && trucAEnvoyer.value.length == 0) {
        
        console.log("OUT focus et empty");

        if (myVar==0) {            // il faut vérifier que le cligno n'est pas déjà enclenché sinon il est doublmé et on perd la main
            console.log("myVar does not exist") ; 
            myVar = setInterval(message, 1000);
            res.innerText = "" ;
        }
        else
            console.log("myVar exists") ; 
        
        // temps = setTimeOut(function() {
        //     res.innerText = '';
        // }, 1000);       
        // res.innerText = 'You must enter something !';
    }

    // On envoie la requête ssi le champ de soumission n'est pas vide  
	if (trucAEnvoyer.value.length != 0 ) 
    {
        console.log("Envoi");
        sendrequest(trucAEnvoyer); // input-> on l'envoie
    }

});


function message() {
    chgt++ ; 
   if (chgt%2 ==0)
   		res.innerText =  "You must enter something !" ;
   else
   		res.innerText = "Message not sent"  ;  

} ; 


function sendrequest(leTrucAEnvoyer) {
	//console.log("on est dans la fonction sendrequest : " + JSON.stringify(leTrucAEnvoyer)) ;
	console.log('on est dans la fonction sendrequest : ' + leTrucAEnvoyer.value);

	var request = new XMLHttpRequest();

	request.open('POST', 'https://mockbin.com/request');
	request.setRequestHeader('Content-Type', 'application/json');
	//request.send(JSON.stringify(leTrucAEnvoyer.value));
	request.send(leTrucAEnvoyer.value);

	request.onreadystatechange = function() {
		if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
			// pour avoir tout l'objet:
			//var response = this.responseText ;
			//const res = document.getElementById("result") ; // on récupère l'élément result
			//res.innerText = response ;

			// pour avoir une partie de l'objet:
			var response = JSON.parse(this.responseText);
			var responseShort = response.postData.text;
			//res.innerText = JSON.stringify(responseShort); // on lui associe la réponse
			res.innerText = responseShort; // on lui associe la réponse
		}
	};
}
