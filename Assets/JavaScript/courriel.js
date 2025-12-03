(function(){
        emailjs.init("XXedkN8RipFra94s5"); // Clé publique EmailJS
    })();

    document.getElementById("contactForm").addEventListener("submit", function(event) {
        event.preventDefault();

        // Copier les valeurs dans les champs cachés pour correspondre au template
        document.getElementById("name").value = document.getElementById("nom").value;
        document.getElementById("courriel").value = document.getElementById("email").value;

        emailjs.sendForm("service_p05a4h4", "template_5apgymg", this)
            .then(() => {
                document.getElementById("formMessage").textContent = "✅ Message envoyé avec succès !";
                this.reset();
            }, (error) => {
                document.getElementById("formMessage").textContent = "❌ Erreur : " + JSON.stringify(error);
            });
    });