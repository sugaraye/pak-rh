// Vérification de la connexion
const employe =
JSON.parse(
    localStorage.getItem("employe")
);

if (!employe) {
    window.location.href =
    "login.html";
}

// Vérification de l'étape précédente
if (
    (employe.progression || 0) < 60
) {
    alert(
        "Veuillez d'abord compléter vos expériences professionnelles."
    );

    window.location.href =
    "dashboard.html";
}

// Chargement des diplômes existants
chargerDiplomes();

// Ajout d'un diplôme
document
.getElementById("diplomeForm")
.addEventListener(
"submit",
async (e)=>{

    e.preventDefault();

    const body = {

        employe_id:
        employe.id,

        diplome:
        document
        .getElementById(
            "diplome"
        )
        .value
        .trim(),

        specialite:
        document
        .getElementById(
            "specialite"
        )
        .value
        .trim(),

        etablissement:
        document
        .getElementById(
            "etablissement"
        )
        .value
        .trim(),

        pays:
        document
        .getElementById(
            "pays"
        )
        .value
        .trim(),

        annee:
        document
        .getElementById(
            "annee"
        )
        .value,

        mention:
        document
        .getElementById(
            "mention"
        )
        .value
        .trim()

    };

    try {

        const response =
        await fetch(
            "/.netlify/functions/addDiplome",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                    "application/json"
                },
                body:
                JSON.stringify(
                    body
                )
            }
        );

        const result =
        await response.json();

        if (!response.ok) {
            throw new Error(
                result.message ||
                "Erreur d'enregistrement."
            );
        }

        // Mise à jour de la progression
        employe.progression =
        Math.max(
            employe.progression || 0,
            80
        );

        localStorage.setItem(
            "employe",
            JSON.stringify(
                employe
            )
        );

        // Réinitialisation du formulaire
        document
        .getElementById(
            "diplomeForm"
        )
        .reset();

        // Message
        alert(
            "Diplôme enregistré avec succès."
        );

        // Rechargement de la liste
        chargerDiplomes();

    }
    catch (e) {

        alert(
            e.message
        );

    }

});


// Chargement de la liste
async function
chargerDiplomes(){

    try {

        const response =
        await fetch(
            "/.netlify/functions/getDiplomes?id="
            + employe.id
        );

        const data =
        await response.json();

        let html = "";

        data.forEach(d => {

            html += `
            <div class="item">

                <h3>
                    ${d.diplome}
                </h3>

                <p>
                    ${d.specialite || ""}
                </p>

                <p>
                    ${d.etablissement}
                </p>

                <p>
                    ${d.annee}
                </p>

                <button
                    class="supprimer"
                    onclick="supprimer(${d.id})">

                    Supprimer

                </button>

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
    catch {

        document
        .getElementById(
            "liste"
        )
        .innerHTML =
        "<p>Aucun diplôme enregistré.</p>";

    }

}


// Suppression
async function
supprimer(id){

    if (
        !confirm(
            "Supprimer ce diplôme ?"
        )
    ) {
        return;
    }

    try {

        await fetch(
            "/.netlify/functions/deleteDiplome",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                    "application/json"
                },
                body:
                JSON.stringify({
                    id
                })
            }
        );

        chargerDiplomes();

    }
    catch {

        alert(
            "Impossible de supprimer le diplôme."
        );

    }

}
