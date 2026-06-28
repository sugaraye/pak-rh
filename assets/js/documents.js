const employe =
JSON.parse(
localStorage.getItem("employe")
);

if (!employe) {
  window.location.href =
  "login.html";
}

document
.getElementById("envoyer")
.addEventListener(
"click",
async () => {

  try {

    const type =
    document
    .getElementById(
      "type_document"
    )
    .value;

    const fichier =
    document
    .getElementById(
      "fichier"
    )
    .files[0];

    if (!type || !fichier) {
      alert(
      "Choisissez un document."
      );
      return;
    }

    const extension =
      fichier.name
      .split(".")
      .pop();

    const nomFichier =
      `${employe.identifiant}_${Date.now()}.${extension}`;

    const chemin =
      nomFichier;

    const {
      data,
      error
    } =
    await window.supabase
      .storage
      .from(type)
      .upload(
        chemin,
        fichier,
        {
          upsert: false
        }
      );

    if (error) {
      throw error;
    }

    const {
      data: urlData
    } =
    window.supabase
      .storage
      .from(type)
      .getPublicUrl(
        chemin
      );

    const fichier_url =
      urlData.publicUrl;

    await fetch(
      "/.netlify/functions/saveDocument",
      {
        method: "POST",
        headers: {
          "Content-Type":
          "application/json"
        },
        body:
        JSON.stringify({

          employe_id:
          employe.id,

          type_document:
          type,

          nom_fichier:
          nomFichier,

          fichier_url,

          taille:
          fichier.size,

          extension

        })
      }
    );

    employe.progression =
      100;

    localStorage.setItem(
      "employe",
      JSON.stringify(
        employe
      )
    );

    alert(
      "Document enregistré."
    );

    document
      .getElementById(
        "fichier"
      )
      .value = "";

    chargerDocuments();

  }
  catch (e) {

    alert(
      e.message
    );

  }

});

chargerDocuments();

async function
chargerDocuments() {

  const response =
  await fetch(
    "/.netlify/functions/getDocuments?id="
    + employe.id
  );

  const data =
  await response.json();

  let html = "";

  data.forEach(doc => {

    html += `
      <div class="document">

      <strong>
      ${doc.type_document}
      </strong>

      <br><br>

      <a
      href="${doc.fichier_url}"
      target="_blank">

      Ouvrir

      </a>

      </div>
    `;

  });

  document
  .getElementById(
    "liste"
  )
  .innerHTML =
  html;

}
