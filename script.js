
let correctCount = 0; // Variable para contar los aciertos
let totalSetsPlayed = 0; // Variable para contar los sets jugados
let correctCountDisplay = document.getElementById("correctCountDisplay");
let totalSetsPlayedDisplay = document.getElementById("totalSetsPlayedDisplay");

let numberInput = document.getElementById("number");
numberInput.disabled = true;
numberInput.style.display = "none";

let emailInput = document.getElementById("email");
emailInput.style.display = "none";

let sendButton = document.getElementById("sendButton")
sendButton.style.display = "none";
sendButton.disabled = true;

correctCountDisplay.textContent = "Puntos: 0";
totalSetsPlayedDisplay.textContent = "Total Sets Played: 0";

function updateTotalSetsPlayedDisplay() {
    totalSetsPlayedDisplay.textContent = "Total Sets Played: " + totalSetsPlayed;
}


function initializeButtonSet(buttonSet, buttonSetNames) {
    
    // Selecciona aleatoriamente un botón para el set
    let correctButton = buttonSet[Math.floor(Math.random() * buttonSet.length)];
    console.log(correctButton);
    // Agrega un evento click a cada botón del set
    buttonSet.forEach(function (id) {
        
        let button = document.getElementById(id);
        button.addEventListener("click", function () {
            
            // Incrementa el contador de sets jugados
            totalSetsPlayed++;

            // Actualiza el contador de sets jugados en pantalla
            updateTotalSetsPlayedDisplay();

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
    correctCountDisplay.textContent = "Puntos: " + correctCount;
    
    if (correctCount < 9 && totalSetsPlayed === 12) {
        document.querySelector(".intentar").style.display = "block"
    } else if (correctCount === 9 && totalSetsPlayed === 10 || correctCount === 10 && totalSetsPlayed === 10) /*|| correctCount === 11 && totalSetsPlayed === 12 || correctCount === 12 && totalSetsPlayed === 12)*/ {
        generateRandomCode(); // Generar el código aleatorio
        document.querySelector(".felicitaciones").style.display = "block"
        sendButton.style.display = "none";
        emailInput.style.display = "none";
        numberInput.style.display = "none";
    }
}


function generateRandomCode() {
    // Obtener el elemento span donde se mostrará el código
    let randomIdNumberSpan = document.getElementById("randomIdNumber");

     // Generar las dos primeras cifras según el número de aciertos
     let code = "";
     if (correctCount == 9) {
        code = "90";
    } else if (correctCount == 10) {
        code = "10";
    } /*else if (correctCount == 11) {
        code = "11";
    } else if (correctCount == 12) {
        code = "12";
     }*/

    // Obtener la fecha actual
    let currentDate = new Date();

    // Obtener el día actual como cadena con dos dígitos
    let day = currentDate.getDate().toString().padStart(2, '0');

    // Agregar las dos siguientes cifras (día)
    code += day;

    // Generar las dos últimas cifras aleatorias
    let randomDigits = Math.floor(Math.random() * 100).toString().padStart(2, '0');

    // Agregar las dos últimas cifras aleatorias
    code += randomDigits;

    emailInput.disabled = false;
    
     // Agrega un evento de escucha para el campo de correo electrónico
    emailInput.addEventListener("input", function () {
    // Valida el formato del correo electrónico
    let isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
    
    // Habilita o deshabilita el botón "Send" en función de la validez del correo electrónico
    sendButton.disabled = false;
}); 
    
    numberInput.value = code;
    
    
    // Mostrar el código generado en el span
    randomIdNumberSpan.textContent = code;
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

function enviarFormulario() {
    // Obtiene los valores del formulario
    var email = document.getElementById("email").value;
    var number = document.getElementById("number").value;

    // Llama a Email.js para enviar el correo
    emailjs.send("service_vr5yf1e", "template_wauglvg", {
        to_email: email,
        number: number
    })
    .then(function(response) {
        ducument.getElementById("mensaje1").style.display = "block";
        // Puedes agregar aquí un mensaje de éxito o redirigir a una página de agradecimiento
    }, function(error) {
        console.log('Error al enviar el correo', error);
        // Puedes manejar errores y mostrar un mensaje al usuario si es necesario
    });
};

sendButton.addEventListener("click", function(){
    document.getElementById("email").value = "";
    document.getElementById("number").value = "";
});
