// Modo de entrada por defecto
let mode = 'radians'; 

// Función para establecer el modo de entrada (grados o radianes)
function setMode(selectedMode) {
    mode = selectedMode; // Cambia el modo según la selección
    
    // Cambiar el estado visual de los botones
    const btnRadians = document.getElementById('btn-radians');
    const btnDegrees = document.getElementById('btn-degrees');

    if (mode === 'radians') {
        btnRadians.classList.add('active');
        btnRadians.classList.remove('inactive');
        btnDegrees.classList.remove('active');
        btnDegrees.classList.add('inactive');
    } else {
        btnDegrees.classList.add('active');
        btnDegrees.classList.remove('inactive');
        btnRadians.classList.remove('active');
        btnRadians.classList.add('inactive');
    }

    document.getElementById('modo-actual').textContent = ` ${mode}`;
}

window.onload = function() {
    setMode(mode);
};

// Función para mostrar la derivada en un formato matemático
function mostrarDerivada(derivada) {
    // Reemplaza los '*' por un espacio en blanco
    let derivadaFormateada = derivada.replace(/\*/g, "");
    
    // Actualiza el textarea de la derivada
    document.getElementById('derivada').value = derivadaFormateada;
}

// Función para convertir expresiones a un formato válido para math.js
function parseExpression(expression) {
    // Agregar el operador de multiplicación explícitamente donde sea necesario
    return expression.replace(/(\d)([a-zA-Z])/g, '$1*$2') // Número seguido de variable o función
                     .replace(/(\))([a-zA-Z])/g, '$1*$2') // Paréntesis cerrado seguido de variable o función
                     .replace(/(\d)(\()/g, '$1*$2');      // Número seguido de paréntesis abierto
}

// Función para resolver la función por el método de la Secante
function SecantMethod() {
    // Obtener los valores de los campos de texto
    let funcion = document.getElementById("funcion").value;
    const valorInicial1 = parseFloat(document.getElementById("valorini1").value);
    const valorInicial2 = parseFloat(document.getElementById("valorini2").value);

    let x0 = valorInicial1; // Primer valor inicial
    let x1 = valorInicial2; // Segundo valor inicial
    const maxIteraciones = 10; // Número máximo de iteraciones
    const tolerancia = 0.0001; // Tolerancia para la convergencia
    let iteraciones = []; // Para almacenar las iteraciones
    let errores = []; // Para almacenar los errores

    // Parsear la función para garantizar compatibilidad
    funcion = parseExpression(funcion);

    for (let i = 0; i < maxIteraciones; i++) {
        const f_x0 = math.evaluate(funcion, { x: x0 });
        const f_x1 = math.evaluate(funcion, { x: x1 });

        // Verificar que no haya división entre cero
        if (f_x1 - f_x0 === 0) {
            console.log("División por cero, no se puede continuar.");
            return;
        }

        // Calcular el siguiente valor de x usando la fórmula de la secante
        const x2 = x1 - (f_x1 * (x1 - x0)) / (f_x1 - f_x0);

        // Almacenar iteración con 4 decimales
        iteraciones.push(`Iteración ${i + 1}: x = ${x2.toFixed(4)}`);

        // Calcular el error
        const error = Math.abs(x2 - x1);
        errores.push(error.toFixed(4)); // Almacenar error con 4 decimales

        // Verificar la convergencia
        if (error < tolerancia) {
            break;
        }

        // Actualizar x0 y x1 para la siguiente iteración
        x0 = x1;
        x1 = x2;
    }

    // Mostrar el resultado final
    document.getElementById('resultado').value = x1.toFixed(4); // Mostrar resultado final con 4 decimales
    document.getElementById('lst_Itera').value = iteraciones.join("\n"); // Mostrar iteraciones
    document.getElementById('lst_Error').value = errores.join("\n"); // Mostrar errores
}





// Función para agregar texto a la función
function agregarFuncion(texto) {
    var campoFuncion = document.getElementById('funcion');
    if (campoFuncion) {
        campoFuncion.value += texto; // Añade el texto al final del valor actual en el campo de texto
    } else {
        console.error("El campo de texto 'funcion' no existe");
    }
}

// DESCARGAR RESULTADOS
function descargarResultados() {
    const resultados = `Resultados:\n${document.getElementById("lst_Itera").value}\nErrores:\n${document.getElementById("lst_Error").value}`;
    const blob = new Blob([resultados], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "resultados.txt";
    link.click();
}

// Evento para limpiar los campos 
document.getElementById('limpiar').addEventListener('click', function() {
    // Limpiar entradas
    document.getElementById('funcion').value = '';
    // Limpiar resultados
    document.getElementById('valorini1').value = ''; 
    document.getElementById('valorini2').value = ''; 
    document.getElementById("resultado").value = '';
    document.getElementById("lst_Itera").value = '';
    document.getElementById("lst_Error").value = '';
    document.getElementById('derivada').value = ''; // Limpiar derivada
});

function toggleTrigButtons() {
    const trigButtons = document.querySelector('.trig-buttons');
    if (trigButtons.style.display === 'none' || trigButtons.style.display === '') {
        trigButtons.style.display = 'block';
    } else {
        trigButtons.style.display = 'none';
    }
}
