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

    const email =
      (body.email || "")
        .trim()
        .toLowerCase();

    const mot_de_passe =
      (body.mot_de_passe || "")
        .trim();

    console.log("EMAIL RECU =", email);

    // Test : lire tous les administrateurs
    const {
      data: tous,
      error: errTous
    } = await supabase
      .from("administrateurs")
      .select("email");

    console.log("TOUS LES ADMINS =", tous);
    console.log("ERREUR TOUS =", errTous);

    const {
      data,
      error
    } = await supabase
      .from("administrateurs")
      .select("*")
      .eq("email", email)
      .single();

    console.log("ADMIN =", data);
    console.log("ERREUR =", error);

    if (error || !data) {
      return {
        statusCode: 401,
        body: JSON.stringify({
          erreur: "Adresse email inconnue."
        })
      };
    }

    if (!data.actif) {
      return {
        statusCode: 403,
        body: JSON.stringify({
          erreur: "Compte désactivé."
        })
      };
    }

    if (
      (data.mot_de_passe || "").trim() !==
      mot_de_passe
    ) {
      return {
        statusCode: 401,
        body: JSON.stringify({
          erreur: "Mot de passe incorrect."
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
