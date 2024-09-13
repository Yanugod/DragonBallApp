const searchBar = document.getElementById("searchBar");
let characterContainer = document.querySelector(".characterContainer");

let getCharacters = async (name = "") => {
  let url = `https://dragonball-api.com/api/characters/`;

  if (name) {
    url += `?name=${name}`;
  }

  try {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    let data = await res.json();

    if (Array.isArray(data)) {
      displayCharacter(data);
    } else {
      characterContainer.innerHTML = "No characters found.";
    }
  } catch (error) {
    characterContainer.innerHTML = "Error fetching characters.";
  }
};

let displayCharacter = (characters) => {
  characterContainer.innerHTML = "";

  characters.forEach((e) => {
    let card = document.createElement("div");
    card.classList.add("Characters");
    card.innerHTML = `
        <img src="${e.image}" alt="#" class="imgTest">
        <span>${e.name}</span>
        <span>Ki: ${e.ki}</span>
        <span>Race: ${e.race}</span>
        <span>Affiliation: ${e.affiliation}</span>
      `;
    characterContainer.appendChild(card);
  });
};

getCharacters();

searchBar.addEventListener("keyup", (e) => {
  // Fetch characters based on search input
  getCharacters(e.target.value);
});
