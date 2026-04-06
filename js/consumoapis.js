// --- FUNCIÓN 1: FETCH ---
function traerConsejoFetch() {
  var cajaFetch = document.getElementById("fetch-result");
  cajaFetch.innerText = "Cargando con Fetch...";

  fetch("https://api.adviceslip.com/advice")
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      // Mostramos el resultado de Fetch
      cajaFetch.innerHTML =
        "<strong>Fetch dice:</strong> <br>" + datos.slip.advice;
    })
    .catch(function (error) {
      cajaFetch.innerText = "Error en Fetch";
    });
}

// --- FUNCIÓN 2: XHR ---
function traerConsejoXHR() {
  var cajaXHR = document.getElementById("xhr-result");
  cajaXHR.innerText = "Cargando con XHR...";

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.adviceslip.com/advice", true);

  xhr.onreadystatechange = function () {
    // 4 = Completado, 200 = OK
    if (xhr.readyState == 4 && xhr.status == 200) {
      var datos = JSON.parse(xhr.responseText);
      cajaXHR.innerHTML = "<strong>XHR dice:</strong> <br>" + datos.slip.advice;
    } else if (xhr.readyState == 4) {
      cajaXHR.innerText = "Error en XHR";
    }
  };

  xhr.send();
}

// --- FUNCIÓN 3: JQUERY ---
function traerConsejoJQuery() {
  var cajaJQuery = $("#jquery-result"); // Usamos el selector de jQuery ($)
  cajaJQuery.text("Cargando con jQuery...");

  $.ajax({
    url: "https://api.adviceslip.com/advice",
    type: "GET",
    success: function (datos) {
      // jQuery ya convirtió la respuesta a objeto, no hace falta parsear
      var respuesta = JSON.parse(datos); // Solo si la API devuelve texto plano
      // En esta API específica, a veces hay que parsear manualmente:
      if (typeof datos === "string") datos = JSON.parse(datos);

      cajaJQuery.html("<strong>jQuery dice:</strong> <br>" + datos.slip.advice);
    },
    error: function () {
      cajaJQuery.text("Error en jQuery");
    },
  });
}
