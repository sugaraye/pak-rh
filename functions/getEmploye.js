const {
  createClient
} =
require("@supabase/supabase-js");

exports.handler =
async(event)=>{

try{

const supabase =
createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_KEY
);

const id =
event.queryStringParameters.id;

/*
Employé
*/

const {
data: employe,
error: e1
} =
await supabase
.from("employes")
.select("*")
.eq("id", id)
.single();

if(e1){
throw e1;
}

/*
Expériences
*/

const {
data: experiences
} =
await supabase
.from("experiences")
.select("*")
.eq("employe_id", id)
.order(
"date_debut",
{
ascending:false
}
);

/*
Diplômes
*/

const {
data: diplomes
} =
await supabase
.from("diplomes")
.select("*")
.eq("employe_id", id)
.order(
"annee",
{
ascending:false
}
);

/*
Documents
*/

const {
data: documents
} =
await supabase
.from("documents")
.select("*")
.eq("employe_id", id);

return{
statusCode:200,
body:
JSON.stringify({

employe,
experiences,
diplomes,
documents

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
