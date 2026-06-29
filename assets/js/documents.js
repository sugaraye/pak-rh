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
    (employe.progression || 0) < 80
){

    alert(
        "Veuillez d'abord compléter vos diplômes."
    );

    window.location.href =
    "dashboard.html";
}

// Affichage progression
let progression =
employe.progression || 80;

barre.style.width =
progression + "%";

pourcentage.innerHTML =
progression +
"% complété";

// Chargement initial
chargerDocuments();

document
.getElementById(
"envoyer"
)
.addEventListener(
"click",
async ()=>{

const type =
type_document.value;

const fichier =
document
.getElementById(
"fichier"
)
.files[0];

if(!type || !fichier){

alert(
"Choisissez un document."
);

return;

}

// votre logique de téléversement actuelle
// reste ici

chargerDocuments();

});

async function
chargerDocuments(){

try{

const response =
await fetch(
"/.netlify/functions/getDocuments?id="
+ employe.id
);

const documents =
await response.json();

let html = "";

let cv = false;
let cni = false;
let photo = false;

documents.forEach(doc=>{

if(
doc.type_document === "cv"
){
cv = true;
}

if(
doc.type_document === "identites"
){
cni = true;
}

if(
doc.type_document === "photos"
){
photo = true;
}

html += `
<div class="document">

<strong>
${doc.type_document}
</strong>

<br><br>

<a
href="${doc.fichier_url}"
target="_blank">

Ouvrir

</a>

</div>
`;

});

liste.innerHTML =
html;

// Vérification pièces obligatoires
if(
cv &&
cni &&
photo
){

employe.progression =
100;

localStorage.setItem(
"employe",
JSON.stringify(employe)
);

barre.style.width =
"100%";

pourcentage.innerHTML =
"100 % complété";

btnSuivant
.classList
.remove(
"disabled"
);

message.innerHTML =
`
<div class="success">

✅ Toutes les pièces
obligatoires ont été déposées.

Votre dossier est prêt
pour la soumission finale.

</div>
`;

}

}
catch{

liste.innerHTML =
"Aucun document déposé.";

}

}
