// Vérification de la connexion
const employe =
JSON.parse(
localStorage.getItem("employe")
);

if (!employe) {
    window.location.href =
    "login.html";
}

// Pré-remplissage des champs
document.getElementById("nom").value =
employe.nom || "";

document.getElementById("prenom").value =
employe.prenom || "";

document.getElementById("telephone").value =
employe.telephone || "";

document.getElementById("email").value =
employe.email || "";

// Affichage de la progression existante
let progression =
employe.progression || 0;

if (document.getElementById("barre")) {

    document
    .getElementById("barre")
    .style.width =
    progression + "%";

}

if (document.getElementById("pourcentage")) {

    document
    .getElementById("pourcentage")
    .innerHTML =
    progression + "% complété";

}

// Activation éventuelle du bouton Suivant
if (
    progression >= 20 &&
    document.getElementById("btnSuivant")
) {
    document
    .getElementById("btnSuivant")
    .classList
    .remove("disabled");
}

// Enregistrement du formulaire
document
.getElementById("personForm")
.addEventListener(
"submit",
async (e) => {

    e.preventDefault();

    const data = {

        id:
        employe.id,

        nom:
        document
        .getElementById("nom")
        .value
        .trim(),

        prenom:
        document
        .getElementById("prenom")
        .value
        .trim(),

        sexe:
        document
        .getElementById("sexe")
        .value,

        date_naissance:
        document
        .getElementById("date_naissance")
        .value,

        lieu_naissance:
        document
        .getElementById("lieu_naissance")
        .value
        .trim(),

        nationalite:
        document
        .getElementById("nationalite")
        .value
        .trim(),

        telephone:
        document
        .getElementById("telephone")
        .value
        .trim(),

        email:
        document
        .getElementById("email")
        .value
        .trim(),

        adresse:
        document
        .getElementById("adresse")
        .value
        .trim(),

        ville:
        document
        .getElementById("ville")
        .value
        .trim(),

        situation_familiale:
        document
        .getElementById(
            "situation_familiale"
        )
        .value,

        nombre_enfants:
        document
        .getElementById(
            "nombre_enfants"
        )
        .value

    };

    try {

        const response =
        await fetch(
            "/.netlify/functions/savePersonal",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                    "application/json"
                },
                body:
                JSON.stringify(data)
            }
        );

        const result =
        await response.json();

        if (!response.ok) {
            throw new Error(
                result.erreur ||
                "Erreur d'enregistrement."
            );
        }

        // Mise à jour des données locales
        employe.nom =
        data.nom;

        employe.prenom =
        data.prenom;

        employe.telephone =
        data.telephone;

        employe.email =
        data.email;

        // Progression
        employe.progression =
        Math.max(
            employe.progression || 0,
            20
        );

        localStorage.setItem(
            "employe",
            JSON.stringify(employe)
        );

        // Mise à jour de la barre
        if (
            document.getElementById(
                "barre"
            )
        ) {
            document
            .getElementById("barre")
            .style.width =
            "20%";
        }

        if (
            document.getElementById(
                "pourcentage"
            )
        ) {
            document
            .getElementById(
                "pourcentage"
            )
            .innerHTML =
            "20 % complété";
        }

        // Activation du bouton suivant
        if (
            document.getElementById(
                "btnSuivant"
            )
        ) {
            document
            .getElementById(
                "btnSuivant"
            )
            .classList
            .remove(
                "disabled"
            );
        }

        // Message
        document
        .getElementById(
            "message"
        )
        .innerHTML = `
            <div class="success">
                ✅ Informations personnelles enregistrées avec succès.<br><br>
                Vous pouvez maintenant passer à l'étape suivante.
            </div>
        `;

    }
    catch (e) {

        document
        .getElementById(
            "message"
        )
        .innerHTML = `
            <div style="
                color:#b91c1c;
                background:#fef2f2;
                padding:15px;
                border-radius:10px;
                margin-top:20px;
            ">
                ${e.message}
            </div>
        `;

    }

});
