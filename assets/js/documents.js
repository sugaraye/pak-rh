const employe =
JSON.parse(
localStorage.getItem("employe")
);

if (!employe) {
    window.location.href =
    "login.html";
}

chargerDocuments();

document
.getElementById("envoyer")
.addEventListener(
"click",
async ()=>{

const type =
document.getElementById(
"type_document"
).value;

const fichier =
document.getElementById(
"fichier"
).files[0];

if(!type || !fichier){
    alert(
    "Choisissez un document."
    );
    return;
}

const formData =
new FormData();

formData.append(
"type",
type
);

formData.append(
"employe_id",
employe.id
);

formData.append(
"fichier",
fichier
);

const response =
await fetch(
"/.netlify/functions/uploadDocument",
{
method:"POST",
body:formData
}
);

if(response.ok){

employe.progression =
100;

localStorage.setItem(
"employe",
JSON.stringify(employe)
);

document
.getElementById(
"fichier"
).value =
"";

chargerDocuments();

}
else{

alert(
"Erreur lors du téléversement."
);

}

});
