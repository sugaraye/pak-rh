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

const body =
JSON.parse(event.body);

await supabase
.from("historique_rh")
.insert(body);

return{
statusCode:200,
body:
JSON.stringify({
success:true
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
