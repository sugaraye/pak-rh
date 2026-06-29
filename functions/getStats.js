const {
  createClient
} =
require("@supabase/supabase-js");

exports.handler =
async () => {

  try {

    const supabase =
    createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );

    const {
      count: employes
    } =
    await supabase
      .from("employes")
      .select("*", {
        count: "exact",
        head: true
      });

    const {
      count: soumis
    } =
    await supabase
      .from("employes")
      .select("*", {
        count: "exact",
        head: true
      })
      .eq(
        "statut",
        "Soumis"
      );

    const {
      count: valides
    } =
    await supabase
      .from("employes")
      .select("*", {
        count: "exact",
        head: true
      })
      .eq(
        "statut",
        "Validé RH"
      );

    const {
      count: incomplets
    } =
    await supabase
      .from("employes")
      .select("*", {
        count: "exact",
        head: true
      })
      .lt(
        "progression",
        100
      );

    return {
      statusCode: 200,
      body:
      JSON.stringify({
        employes,
        soumis,
        valides,
        incomplets
      })
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
