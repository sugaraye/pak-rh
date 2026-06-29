const {
createClient
} =
require("@supabase/supabase-js");

exports.handler =
async(event)=>{

const supabase =
createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_KEY
);

const body =
JSON.parse(
event.body
);

await supabase
.from("employes")
.update({

statut:
"Correction demandée",

commentaire_rh:
body.commentaire

})
.eq(
"id",
body.id
);

return{
statusCode:200,
body:
JSON.stringify({
success:true
})
};

};
