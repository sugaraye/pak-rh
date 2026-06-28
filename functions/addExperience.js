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

const body =
JSON.parse(
event.body
);

const {
error
} =
await supabase
.from(
"experiences"
)
.insert(body);

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
JSON.stringify({
success:true
})
};

};
