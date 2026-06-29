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

const id =
event.queryStringParameters.id;

const {
data
} =
await supabase
.from("historique_rh")
.select("*")
.eq(
"employe_id",
id
)
.order(
"created_at",
{
ascending:false
}
);

return{
statusCode:200,
body:
JSON.stringify(data)
};

};
