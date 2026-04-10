const displayCategoriesBtn = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/categories",
  );
  const data = await res.json();
  const allBtnContainer = document.getElementById("all-btn-container");
  data.categories.forEach((category) => {
    const createBtn = document.createElement("button");
    createBtn.textContent = category.category_name;
      createBtn.className = 'btn btn-outline w-full';
    allBtnContainer.appendChild(createBtn);
  });
};
displayCategoriesBtn();
