const employe =
JSON.parse(localStorage.getItem("employe"));

if (!employe) {
    window.location.href = "login.html";
}

document.getElementById("nom").value =
employe.nom || "";

document.getElementById("prenom").value =
employe.prenom || "";

document.getElementById("telephone").value =
employe.telephone || "";

document.getElementById("email").value =
employe.email || "";

document
.getElementById("personForm")
.addEventListener("submit", async (e) => {

e.preventDefault();

const data = {
id: employe.id,

nom:
document.getElementById("nom").value,

prenom:
document.getElementById("prenom").value,

sexe:
document.getElementById("sexe").value,

date_naissance:
document.getElementById("date_naissance").value,

lieu_naissance:
document.getElementById("lieu_naissance").value,

nationalite:
document.getElementById("nationalite").value,

telephone:
document.getElementById("telephone").value,

email:
document.getElementById("email").value,

adresse:
document.getElementById("adresse").value,

ville:
document.getElementById("ville").value,

situation_familiale:
document.getElementById("situation_familiale").value,

nombre_enfants:
document.getElementById("nombre_enfants").value

};

const response =
await fetch(
"/.netlify/functions/savePersonal",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(data)
}
);

const result =
await response.json();

if(response.ok){

document.getElementById("message")
.innerHTML =
'<p class="success">Informations enregistrées.</p>';

employe.progression = 20;

localStorage.setItem(
"employe",
JSON.stringify(employe)
);

}else{

alert(result.erreur);

}

});
