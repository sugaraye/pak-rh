const form = document.getElementById("loginForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    message.style.display = "none";
    message.innerHTML = "";

    const body = {
        email: document
            .getElementById("email")
            .value
            .trim()
            .toLowerCase(),

        mot_de_passe: document
            .getElementById("password")
            .value
    };

    try {

        const response =
            await fetch(
                "/.netlify/functions/adminLogin",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            );

        const result =
            await response.json();

        if (!response.ok) {
            throw new Error(
                result.erreur ||
                "Erreur de connexion."
            );
        }

        localStorage.setItem(
            "admin",
            JSON.stringify(result.admin)
        );

        window.location.href =
            "admin-dashboard.html";

    }
    catch (e) {

        message.style.display =
            "block";

        message.innerHTML =
            e.message;
    }
});
