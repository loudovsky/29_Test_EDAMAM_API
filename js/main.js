const query = document.querySelector('#gifToSearch')
const nbr = document.querySelector('select')
const wrapper = document.querySelector('.wrapper')
const button = document.querySelector('#button')

function generate() {
    fetch(`https://api.edamam.com/api/recipes/v2?type=public&beta=false&q=${query.value}&app_id=edda156a&app_key=2e7e02af906bc64f498bda713fd1ff1a`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        wrapper.innerHTML= "";
        data.hits.forEach(function(oneImage){
            wrapper.innerHTML += `<div class="image"><h3>${oneImage.recipe.label}</h3><img src="${oneImage.recipe.images.THUMBNAIL.url}" alt="gif de ouf"></div>`
        })
      })
      .catch(error => {console.log("Erreur lors de la récup des données :", error);
    })
}

button.addEventListener('click', function(){
    generate()
})

nbr.addEventListener('change', function(){
    generate()
})