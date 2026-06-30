const { createClient } =
require("@supabase/supabase-js");

exports.handler = async (event) => {

  try {

    // Vérification des variables d'environnement
    if (
      !process.env.SUPABASE_URL ||
      !process.env.SUPABASE_SERVICE_KEY
    ) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          erreur:
            "Variables SUPABASE_URL ou SUPABASE_SERVICE_KEY manquantes."
        })
      };
    }

    console.log(
      "SUPABASE_URL =",
      process.env.SUPABASE_URL
    );

    const supabase =
      createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_SERVICE_KEY
      );

    const body =
      JSON.parse(event.body || "{}");

    const email =
      (body.email || "")
        .trim()
        .toLowerCase();

    const mot_de_passe =
      (body.mot_de_passe || "")
        .trim();

    console.log("EMAIL RECU =", email);

    // Lecture de tous les administrateurs
    const {
      data: tous,
      error: errTous
    } = await supabase
      .from("administrateurs")
      .select(
        "id,nom,email,actif"
      );

    console.log(
      "NOMBRE ADMINS =",
      tous?.length || 0
    );

    console.log(
      "LISTE ADMINS =",
      JSON.stringify(tous)
    );

    console.log(
      "ERREUR TOUS =",
      errTous
    );

    // Recherche de l'email
    const {
      data,
      error
    } = await supabase
      .from("administrateurs")
      .select("*")
      .ilike("email", email)
      .single();

    console.log(
      "ADMIN TROUVE =",
      JSON.stringify(data)
    );

    console.log(
      "ERREUR ADMIN =",
      error
    );

    // Email introuvable
    if (error || !data) {

      return {
        statusCode: 401,
        body: JSON.stringify({
          erreur:
            "Adresse email inconnue."
        })
      };

    }

    // Compte désactivé
    if (!data.actif) {

      return {
        statusCode: 403,
        body: JSON.stringify({
          erreur:
            "Compte RH désactivé."
        })
      };

    }

    // Mot de passe incorrect
    if (
      (data.mot_de_passe || "")
        .trim() !==
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

    console.log(
      "CONNEXION RH OK :",
      data.email
    );

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

    console.log(
      "EXCEPTION =",
      e
    );

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
