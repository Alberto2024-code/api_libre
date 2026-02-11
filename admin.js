// OBTENER ID DESDE LA URL
const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

let limiteAPI = 0;
let personajes = [];


// CARGAR PERSONAJE
const cargarPersonaje = () => {
  if (!id) return;

  fetch("https://api.attackontitanapi.com/characters")
    .then(res => res.json())
    .then(data => {
      const local = JSON.parse(localStorage.getItem("personajesExtra")) || [];

      limiteAPI = data.results.length;
      personajes = [...data.results, ...local];

      const personaje = personajes[id];
      if (!personaje) return;

      document.getElementById("name").value = personaje.name || "";
      document.getElementById("img").value = personaje.img || "";
      document.getElementById("alias").value = personaje.alias || "";
      document.getElementById("species").value = personaje.species || "";
      document.getElementById("age").value = personaje.age || "";
      document.getElementById("height").value = personaje.height || "";
      document.getElementById("family").value = personaje.family || "";
    })
    .catch(err => console.error("Error al cargar personaje:", err));
};


// EDITAR PERSONAJE (SIMULADO)
const editarPersonaje = () => {
  const cajaMensaje = document.getElementById("mensaje-exito");

  // No permitir editar personajes de la API
  if (id < limiteAPI) {
    alert("Este personaje proviene de la API y no puede editarse.");
    return;
  }

  const personajeActualizado = {
    name: document.getElementById("name").value,
    img: document.getElementById("img").value,
    alias: document.getElementById("alias").value,
    species: document.getElementById("species").value,
    age: document.getElementById("age").value,
    height: document.getElementById("height").value,
    family: document.getElementById("family").value
  };

  // Validación básica
  if (!personajeActualizado.name || !personajeActualizado.species) {
    alert("Complete los campos obligatorios.");
    return;
  }

  // Actualizar arreglo
  personajes[id] = personajeActualizado;

  // Guardar SOLO simulados
  const extras = personajes.slice(limiteAPI);
  localStorage.setItem("personajesExtra", JSON.stringify(extras));

  cajaMensaje.style.display = "block";
  cajaMensaje.innerHTML = `
    <strong>¡Personaje actualizado!</strong><br>
    Nombre: ${personajeActualizado.name}<br>
    <small>
      Nota: Esta es una simulación. Los cambios se guardan en localStorage.
    </small>
  `;

  setTimeout(() => {
    window.location.href = "admin.html";
  }, 2000);
};


// INICIO
cargarPersonaje();

