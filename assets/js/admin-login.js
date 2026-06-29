document
.getElementById("loginForm")
.addEventListener(
"submit",
async(e)=>{

e.preventDefault();

const body = {

email:
email.value
.trim(),

mot_de_passe:
password.value

};

try{

const response =
await fetch(
"/.netlify/functions/adminLogin",
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
result.erreur
);

}

localStorage.setItem(
"admin",
JSON.stringify(
result.admin
)
);

window.location.href =
"admin-dashboard.html";

}
catch(e){

message.style.display =
"block";

message.innerHTML =
e.message;

}

});
