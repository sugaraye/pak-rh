document
.getElementById("createForm")
.addEventListener(
"submit",
async function (e) {

  e.preventDefault();

  const body = {
    nom:
      document.getElementById("nom").value.trim(),

    prenom:
      document.getElementById("prenom").value.trim(),

    email:
      document.getElementById("email").value.trim(),

    telephone:
      document.getElementById("telephone").value.trim(),

    direction:
      document.getElementById("direction").value.trim(),

    service:
      document.getElementById("service").value.trim(),

    poste:
      document.getElementById("poste").value.trim(),

    grade:
      document.getElementById("grade").value.trim(),

    matricule:
      document.getElementById("matricule").value.trim(),

    dateNaissance:
      document.getElementById("dateNaissance").value
  };

  console.log(body);

  const response =
    await fetch(
      "/.netlify/functions/createAccount",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json"
        },
        body:
          JSON.stringify(body)
      }
    );

  const data =
    await response.json();

  if (!response.ok) {
    document.getElementById(
      "resultat"
    ).innerHTML = `
      <div style="color:red">
        ${data.erreur}
      </div>
    `;
    return;
  }

  document.getElementById(
    "resultat"
  ).innerHTML = `
    <h2>Compte créé</h2>

    <p>
      Identifiant :
      <b>${data.identifiant}</b>
    </p>

    <p>
      Mot de passe :
      <b>${data.motDePasse}</b>
    </p>

    <p>
      Conservez ces informations.
    </p>
  `;
});
