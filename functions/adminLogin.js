const {
createClient
} =
require(
"@supabase/supabase-js"
);

exports.handler =
async(event)=>{

try{

const supabase =
createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_KEY
);

const body =
JSON.parse(
event.body
);

const {
email,
mot_de_passe
} = body;

const {
data,
error
} =
await supabase
.from(
"administrateurs"
)
.select("*")
.eq(
"email",
email
)
.eq(
"mot_de_passe",
mot_de_passe
)
.eq(
"actif",
true
)
.single();

if(error || !data){

return{
statusCode:401,
body:
JSON.stringify({
erreur:
"Identifiants incorrects."
})
};

}

return{
statusCode:200,
body:
JSON.stringify({

admin:{

id:
data.id,

nom:
data.nom,

email:
data.email,

role:
data.role

}

})
};

}
catch(e){

return{
statusCode:500,
body:
JSON.stringify({
erreur:
e.message
})
};

}

};
