const {
  createClient
} =
require("@supabase/supabase-js");

exports.handler =
async (event) => {

  try {

    const supabase =
    createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );

    const recherche =
      event
      .queryStringParameters
      ?.q ||
      "";

    let query =
      supabase
      .from("employes")
      .select("*")
      .order(
        "created_at",
        {
          ascending: false
        }
      );

    if (recherche) {

      query =
      query.or(

`nom.ilike.%${recherche}%,
prenom.ilike.%${recherche}%,
matricule.ilike.%${recherche}%,
identifiant.ilike.%${recherche}%,
direction.ilike.%${recherche}%,
service.ilike.%${recherche}%`

      );

    }

    const {
      data,
      error
    } =
    await query;

    if (error) {
      throw error;
    }

    return {
      statusCode: 200,
      body:
      JSON.stringify(
        data
      )
    };

  }
  catch (e) {

    return {
      statusCode: 500,
      body:
      JSON.stringify({
        erreur:
        e.message
      })
    };

  }

};
