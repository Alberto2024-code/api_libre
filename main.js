const catalogo= document.getElementById("catalogo")
const detalle=document.getElementById("detalles")
const buscar= document.getElementById("buscador")

fetch("https://api.attackontitanapi.com/characters")
.then(response=> response.json())
.then(data =>
    {
        data.results.forEach(personaje =>{

            const card= document.createElement("div");
            card.classList.add("card");
            card.innerHTML=`
            <h3 class ="titulo">${personaje.name}</h3>
            <img src="${personaje.img}" alt="${personaje.name}" width="150">
            <h3 class = "titan">Tipo de titan : ${personaje.alias || "sin titan"}</h3>
            <h3 class ="especie"> Especie : ${personaje.species}</h3>
            <h3 class="edad"> Edad : ${personaje.age}</h3>
            <h3 class="altura">Altura:${personaje.height}</h3>
            <h3 clas ="familia">Familia:${personaje.family}</h3>
            `;
            catalogo.appendChild(card);
        });
    })
   
/* 🔍 BUSCADOR */
buscar.addEventListener("keyup", () => {
  const texto = buscar.value.toLowerCase();
  const tarjetas = document.querySelectorAll(".card");

  tarjetas.forEach(card => {
    const nombre = card.querySelector(".titulo").textContent.toLowerCase();
    const titan = card.querySelector(".titan").textContent.toLowerCase();
    const especie = card.querySelector(".especie").textContent.toLowerCase();

    card.style.display =
      nombre.includes(texto) ||
      titan.includes(texto) ||
      especie.includes(texto)
        ? "block"
        : "none";
  });
});
