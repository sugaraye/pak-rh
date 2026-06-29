const PDFDocument =
require("pdfkit");

const streamBuffers =
require("stream-buffers");

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
=========================
Récupération des données
=========================
*/

const {
data: employe,
error
} =
await supabase
.from("employes")
.select("*")
.eq("id", id)
.single();

if(error){

throw error;

}

const {
data: experiences
} =
await supabase
.from("experiences")
.select("*")
.eq(
"employe_id",
id
);

const {
data: diplomes
} =
await supabase
.from("diplomes")
.select("*")
.eq(
"employe_id",
id
);

const {
data: documents
} =
await supabase
.from("documents")
.select("*")
.eq(
"employe_id",
id
);

/*
=========================
Création PDF
=========================
*/

const doc =
new PDFDocument({

margin:50

});

const buffer =
new streamBuffers
.WritableStreamBuffer();

doc.pipe(buffer);

/*
=========================
En-tête
=========================
*/

doc
.fontSize(18)
.text(
"PORT AUTONOME DE KRIBI",
{
align:"center"
}
);

doc
.fontSize(14)
.text(
"DIRECTION DES RESSOURCES HUMAINES",
{
align:"center"
}
);

doc.moveDown();

doc
.fontSize(16)
.text(
"FICHE CARRIÈRE DU PERSONNEL",
{
align:"center"
}
);

doc.moveDown(2);

/*
=========================
Informations générales
=========================
*/

doc
.fontSize(14)
.text(
"INFORMATIONS GÉNÉRALES",
{
underline:true
}
);

doc.moveDown();

doc.text(
`Numéro dossier : ${
employe.numero_dossier || "-"
}`
);

doc.text(
`Identifiant : ${
employe.identifiant || "-"
}`
);

doc.text(
`Matricule : ${
employe.matricule || "-"
}`
);

doc.text(
`Nom : ${
employe.nom || "-"
}`
);

doc.text(
`Prénom : ${
employe.prenom || "-"
}`
);

doc.text(
`Sexe : ${
employe.sexe || "-"
}`
);

doc.text(
`Date de naissance : ${
employe.date_naissance || "-"
}`
);

doc.text(
`Téléphone : ${
employe.telephone || "-"
}`
);

doc.text(
`Email : ${
employe.email || "-"
}`
);

doc.text(
`Direction : ${
employe.direction || "-"
}`
);

doc.text(
`Service : ${
employe.service || "-"
}`
);

doc.text(
`Poste : ${
employe.poste || "-"
}`
);

doc.text(
`Grade : ${
employe.grade || "-"
}`
);

doc.moveDown();

/*
=========================
Expériences
=========================
*/

doc
.fontSize(14)
.text(
"EXPÉRIENCES PROFESSIONNELLES",
{
underline:true
}
);

doc.moveDown();

if(
experiences &&
experiences.length
){

experiences.forEach(
e=>{

doc.text(
`• ${
e.fonction || ""
}`
);

doc.text(
`  Employeur : ${
e.employeur || ""
}`
);

doc.text(
`  Période : ${
e.date_debut || ""
}
 - ${
e.date_fin ||
"Aujourd'hui"
}`
);

doc.moveDown();

}
);

}else{

doc.text(
"Aucune expérience enregistrée."
);

}

doc.moveDown();

/*
=========================
Diplômes
=========================
*/

doc
.fontSize(14)
.text(
"DIPLÔMES ET CERTIFICATIONS",
{
underline:true
}
);

doc.moveDown();

if(
diplomes &&
diplomes.length
){

diplomes.forEach(
d=>{

doc.text(
`• ${
d.diplome || ""
}`
);

doc.text(
`  Établissement : ${
d.etablissement || ""
}`
);

doc.text(
`  Année : ${
d.annee || ""
}`
);

doc.moveDown();

}
);

}else{

doc.text(
"Aucun diplôme enregistré."
);

}

doc.moveDown();

/*
=========================
Documents
=========================
*/

doc
.fontSize(14)
.text(
"PIÈCES JUSTIFICATIVES",
{
underline:true
}
);

doc.moveDown();

if(
documents &&
documents.length
){

documents.forEach(
d=>{

doc.text(
`• ${
d.nom_fichier
}`
);

}
);

}else{

doc.text(
"Aucun document déposé."
);

}

doc.moveDown(2);

/*
=========================
Statut
=========================
*/

doc.text(
`Statut du dossier : ${
employe.statut ||
"En cours"
}`
);

doc.text(
`Date d'édition : ${
new Date()
.toLocaleDateString(
'fr-FR'
)
}`
);

doc.moveDown(4);

/*
=========================
Visa RH
=========================
*/

doc.text(
"Visa RH"
);

doc.moveDown(4);

doc.text(
"_________________________________"
);

doc.text(
"Nom et signature"
);

doc.moveDown(3);

doc.text(
"Cachet de la DRH"
);

/*
=========================
Fin PDF
=========================
*/

doc.end();

await new Promise(
resolve=>{

buffer.on(
"finish",
resolve
);

}
);

const pdf =
buffer.getContents();

return{

statusCode:200,

headers:{

"Content-Type":
"application/pdf",

"Content-Disposition":
`inline; filename=Fiche_Carriere_${employe.identifiant}.pdf`

},

isBase64Encoded:true,

body:
pdf.toString(
"base64"
)

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
