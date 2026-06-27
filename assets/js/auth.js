document
.getElementById("createForm")
?.addEventListener(
"submit",
async function(e){

e.preventDefault();

const response =
await fetch(
"/.netlify/functions/createAccount",
{
method:"POST",
headers:{
"Content-Type":
"application/json"
},
body:JSON.stringify({
nom:
nom.value,
prenom:
prenom.value,
email:
email.value,
telephone:
telephone.value,
direction:
direction.value,
service:
service.value,
poste:
poste.value,
grade:
grade.value,
matricule:
matricule.value,
dateNaissance:
dateNaissance.value
})
}
);

const data =
await response.json();

document
.getElementById(
"resultat"
)
.innerHTML = `
<h2>Compte créé</h2>

<p>
Identifiant :
<b>${data.identifiant}</b>
</p>

<p>
Mot de passe :
<b>${data.motDePasse}</b>
</p>

<p>
Conservez ces informations.
</p>
`;
});
