const query = document.querySelector('#gifToSearch')
const nbr = document.querySelector('select')
const wrapper = document.querySelector('.wrapper')
const button = document.querySelector('#button')

function generate() {
    fetch(`https://api.edamam.com/api/recipes/v2?type=public&beta=true&q=${query.value}&app_id=edda156a&app_key=2e7e02af906bc64f498bda713fd1ff1a`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        wrapper.innerHTML= "";
        data.hits.forEach(function(oneImage){
          wrapper.innerHTML += `<h3><a href="${oneImage.recipe.url}" target="_blank">${oneImage.recipe.label}</a></h3>`;
          // Ajoute une classe parente qui contiendra la div image et la div recipe
          const parentDiv = document.createElement("div");
          parentDiv.className = "image-ingredients"; 

          // Crée la div pour l'image
          const imageDiv = document.createElement("div");
          imageDiv.className = "image";
          imageDiv.innerHTML = `<img src="${oneImage.recipe.images.REGULAR.url}" alt="photo recette">`;

          // Crée la div pour les ingrédients
            const ingredientsDiv = document.createElement("ul");
            ingredientsDiv.className = "ingredients";

            // En considérant que les ingrédients sont stockés dans un tableau d'objets dans la section 'recipe'
            oneImage.recipe.ingredientLines.forEach(function(oneIngredient){
              const ingredientElement = document.createElement("li");
              ingredientElement.textContent = oneIngredient;
              ingredientsDiv.appendChild(ingredientElement);
            })
            const instructionsElement = document.createElement("div")
            instructionsElement.className = "instructions";
            instructionsElement.textContent = oneImage.recipe.instructions;
            // Ajoute imageDiv & ingredientsDiv au wrapper
            parentDiv.appendChild(imageDiv);
            parentDiv.appendChild(ingredientsDiv);
            parentDiv.appendChild(instructionsElement);

            // Ajoute la div parente au conteneur principal (wrapper)
            wrapper.appendChild(parentDiv);

        })
      })
      .catch(error => {console.log("Erreur lors de la récup des données :", error);
    })
}

query.addEventListener('keypress', function(event) {
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("button").click();
  }
}); 

button.addEventListener('click', function(){
    generate()
})

