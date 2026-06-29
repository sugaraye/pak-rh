const { createClient } =
require("@supabase/supabase-js");

exports.handler = async (event) => {

  try {

    const supabase =
      createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_SERVICE_KEY
      );

    const body =
      JSON.parse(event.body);

    const {
      email,
      mot_de_passe
    } = body;

    console.log("EMAIL =", email);
    console.log("MOT_DE_PASSE =", mot_de_passe);

    const {
      data,
      error
    } = await supabase
      .from("administrateurs")
      .select("*")
      .eq("email", email)
      .eq("mot_de_passe", mot_de_passe)
      .eq("actif", true)
      .single();

    console.log("DATA =", data);
    console.log("ERROR =", error);

    if (error || !data) {

      return {
        statusCode: 401,
        body: JSON.stringify({
          erreur: "Identifiants incorrects."
        })
      };

    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        admin: {
          id: data.id,
          nom: data.nom,
          email: data.email,
          role: data.role
        }
      })
    };

  }
  catch (e) {

    console.log("EXCEPTION =", e);

    return {
      statusCode: 500,
      body: JSON.stringify({
        erreur: e.message
      })
    };

  }

};
