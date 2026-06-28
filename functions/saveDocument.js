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
error
} =
await supabase
.from(
"documents"
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
