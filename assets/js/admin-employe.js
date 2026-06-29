const admin =
JSON.parse(
localStorage.getItem(
"admin"
)
);

if(!admin){

window.location.href =
"admin-login.html";

}

const params =
new URLSearchParams(
window.location.search
);

const id =
params.get("id");

charger();

async function
charger(){

const response =
await fetch(
"/.netlify/functions/getEmploye?id="
+ id
);

const data =
await response.json();

const e =
data.employe;

nom.innerHTML =
`${e.nom} ${e.prenom}`;

infos.innerHTML =
`
<p>
Identifiant :
${e.identifiant}
</p>

<p>
Matricule :
${e.matricule || "-"}
</p>

<p>
Direction :
${e.direction || "-"}
</p>

<p>
Service :
${e.service || "-"}
</p>

<p>
Poste :
${e.poste || "-"}
</p>

<p>
Statut :
${e.statut || "En cours"}
</p>
`;

let html =
"";

data.experiences.forEach(
x=>{

html += `
<div class="item">

<strong>
${x.fonction}
</strong>

<br>

${x.employeur}

</div>
`;

});

experiences.innerHTML =
html ||
"Aucune expérience.";

html = "";

data.diplomes.forEach(
x=>{

html += `
<div class="item">

<strong>
${x.diplome}
</strong>

<br>

${x.etablissement}

</div>
`;

});

diplomes.innerHTML =
html ||
"Aucun diplôme.";

html = "";

data.documents.forEach(
x=>{

html += `
<a
class="document"
href="${x.fichier_url}"
target="_blank">

📄
${x.nom_fichier}

</a>
`;

});

documents.innerHTML =
html ||
"Aucun document.";

}

valider.onclick =
async function(){

await fetch(
"/.netlify/functions/validateDossier",
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

message.innerHTML =
`
<p style="color:green;">
Dossier validé.
</p>
`;

};

corriger.onclick =
async function(){

await fetch(
"/.netlify/functions/requestCorrection",
{
method:"POST",
headers:{
"Content-Type":
"application/json"
},
body:
JSON.stringify({

id,

commentaire:
commentaire.value

})
}
);

message.innerHTML =
`
<p style="color:red;">
Correction demandée.
</p>
`;

};
