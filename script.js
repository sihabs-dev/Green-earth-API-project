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
let arr = [];

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
  // display trees by category
  const treesCardContainer = document.getElementById("trees-card-container");
  treesCardContainer.innerHTML = "";
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayAllPlants(data.plants);
  document.getElementById("loading-spinner").classList.add("hidden");
};

const loadAllPlants = async () => {
  document.getElementById("loading-spinner").classList.remove("hidden");
  const res = await fetch("https://openapi.programming-hero.com/api/plants");
  const data = await res.json();
  displayAllPlants(data.plants);
  document.getElementById("loading-spinner").classList.add("hidden");
};
const displayModal = async (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  const detail = data.plants;
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = "";
  modalContainer.innerHTML = `
          <div class="flex justify-between items-center">
          <h2 class="text-3xl text-green-500 font-bold">${detail.name}</h2>
          <button class="btn btn-xs btn-info btn-outline rounded-full" onclick="document.getElementById('my_modal').close()">X</button>
          </div>
          
          <div ><img class="h-56 w-full rounded-sm " src="${detail.image}" alt="" /></div>
          <p class='mt-3'>Category: <span class="p-1 text-white bg-blue-600 rounded-lg">${detail.category}<span></p>
          <p class="">${detail.description}</p>
          
          <span class="text-2xl font-bold text-green-400">$${detail.price}</span>
  `;
  document.getElementById("my_modal").showModal();
};
const addToCart = (id, nam, price) => {
  const isfind = arr.find((item) => item.id === id);
  if (isfind) {
    isfind.quantity++;
  } else {
    arr.push({
      id,
      nam,
      price,
      quantity: 1,
    });
  }

  updateCart(arr);
};

const updateCart = (array) => {
  // default
  // if (array.length !== 0) {
  //   document.getElementById("default").classList.add("hidden");
  // } else {
  //   document.getElementById("default").classList.remove("hidden");
  // }
  const parent = document.getElementById("cart");
  parent.innerHTML = "";

  if (array.length === 0) {
    document.getElementById("default").classList.remove("hidden");
    document.getElementById("total-price").textContent = "$0";
    return;
  }
  document.getElementById("default").classList.add("hidden");

  let total = 0;
  array.forEach((element) => {
    total += element.price * element.quantity;
    const card = document.createElement("div");
    card.innerHTML = `
         <div class="shadow-sm bg-blue-50 p-3 my-3.5">
            <div class="flex justify-between items-center">
              <div>
                <h2 class="text-xl font-medium">${element.nam}</h2>
                <p class="font-medium">$${element.price} × ${element.quantity}</p>
              </div>
              <p class="text-2xl cursor-pointer" onclick="removeCard(${element.id})">×</p>
            </div>
            <h3 class="text-xl text-right font-medium">$${element.price * element.quantity}</h3>
          </div>
    `;
    parent.appendChild(card);
  });
  const totalPrice = document.getElementById("total-price");
  totalPrice.innerHTML = `$${total}`;
};
const removeCard = (id) => {
  const newArr = arr.filter((item) => item.id != id);
  arr = newArr;
  updateCart(arr);
};
const displayAllPlants = (trees) => {
  const treesCardContainer = document.getElementById("trees-card-container");
  trees.forEach((tree) => {
    const createCard = document.createElement("div");
    createCard.className = "card bg-base-100 shadow-lg rounded-lg";
    createCard.innerHTML = `       
            <figure>
              <img
                class= "h-45 w-full object-cover cursor-pointer"
                src="${tree.image}"
                alt="Shoes"
                title="${tree.name}"
                onclick = "displayModal(${tree.id})"
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
                <button onclick="addToCart(${tree.id},'${tree.name}',${tree.price})" class="btn btn-success text-white text-xl">Cart</button>
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
