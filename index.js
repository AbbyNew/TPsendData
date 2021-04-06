// on récupère l'élément form  
const theForm = document.getElementById("form") ; 
// on récupère la valeur de l'input
const trucAEnvoyer = document.getElementById("value") ; 
// on récupère l'élément result
const res = document.getElementById("result") ; 


console.log(theForm) ;

// Si la forme est soumise (bouton)
theForm.addEventListener("submit", function(event) {
    
    event.preventDefault() ; // pour éviter que la page se recharge (et donc que le contenu de la forme disparaisse) 
    console.log("dans le submit") ;
    console.log(trucAEnvoyer.value) ;

    if (trucAEnvoyer.value.length == 0) {

        setTimeout(function() {
            res.innerText = "" ; 
        }, 3000);        
        
        //alert("You must enter something !") ; // pas d'input-> alerte, input est vide
        res.innerText = "You must enter something !" ;
    }
    else
        sendrequest(trucAEnvoyer) ; // input-> on l'envoie
  });

 
function sendrequest(leTrucAEnvoyer) {

    //console.log("on est dans la fonction sendrequest : " + JSON.stringify(leTrucAEnvoyer)) ;
    console.log("on est dans la fonction sendrequest : " + leTrucAEnvoyer.value ) ;
    
    var request= new XMLHttpRequest() ; 

    request.open("POST", "https://mockbin.com/request") ; 
    request.setRequestHeader("Content-Type", "application/json");
    //request.send(JSON.stringify(leTrucAEnvoyer.value));
    request.send(leTrucAEnvoyer.value);

    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            // pour avoir tout l'objet: 
            //var response = this.responseText ;
            //const res = document.getElementById("result") ; // on récupère l'élément result
            //res.innerText = response ;
            
            // pour avoir une partie de l'objet: 
            var response = JSON.parse(this.responseText) ;        
            var responseShort = response.postData.text;              
            //res.innerText = JSON.stringify(responseShort); // on lui associe la réponse
            res.innerText = responseShort; // on lui associe la réponse
        }
    };
} ;
