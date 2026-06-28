const employe =
JSON.parse(
localStorage.getItem("employe")
);

if(!employe){

window.location.href =
"login.html";

}

document
.getElementById(
"soumettre"
)
.addEventListener(
"click",
async ()=>{

if(
!document
.getElementById(
"certifie"
)
.checked
){

alert(
"Veuillez certifier les informations."
);

return;

}

const response =
await fetch(
"/.netlify/functions/submitDossier",
{
method:"POST",
headers:{
"Content-Type":
"application/json"
},
body:
JSON.stringify({

id:
employe.id

})
}
);

const result =
await response.json();

if(response.ok){

employe.statut =
"Soumis";

localStorage.setItem(
"employe",
JSON.stringify(employe)
);

document
.getElementById(
"message"
)
.innerHTML =
`
<div class="success">

<h2>
Dossier transmis
</h2>

<p>

Votre dossier a été transmis
à la Direction des Ressources
Humaines du Port Autonome
de Kribi.

</p>

<p>

Numéro de dossier :

<strong>

${employe.numero_dossier}

</strong>

</p>

<p>

Date :

<strong>

${new Date()
.toLocaleDateString(
'fr-FR'
)}

</strong>

</p>

</div>
`;

}
else{

alert(
result.erreur
);

}

});
