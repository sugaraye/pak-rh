const {
createClient
} =
require(
"@supabase/supabase-js"
);

exports.handler =
async(event)=>{

const supabase =
createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_KEY
);

const id =
event
.queryStringParameters
.id;

const {
data,
error
} =
await supabase
.from(
"documents"
)
.select("*")
.eq(
"employe_id",
id
)
.order(
"date_depot",
{
ascending:false
}
);

if(error){

return{
statusCode:500,
body:
JSON.stringify(
error
)
};

}

return{
statusCode:200,
body:
JSON.stringify(
data
)
};

};
