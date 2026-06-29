const employe =
JSON.parse(
localStorage.getItem("employe")
);

if (!employe) {
    window.location.href =
    "login.html";
}

verifierDossier();

async function
verifierDossier(){

// Vérification des étapes
etatPersonnelle.innerHTML =
(employe.progression >= 20)
? "✅ Informations personnelles"
: "❌ Informations personnelles";

etatAdministrative.innerHTML =
(employe.progression >= 40)
? "✅ Informations administratives"
: "❌ Informations administratives";

etatExperiences.innerHTML =
(employe.progression >= 60)
? "✅ Expériences professionnelles"
: "❌ Expériences professionnelles";

etatDiplomes.innerHTML =
(employe.progression >= 80)
? "✅ Diplômes et certifications"
: "❌ Diplômes et certifications";

etatDocuments.innerHTML =
(employe.progression >= 100)
? "✅ Documents"
: "❌ Documents";

// Vérification des documents
const response =
await fetch(
"/.netlify/functions/getDocuments?id="
+ employe.id
);

const docs =
await response.json();

let cv = false;
let cni = false;
let photo = false;

docs.forEach(doc=>{

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

});

etatCV.innerHTML =
cv
? "✅ Curriculum Vitae"
: "❌ Curriculum Vitae";

etatCNI.innerHTML =
cni
? "✅ Carte Nationale d'Identité"
: "❌ Carte Nationale d'Identité";

etatPhoto.innerHTML =
photo
? "✅ Photo d'identité"
: "❌ Photo d'identité";

// Autorisation de soumettre
if(
employe.progression === 100 &&
cv &&
cni &&
photo
){

soumettre.disabled =
false;

}

}

// Soumission
soumettre.addEventListener(
"click",
async ()=>{

if(
!certifie.checked
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

if(!response.ok){

alert(
result.erreur
);

return;

}

employe.statut =
"Soumis";

localStorage.setItem(
"employe",
JSON.stringify(employe)
);

message.innerHTML =
`
<div class="success">

<h2>
✅ Dossier transmis
</h2>

<p>

Votre dossier a été transmis
à la Direction des Ressources
Humaines du Port Autonome
de Kribi.

</p>

<p>

Numéro :

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

<p>

Statut :

<strong>

Soumis

</strong>

</p>

</div>
`;

soumettre.disabled =
true;

});
