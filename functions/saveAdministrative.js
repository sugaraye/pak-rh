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
id,
matricule,
direction,
departement,
service,
poste,
grade,
categorie,
echelon,
date_entree,
date_prise_service,
type_contrat,
superieur_hierarchique
} = body;

const {
error
} =
await supabase
.from("employes")
.update({

matricule,
direction,
departement,
service,
poste,
grade,
categorie,
echelon,
date_entree,
date_prise_service,
type_contrat,
superieur_hierarchique,
progression:40

})
.eq(
"id",
id
);

if(error){

return{
statusCode:500,
body:
JSON.stringify({
erreur:
error.message
})
};

}

return{
statusCode:200,
body:
JSON.stringify({
success:true
})
};

}
catch(err){

return{
statusCode:500,
body:
JSON.stringify({
erreur:
err.message
})
};

}

};
