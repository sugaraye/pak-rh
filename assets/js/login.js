document
.getElementById("loginForm")
.addEventListener("submit", async (e)=>{

e.preventDefault();

const identifiant =
document.getElementById("identifiant").value;

const motDePasse =
document.getElementById("motdepasse").value;

const response =
await fetch(
"/.netlify/functions/login",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
identifiant,
motDePasse
})
});

const data =
await response.json();

if(response.ok){

localStorage.setItem(
"employe",
JSON.stringify(data.employe)
);

window.location.href =
"dashboard.html";

}else{

document.getElementById("message")
.innerHTML =
`<p class="erreur">${data.erreur}</p>`;

}

});
