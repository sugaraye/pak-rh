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

  const { data: numero } =
    await supabase.rpc(
      'next_pak_number'
    );

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
