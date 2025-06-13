//Ready for instructor review.
const tabs = document.querySelectorAll(".nav-tabs li");
const loader = document.getElementById("loader");
const grid = document.getElementById("recipeGrid");

const API = (category) =>
  `https://forkify-api.herokuapp.com/api/search?q=${category}`;

const activateTab = (selected) => {
  tabs.forEach((tab) => tab.classList.remove("active"));
  selected.classList.add("active");
};

const toggleLoader = (visible) => {
  loader.classList.toggle("hidden", !visible);
};

const createCard = ({ image_url, title, publisher, source_url }) => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img src="${image_url}" alt="${title}">
    <div class="content">
      <h3>${title}</h3>
      <p>By: ${publisher}</p>
      <a href="${source_url}" target="_blank">Read more</a>
    </div>
  `;
  return card;
};

const loadRecipes = async (category) => {
  toggleLoader(true);
  try {
    const response = await fetch(API(category));
    const { recipes } = await response.json();
    grid.innerHTML = "";
    recipes.forEach((recipe) => grid.appendChild(createCard(recipe)));
  } catch (err) {
    grid.innerHTML = '<p style="text-align:center">Failed to load recipes.</p>';
  } finally {
    toggleLoader(false);
  }
};

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const category = tab.getAttribute("data-category");
    activateTab(tab);
    loadRecipes(category);
  });
});
