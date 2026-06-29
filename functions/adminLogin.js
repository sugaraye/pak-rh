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

    console.log("EMAIL =", email);

    const {
      data,
      error
    } =
    await supabase
      .from("administrateurs")
      .select("*")
      .ilike("email", email)
      .single();

    console.log("DATA =", data);
    console.log("ERROR =", error);

    // Administrateur introuvable
    if (error || !data) {

      return {
        statusCode: 401,
        body: JSON.stringify({
          erreur: "Adresse email inconnue."
        })
      };

    }

    // Compte désactivé
    if (!data.actif) {

      return {
        statusCode: 403,
        body: JSON.stringify({
          erreur:
            "Votre compte RH est désactivé."
        })
      };

    }

    // Mot de passe incorrect
    if (
      (data.mot_de_passe || "").trim() !==
      mot_de_passe
    ) {

      return {
        statusCode: 401,
        body: JSON.stringify({
          erreur:
            "Mot de passe incorrect."
        })
      };

    }

    // Connexion réussie
    return {
      statusCode: 200,
      body: JSON.stringify({

        admin: {

          id:
            data.id,

          nom:
            data.nom,

          email:
            data.email,

          role:
            data.role

        }

      })
    };

  }
  catch (e) {

    console.log("EXCEPTION =", e);

    return {
      statusCode: 500,
      body: JSON.stringify({
        erreur:
          "Erreur serveur : " +
          e.message
      })
    };

  }

};
