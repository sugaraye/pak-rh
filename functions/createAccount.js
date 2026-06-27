const { createClient } =
require('@supabase/supabase-js');

exports.handler = async (event) => {

  const supabase =
    createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );

  const body =
    JSON.parse(event.body);

  const {
    nom,
    prenom,
    email,
    telephone,
    direction,
    service,
    poste,
    dateNaissance
  } = body;

  const {
  data: numero,
  error
} = await supabase.rpc('next_pak_number');

console.log("numero =", numero);
console.log("error =", error);

if (error) {
  return {
    statusCode: 500,
    body: JSON.stringify({
      erreur: error.message
    })
  };
}

  const identifiant =
    `PAK-2026-${String(numero)
      .padStart(6, '0')}`;

  const motDePasse =
    `Pak@2026-${
      Math.floor(
        1000 +
        Math.random() * 9000
      )
    }`;

  return {
    statusCode: 200,
    body: JSON.stringify({
      identifiant,
      motDePasse
    })
  };
};
