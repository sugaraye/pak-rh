const {
createClient
} = require("@supabase/supabase-js");

exports.handler = async (event)=>{

try{

const supabase =
createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_KEY
);

const body =
JSON.parse(event.body);

const {
identifiant,
motDePasse
} = body;

const {
data,
error
} =
await supabase
.from("employes")
.select("*")
.eq("identifiant", identifiant)
.eq("mot_de_passe", motDePasse)
.single();

if(error || !data){

return{
statusCode:401,
body:JSON.stringify({
erreur:
"Identifiant ou mot de passe incorrect."
})
};

}

return{
statusCode:200,
body:JSON.stringify({
employe:data
})
};

}catch(err){

return{
statusCode:500,
body:JSON.stringify({
erreur:err.message
})
};

}

};
