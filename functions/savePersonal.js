const {
createClient
} = require("@supabase/supabase-js");

exports.handler = async (event) => {

try {

const supabase =
createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_KEY
);

const body =
JSON.parse(event.body);

const {
id,
nom,
prenom,
sexe,
date_naissance,
lieu_naissance,
nationalite,
telephone,
email,
adresse,
ville,
situation_familiale,
nombre_enfants
} = body;

const {
error
} =
await supabase
.from("employes")
.update({

nom,
prenom,
sexe,
date_naissance,
lieu_naissance,
nationalite,
telephone,
email,
adresse,
ville,
situation_familiale,
nombre_enfants,
progression:20

})
.eq("id", id);

if(error){

return {
statusCode:500,
body:JSON.stringify({
erreur:error.message
})
};

}

return {
statusCode:200,
body:JSON.stringify({
success:true
})
};

}
catch(err){

return {
statusCode:500,
body:JSON.stringify({
erreur:err.message
})
};

}

};
