const employe =
JSON.parse(
localStorage.getItem("employe")
);

// Vérification connexion
if (!employe) {
    window.location.href =
    "login.html";
}

// Vérification étape précédente
if (
    (employe.progression || 0) < 40
){

    alert(
        "Veuillez d'abord compléter vos informations administratives."
    );

    window.location.href =
    "dashboard.html";
}

// Affichage progression
let progression =
employe.progression || 40;

barre.style.width =
progression + "%";

pourcentage.innerHTML =
progression +
"% complété";

// Déblocage éventuel
if (
    progression >= 60
){

    btnSuivant
    .classList
    .remove(
        "disabled"
    );

}

// Chargement des expériences
chargerExperiences();

// Ajout
document
.getElementById(
"experienceForm"
)
.addEventListener(
"submit",
async(e)=>{

e.preventDefault();

const body = {

employe_id:
employe.id,

date_debut:
date_debut.value,

date_fin:
date_fin.value,

fonction:
fonction.value,

service:
service.value,

employeur:
employeur.value,

ville:
ville.value,

pays:
pays.value,

description:
description.value

};

try{

const response =
await fetch(
"/.netlify/functions/addExperience",
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

if(!response.ok){

throw new Error(
"Erreur d'enregistrement."
);

}

// Progression
employe.progression =
Math.max(
employe.progression || 0,
60
);

localStorage.setItem(
"employe",
JSON.stringify(employe)
);

// Mise à jour écran
barre.style.width =
"60%";

pourcentage.innerHTML =
"60 % complété";

btnSuivant
.classList
.remove(
"disabled"
);

message.innerHTML =
`
<div class="success">

✅ Expérience enregistrée.

Vous pouvez maintenant
passer à l'étape suivante.

</div>
`;

experienceForm.reset();

chargerExperiences();

}
catch(e){

alert(
e.message
);

}

});

// Chargement liste
async function
chargerExperiences(){

try{

const response =
await fetch(
"/.netlify/functions/getExperiences?id="
+ employe.id
);

const data =
await response.json();

let html = "";

data.forEach(exp=>{

html += `
<div class="experience">

<h3>
${exp.fonction}
</h3>

<p>
${exp.employeur}
</p>

<p>
${exp.date_debut}
-
${exp.date_fin || "Aujourd'hui"}
</p>

<p>
${exp.service || ""}
</p>

<button
class="supprimer"
onclick="
supprimer(${exp.id})
">

Supprimer

</button>

</div>
`;

});

liste.innerHTML =
html;

}
catch{

liste.innerHTML =
"Aucune expérience.";

}

}

// Suppression
async function
supprimer(id){

if(
!confirm(
"Supprimer cette expérience ?"
)
){
return;
}

await fetch(
"/.netlify/functions/deleteExperience",
{
method:"POST",
headers:{
"Content-Type":
"application/json"
},
body:
JSON.stringify({
id
})
}
);

chargerExperiences();

}
