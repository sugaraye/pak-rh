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
    (employe.progression || 0) < 60
){

    alert(
        "Veuillez d'abord compléter vos expériences professionnelles."
    );

    window.location.href =
    "dashboard.html";
}

// Affichage progression
let progression =
employe.progression || 60;

barre.style.width =
progression + "%";

pourcentage.innerHTML =
progression +
"% complété";

// Déblocage éventuel
if (
    progression >= 80
){

    btnSuivant
    .classList
    .remove(
        "disabled"
    );

}

// Chargement des diplômes
chargerDiplomes();

// Ajout d'un diplôme
document
.getElementById(
"diplomeForm"
)
.addEventListener(
"submit",
async(e)=>{

e.preventDefault();

const body = {

employe_id:
employe.id,

diplome:
diplome.value,

specialite:
specialite.value,

etablissement:
etablissement.value,

pays:
pays.value,

annee:
annee.value,

mention:
mention.value

};

try{

const response =
await fetch(
"/.netlify/functions/addDiplome",
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
result.message ||
"Erreur d'enregistrement."
);

}

// Progression
employe.progression =
Math.max(
employe.progression || 0,
80
);

localStorage.setItem(
"employe",
JSON.stringify(employe)
);

// Mise à jour écran
barre.style.width =
"80%";

pourcentage.innerHTML =
"80 % complété";

btnSuivant
.classList
.remove(
"disabled"
);

message.innerHTML =
`
<div class="success">

✅ Diplôme enregistré.

Vous pouvez maintenant
passer à l'étape suivante.

</div>
`;

diplomeForm.reset();

chargerDiplomes();

}
catch(e){

alert(
e.message
);

}

});

// Chargement de la liste
async function
chargerDiplomes(){

try{

const response =
await fetch(
"/.netlify/functions/getDiplomes?id="
+ employe.id
);

const data =
await response.json();

let html = "";

data.forEach(d=>{

html += `
<div class="item">

<h3>
${d.diplome}
</h3>

<p>
${d.specialite || ""}
</p>

<p>
${d.etablissement}
</p>

<p>
${d.annee}
</p>

<button
class="supprimer"
onclick="
supprimer(${d.id})
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
"Aucun diplôme enregistré.";

}

}

// Suppression
async function
supprimer(id){

if(
!confirm(
"Supprimer ce diplôme ?"
)
){
return;
}

await fetch(
"/.netlify/functions/deleteDiplome",
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

chargerDiplomes();

}
