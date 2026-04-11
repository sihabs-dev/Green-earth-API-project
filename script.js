const displayCategoriesBtn = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/categories",
  );
  const data = await res.json();
  const allBtnContainer = document.getElementById("all-btn-container");
  data.categories.forEach((category) => {
    const createBtn = document.createElement("button");
    createBtn.textContent = category.category_name;
    createBtn.className = "btn btn-outline w-full remove";
    createBtn.onclick = () => {
      displayTreesByCategory(category.id, createBtn);
    };
    allBtnContainer.appendChild(createBtn);
  });
};

const displayTreesByCategory = async (id, btn) => {
  document.getElementById("loading-spinner").classList.remove("hidden");
  // manage  Active
  const allBtn = document.querySelectorAll("#all-btn-container button");
  allBtn.forEach((button) => {
    button.classList.remove("btn-primary");
    button.classList.add("btn-outline");
  });
  btn.classList.add("btn-primary");
  btn.classList.remove("btn-outline");
  // manage active end

  const treesCardContainer = document.getElementById("trees-card-container");
  treesCardContainer.innerHTML = "";
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  data.plants.forEach((tree) => {
    const createCard = document.createElement("div");
    createCard.className = "card bg-base-100 shadow-lg rounded-lg";
    createCard.innerHTML = `       
            <figure>
              <img
                class= "h-45 w-full object-cover"
                src="${tree.image}"
                alt="Shoes"
                title="${tree.name}"
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title">${tree.name}</h2>
              <p class="line-clamp-2">
                ${tree.description}
              </p>
              <div class="badge badge-outline badge-success">${tree.category}</div>
              <div class="card-actions justify-between items-center">
                <h3 class="text-3xl font-bold text-green-500">$${tree.price}</h3>
                <button class="btn btn-success text-white text-xl">Cart</button>
              </div>
            </div>
          `;
    treesCardContainer.appendChild(createCard);
  });
  document.getElementById("loading-spinner").classList.add("hidden");
};

const loadAllPlants = async () => {
  document.getElementById("loading-spinner").classList.remove("hidden");
  const res = await fetch("https://openapi.programming-hero.com/api/plants");
  const data = await res.json();
  displayAllPlants(data.plants);
  document.getElementById("loading-spinner").classList.add("hidden");
};

const displayAllPlants = (trees) => {
  const treesCardContainer = document.getElementById("trees-card-container");
  trees.forEach((tree) => {
    const createCard = document.createElement("div");
    createCard.className = "card bg-base-100 shadow-lg rounded-lg";
    createCard.innerHTML = `       
            <figure>
              <img
                class= "h-45 w-full object-cover"
                src="${tree.image}"
                alt="Shoes"
                title="${tree.name}"
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title">${tree.name}</h2>
              <p class="line-clamp-2">
                ${tree.description}
              </p>
              <div class="badge badge-outline badge-success">${tree.category}</div>
              <div class="card-actions justify-between items-center">
                <h3 class="text-3xl font-bold text-green-500">$${tree.price}</h3>
                <button class="btn btn-success text-white text-xl">Cart</button>
              </div>
            </div>
          `;
    treesCardContainer.appendChild(createCard);
  });
};
const allTreesBtn = () => {
  const allTreesBtn = document.getElementById("all-trees");
  allTreesBtn.addEventListener("click", () => {
    const treesCardContainer = document.getElementById("trees-card-container");
    treesCardContainer.innerHTML = "";
    // manage active 
    const allBtn = document.querySelectorAll("#all-btn-container button");
    allBtn.forEach((button) => {
      button.classList.remove("btn-primary");
      button.classList.add("btn-outline");
    });
    allTreesBtn.classList.add("btn-primary");
    allTreesBtn.classList.remove("btn-outline");
    // manage active end
    loadAllPlants();
  });
};
loadAllPlants();
displayCategoriesBtn();
allTreesBtn();
