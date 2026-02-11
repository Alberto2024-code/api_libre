function agregar() {

  const nombre = document.getElementById("titulo").value;
  const titan = document.getElementById("titan").value;
  const especie = document.getElementById("especie").value;
  const edad = document.getElementById("edad").value;
  const familia = document.getElementById("familia").value;
  const mensaje = document.getElementById("mensaje-exito");

  // Validación
  if (!nombre || !especie || !edad) {
    alert("Completa los campos obligatorios");
    return;
  }

  // Objeto personaje (misma lógica que el catálogo)
  const personaje = {
    name: nombre,
    alias: titan,
    species: especie,
    age: edad,
    family: familia
  };

  // 🔁 Simulación de envío (NO se guarda en la API real)
  fetch("https://api.attackontitanapi.com/characters", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(personaje)
  })
  .then(res => res.json())
  .then(data => {

    mensaje.style.display = "block";
    mensaje.innerHTML = `
      <strong>Personaje agregado (simulación)</strong><br>
      Nombre: ${personaje.name}<br>
      Titán: ${personaje.alias || "Sin titán"}<br>
      Especie: ${personaje.species}
    `;

    // Limpiar formulario
    document.getElementById("titulo").value = "";
    document.getElementById("titan").value = "";
    document.getElementById("especie").value = "";
    document.getElementById("edad").value = "";
    document.getElementById("familia").value = "";

    // Redirigir al catálogo
    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);
  })
  .catch(error => {
    console.error("Error:", error);
    mensaje.innerHTML = "Error al agregar personaje";
  });
}

