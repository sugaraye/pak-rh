const employe =
JSON.parse(
localStorage.getItem("employe")
);
if (
  !employe ||
  employe.progression < 40
) {
  alert(
    "Veuillez d'abord compléter vos informations administratives."
  );

  window.location.href =
    "dashboard.html";
}

if (!employe) {
    window.location.href =
    "login.html";
}

chargerExperiences();

document
.getElementById(
"experienceForm"
)
.addEventListener(
"submit",
async (e)=>{

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

if(response.ok){

employe.progression = 60;

localStorage.setItem(
"employe",
JSON.stringify(employe)
);

document
.getElementById(
"experienceForm"
)
.reset();

chargerExperiences();

}
else{

alert(
"Erreur lors de l'enregistrement."
);

}

});

async function
chargerExperiences(){

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

document
.getElementById(
"liste"
)
.innerHTML =
html;

}

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
