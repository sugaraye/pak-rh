const employe =
JSON.parse(
localStorage.getItem("employe")
);

if(!employe){

window.location.href =
"login.html";

}

document
.getElementById("matricule")
.value =
employe.matricule || "";

document
.getElementById("direction")
.value =
employe.direction || "";

document
.getElementById("service")
.value =
employe.service || "";

document
.getElementById("poste")
.value =
employe.poste || "";

document
.getElementById("grade")
.value =
employe.grade || "";

document
.getElementById("adminForm")
.addEventListener(
"submit",
async(e)=>{

e.preventDefault();

const body = {

id:
employe.id,

matricule:
matricule.value,

direction:
direction.value,

departement:
departement.value,

service:
service.value,

poste:
poste.value,

grade:
grade.value,

categorie:
categorie.value,

echelon:
echelon.value,

date_entree:
date_entree.value,

date_prise_service:
date_prise_service.value,

type_contrat:
type_contrat.value,

superieur_hierarchique:
superieur_hierarchique.value

};

const response =
await fetch(
"/.netlify/functions/saveAdministrative",
{
method:"POST",
headers:{
"Content-Type":
"application/json"
},
body:
JSON.stringify(body)
}
);

const result =
await response.json();

if(response.ok){

employe.matricule =
body.matricule;

employe.direction =
body.direction;

employe.service =
body.service;

employe.poste =
body.poste;

employe.grade =
body.grade;

employe.progression =
40;

localStorage.setItem(
"employe",
JSON.stringify(employe)
);

document
.getElementById(
"message"
)
.innerHTML =
'<p class="success">Informations enregistrées.</p>';

}
else{

alert(
result.erreur
);

}

});
