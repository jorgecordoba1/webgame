
let correctCount = 0; // Variable para contar los aciertos

function initializeButtonSet(buttonSet, buttonSetNames) {
    // Selecciona aleatoriamente un botón para el set
    let correctButton = buttonSet[Math.floor(Math.random() * buttonSet.length)];

    // Agrega un evento click a cada botón del set
    buttonSet.forEach(function (id) {
        let button = document.getElementById(id);
        button.addEventListener("click", function () {
            // Comprueba si el botón clicado es el correcto
            if (id === correctButton) {
                button.classList.add("correct");
                correctCount++; // Incrementa el contador de aciertos
                let otherButtonId = buttonSet.find(btnId => btnId !== id);
                let otherButton = document.getElementById(otherButtonId);
                otherButton.style.opacity = 0.26;
            } else {
                button.classList.add("incorrect");
                let otherButtonId = buttonSet.find(btnId => btnId !== id);
                let otherButton = document.getElementById(otherButtonId);
                otherButton.style.opacity = 0.26;
            }

            // Deshabilita los botones después de la selección
            buttonSet.forEach(function (buttonId) {
                document.getElementById(buttonId).disabled = true;
            });

            // Actualiza el contador de aciertos en pantalla
            updateCorrectCountDisplay();

        });
    });
}

function updateCorrectCountDisplay() {
    let correctCountDisplay = document.getElementById("correctCountDisplay");
    correctCountDisplay.textContent = "Correct: " + correctCount;
}

// Array con los nombres de los botones y sus correspondientes nombres completos para cada set
let buttonSets = {
    set1: { buttons: ["oneLeft", "oneRight"], names: { "oneLeft": "left", "oneRight": "right" } },
    set2: { buttons: ["twoLeft", "twoRight"], names: { "twoLeft": "left", "twoRight": "right" } },
    set3: { buttons: ["threeLeft", "threeRight"], names: { "threeLeft": "left", "threeRight": "right" } },
    set4: { buttons: ["fourLeft", "fourRight"], names: { "fourLeft": "left", "fourRight": "right" } },
    set5: { buttons: ["fiveLeft", "fiveRight"], names: { "fiveLeft": "left", "fiveRight": "right" } },
    set6: { buttons: ["sixLeft", "sixRight"], names: { "sixLeft": "left", "sixRight": "right" } },
    set7: { buttons: ["sevenLeft", "sevenRight"], names: { "sevenLeft": "left", "sevenRight": "right" } },
    set8: { buttons: ["eightLeft", "eightRight"], names: { "eightLeft": "left", "eightRight": "right" } },
    set9: { buttons: ["nineLeft", "nineRight"], names: { "nineLeft": "left", "nineRight": "right" } },
    set10: { buttons: ["tenLeft", "tenRight"], names: { "tenLeft": "left", "tenRight": "right" } },
    set11: { buttons: ["elevenLeft", "elevenRight"], names: { "elevenLeft": "left", "elevenRight": "right" } },
    set12: { buttons: ["twelveLeft", "twelveRight"], names: { "twelveLeft": "left", "twelveRight": "right" } },
    // Agrega más sets según sea necesario
};

// Agrega eventos y mensajes para cada set
for (let setName in buttonSets) {
    initializeButtonSet(buttonSets[setName].buttons, buttonSets[setName].names);
}

// Agrega un elemento para mostrar el contador de aciertos
let correctCountDisplay = document.createElement("div");
correctCountDisplay.id = "correctCountDisplay";
document.body.appendChild(correctCountDisplay);

function enviarFormulario() {
    // Obtiene los valores del formulario
    var email = document.getElementById("email").value;
    var codigo = document.getElementById("codigo").value;

    // Llama a Email.js para enviar el correo
    emailjs.send("service_vr5yf1e", "template_wauglvg", {
        to_email: email,
        codigo: codigo
    })
    .then(function(response) {
        console.log('Correo enviado con éxito', response);
        // Puedes agregar aquí un mensaje de éxito o redirigir a una página de agradecimiento
    }, function(error) {
        console.log('Error al enviar el correo', error);
        // Puedes manejar errores y mostrar un mensaje al usuario si es necesario
    });
}