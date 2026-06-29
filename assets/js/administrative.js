const employe =
JSON.parse(
localStorage.getItem("employe")
);

// Vérification de connexion
if (!employe) {
    window.location.href =
    "login.html";
}

// Vérification de l'étape précédente
if (
    (employe.progression || 0) < 20
) {

    alert(
        "Veuillez d'abord compléter vos informations personnelles."
    );

    window.location.href =
    "dashboard.html";

}

// Pré-remplissage
matricule.value =
employe.matricule || "";

direction.value =
employe.direction || "";

service.value =
employe.service || "";

poste.value =
employe.poste || "";

grade.value =
employe.grade || "";

// Affichage progression
let progression =
employe.progression || 20;

barre.style.width =
progression + "%";

pourcentage.innerHTML =
progression +
"% complété";

// Déblocage éventuel
if (progression >= 40) {

    btnSuivant
    .classList
    .remove(
        "disabled"
    );

}

// Sauvegarde
document
.getElementById(
"adminForm"
)
.addEventListener(
"submit",
async (e)=>{

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

try{

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

if(!response.ok){

throw new Error(
result.erreur ||
"Erreur d'enregistrement."
);

}

// Mise à jour locale
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
Math.max(
employe.progression || 0,
40
);

localStorage.setItem(
"employe",
JSON.stringify(employe)
);

// Mise à jour écran
barre.style.width =
"40%";

pourcentage.innerHTML =
"40 % complété";

btnSuivant
.classList
.remove(
"disabled"
);

message.innerHTML =
`
<div class="success">

✅ Informations administratives
enregistrées avec succès.

Vous pouvez maintenant
passer à l'étape suivante.

</div>
`;

}
catch(e){

message.innerHTML =
`
<div style="
background:#fef2f2;
color:#b91c1c;
padding:20px;
border-radius:15px;
margin-top:20px;
">

${e.message}

</div>
`;

}

});
