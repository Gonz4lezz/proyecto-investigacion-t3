// Funcion que utiliza metodo AJAX

function ajaxFunction() {
    var http = new XMLHttpRequest();

    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("ajax-section").innerHTML = this.responseText;
        }
    };
    http.open("GET", "ajax_info.txt", true);
    http.send();
}

// Funcion que utiliza metod AJAX + Callback

function callbackFunction(callback) {
    var http = new XMLHttpRequest();
    var URL = "http://127.0.0.1:5500/callback.html"

    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("callback-section").innerHTML = this.responseText;

            setTimeout(() => {
                callback();
            }, 5000);
        }
    };
    http.open("GET", URL, true);
    http.send();
}

document.getElementById("btnCargar").addEventListener("click", function () {
    callbackFunction(function () {
        alert("¿La información fue útil?");
    });
});


// Funcion que utiliza Promesas

document.getElementById("btnBuscar").addEventListener("click", function () {
    const breedId = document.getElementById("breedId").value;
    const estado = document.getElementById("estado");
    const resultado = document.getElementById("resultado");

    estado.textContent = "Estado: pendiente...";
    resultado.innerHTML = "";

    let promesa = new Promise(function (resolve, reject) {
        fetch(`https://dogapi.dog/api/v2/breeds/${breedId}`)
            .then(response => {
                if (!response.ok) {
                    reject(new Error("Error en la petición"));
                } else {
                    return response.json();
                }
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });

    promesa
        .then(data => {
            estado.textContent = "Estado: resuelta ";

            const breed = data.data.attributes;

            resultado.innerHTML = `
                <p><strong>Nombre:</strong> ${breed.name}</p>
                <p><strong>Descripción:</strong> ${breed.description}</p>
                <p><strong>Vida:</strong> ${breed.life.min} - ${breed.life.max} años</p>
            `;
        })
        .catch(error => {
            estado.textContent = "Estado: rechazada ";
            resultado.innerHTML = `<p>${error.message}</p>`;
        });
});

/*
IDs disponibles para buscar razas de perro:
036feed0-da8a-42c9-ab9a-57449b530b13
dd9362cc-52e0-462d-b856-fccdcf24b140
1460844f-841c-4de8-b788-271aa4d63224

Documentacion de la api: dogapi.dog
*/


// Funcion que utiliza Async y Await

async function obtenerDolarCO() {
  try {
    const response = await fetch("https://co.dolarapi.com/v1/cotizaciones/usd");

    if (!response.ok) {
      throw new Error("Error en la API");
    }

    const data = await response.json();
    return data;

  } catch (error) {
    throw error;
  }
}


document.getElementById("btnCotizarDolar").addEventListener("click", async function () {
  const estado = document.getElementById("estadoDolar");
  const resultado = document.getElementById("resultadoDolar");

  estado.textContent = "Estado: pendiente...";
  resultado.innerHTML = "";

  try {
    const data = await obtenerDolarCO();


    estado.textContent = "Estado: resuelta ";

    resultado.innerHTML = `
      <p><strong>Moneda:</strong> ${data.moneda}</p>
      <p><strong>Compra:</strong> ${data.compra}</p>
      <p><strong>Venta:</strong> ${data.venta}</p>
      <p><strong>Actualizado:</strong> ${data.fechaActualizacion}</p>
    `;

  } catch (error) {
  
    estado.textContent = "Estado: rechazada ";
    resultado.innerHTML = `<p>${error.message}</p>`;
  }
});


