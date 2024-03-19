
// establece la hora que mas alatante se va utilizar para guardar el historial
function hora() {
  let fechaActual = new Date();

  let dia = fechaActual.getDate();
  let mes = fechaActual.getMonth() +1;
  let año = fechaActual.getFullYear(); 
  let hora = fechaActual.getHours();
  let minutos = fechaActual.getMinutes();

  let StringDia = String (dia);
  let StringMes = String (mes)
  let StringAño = String (año);
  let StringHora = String  (hora);
  let StringMinutos = String (minutos);
  let DiayHora = ("dia " + StringDia + " "+ "mes " + StringMes + " " + "año" +  " " + StringAño + " hora " + StringHora + ":" + StringMinutos );

  return DiayHora;
}





// Declara formula2 fuera del evento DOMContentLoaded, mirar el final del codigo 
// esto se activa cuando le das al boton enviar 
function formula2() {
  // Accede a los elementos del DOM
  let Peso = document.getElementById("peso");
  let Altura = document.getElementById("altura");
  let Resultado = document.getElementById("resultado");
  let caja_de_la_respuesta = document.getElementById("respuesta") 
  

  // Accede al valor de los campos y conviértelos a números
  let pesoValue = Number(Peso.value);
  let alturaValue = Number(Altura.value);

  // Realiza el cálculo de la fórmula
  let Resulformula = pesoValue / Math.pow(alturaValue, 2);

  if (isNaN(Resulformula) || Resulformula < 0) {
      Resultado.textContent = "introduce valores válidos";
  } else {

      
      Resultado.textContent = "Tu índice de masa corporal es: " + Resulformula.toFixed(2);
      localStorage.setItem('resultadoIMC', Resulformula.toFixed(2));

      caja_de_la_respuesta.innerHTML = "<p>Peso: " + pesoValue + "</p>" +
                                          "<p>Altura: " + alturaValue + "</p>" +
                                          "<p>IMC: " + Resulformula.toFixed(2) + "</p>" +
                                          "<p>Fecha: " + hora() + "</p>";

  
}

  
// guarda el historial con los datos del usuario
  const usuario = {
    "peso": pesoValue,
    "altura": alturaValue,
    "resultadoIMC": Resulformula.toFixed(2),
    "fecha" : hora()
  };

  const revision = JSON.parse(localStorage.getItem('usuario')) || [];
  revision.push(usuario); 
  localStorage.setItem('usuario', JSON.stringify(revision));  

  console.log(usuario);

  resultados_IMC(Resulformula.toFixed(2));
  
  
}





function resultados_IMC (Resulformula) {
 
    const DivRespuesta = document.getElementById("respuesta");
    const DivdietaVolumen = document.getElementById("DietaVolumen");
    const DivdietaDefinicion = document.getElementById("DietaDefinición");

    if (Resulformula < 18.5){
      DivdietaVolumen.classList.add("DivVolumen");
      escribir_div_volumen ();
      DivRespuesta.classList.add("DivRespuesta");
      
    }
   if (Resulformula > 18.5 && Resulformula < 24.9){
      DivdietaVolumen.classList.add("DivVolumen");
      escribir_div_volumen ();
      DivRespuesta.classList.add("DivRespuesta");
    }
    if (Resulformula > 25 && Resulformula < 29.9){
      DivdietaDefinicion.classList.add("DivDefinicion");
      escribir_div_definicion ();
      DivRespuesta.classList.add("DivRespuesta");
    }
    if (Resulformula > 30 ){
      DivdietaDefinicion.classList.add("DivDefinicion");
      escribir_div_definicion ();
      DivRespuesta.classList.add("DivRespuesta");
    }


}



function recuperar_historial() {
  const resultadoIMC = localStorage.getItem('resultadoIMC');
  const historial = JSON.parse(localStorage.getItem('usuario')) || [];
  const respuestaDiv = document.getElementById('respuesta');

  // Limpiar contenido previo del div respuesta
  respuestaDiv.innerHTML = '';

  // Agregar resultadoIMC al div respuesta
  if (resultadoIMC) {
    respuestaDiv.innerHTML += "<p>Último IMC: " + resultadoIMC + "</p>";
  }

  // Agregar historial al div respuesta
  if (historial.length > 0) {
    respuestaDiv.innerHTML += '<h2>Historial:</h2>';
    historial.forEach(function(entry) {
      respuestaDiv.innerHTML += "<p>Peso: " + entry.peso + ", Altura: " + entry.altura + ", IMC: " + entry.resultadoIMC + ", Fecha: " + entry.fecha + "</p>";
      respuestaDiv.classList.add("DivRespuesta");
    });
  }

  
}
function escribir_div_volumen () {
  document.getElementById("DietaVolumen").innerHTML = "<h2> Dieta de volumen </h2>";
  document.getElementById("DietaVolumen").innerHTML += "<p> Nuestra intención es que ingieras más calorías de las que quemas.</p>";
  document.getElementById("DietaVolumen").innerHTML += "<p> Tenemos muchas formas de hacer esto, pero en nuestro caso vamos a elegir comidas bajas en grasas.</p>";
  document.getElementById("DietaVolumen").innerHTML += "<p> Desayuno: 300 gr de avena, 3 huevos enteros, 1 200 g de cereales, 1 fruta y 1 vaso de leche.</p>";
  document.getElementById("DietaVolumen").innerHTML += "<p> Comida: 300 gr de macarrones </p>";
  document.getElementById("DietaVolumen").innerHTML += "<p> Merienda: 100 gr de arroz, 1 lata de atún y 1 fruta </p>";
  document.getElementById("DietaVolumen").innerHTML += "<p> Cena: 300 gr de pollo, 300 g de arroz y 1 fruta </p>";
  document.getElementById("DietaVolumen").innerHTML += "<img src='cabos.jpg' alt='Dieta de Volumen'>";
}

function escribir_div_definicion () {
  document.getElementById("DietaDefinición").innerHTML = "<h2> Dieta de definición </h2>";
  document.getElementById("DietaDefinición").innerHTML += "<p> Nuestra intención es que quemes más calorías de las que ingieres.</p>";
  document.getElementById("DietaDefinición").innerHTML += "<p> Tenemos muchas formas de hacer esto, pero en nuestro caso vamos a elegir comidas bajas en grasas.</p>";
  document.getElementById("DietaDefinición").innerHTML += "<p> Desayuno: 100 gr de avena, 1 huevo entero, 1 fruta y 1 vaso de leche.</p>";
  document.getElementById("DietaDefinición").innerHTML += "<p> Comida: 200 g de carne, 100 g de arroz integral y 400 g de ensalada.</p>";
  document.getElementById("DietaDefinición").innerHTML += "<p> Cena: 200 g de pollo, 100 g de patata hervida y 400 g de espinacas.</p>";
  document.getElementById("DietaVolumen").innerHTML += "<img src='frutas.jpg' alt='Dieta de Volumen'>";
}





// con esto obligo al código a cargarse completamente, esto debido a los errores de carga que he experimentado 
// durante el desarrollo del código
document.addEventListener('DOMContentLoaded', function() {
  // Llama a formula2 dentro del evento DOMContentLoaded
  formula2();
});
