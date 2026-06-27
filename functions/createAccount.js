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
            "Variables Supabase manquantes."
        })
      };
    }

    // Création du client Supabase
    const supabase =
      createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_SERVICE_KEY
      );

    // Lecture du body
    const body =
      JSON.parse(event.body || "{}");

    const {
      nom,
      prenom,
      email,
      telephone,
      direction,
      service,
      poste,
      grade,
      matricule,
      dateNaissance
    } = body;

    // Vérification des champs obligatoires
    if (
      !nom ||
      !prenom ||
      !email ||
      !telephone ||
      !dateNaissance ||
      !direction ||
      !service ||
      !poste ||
      !grade
    ) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          erreur:
            "Tous les champs sont obligatoires sauf le matricule PAK."
        })
      };
    }

    // Génération du numéro
    const rpc =
      await supabase.rpc(
        "next_pak_number"
      );

    if (rpc.error) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          erreur:
            rpc.error.message
        })
      };
    }

    const numero =
      rpc.data;

    const identifiant =
      `PAK-2026-${String(numero)
        .padStart(6, "0")}`;

    const motDePasse =
      `Pak@2026-${
        Math.floor(
          1000 +
          Math.random() * 9000
        )
      }`;

    // Insertion dans la table employes
    const insertion =
      await supabase
        .from("employes")
        .insert({
          numero_dossier:
            identifiant,
          identifiant,
          mot_de_passe:
            motDePasse,
          nom,
          prenom,
          email,
          telephone,
          direction,
          service,
          poste,
          grade,
          matricule,
          date_naissance:
            dateNaissance,
          statut:
            "En cours"
        });

    if (insertion.error) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          erreur:
            insertion.error.message
        })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        identifiant,
        motDePasse
      })
    };

  } catch (e) {

    return {
      statusCode: 500,
      body: JSON.stringify({
        erreur:
          e.message
      })
    };

  }

};
