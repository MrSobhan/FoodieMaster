
const pageTitle = "Spa سبحان";

const router = {
  404: {
    template: "../404.html",
    title: `پیدا نشد | ${pageTitle}`,
  },
  "/": {
    template: "../index.html",
    title: `Home | ${pageTitle}`,
  },
  "/serach": {
    template: "../search.html",
    title: `SearchPages | ${pageTitle}`,
  },
  "/foods": {
    template: "../foods.html",
    title: ` Foods | ${pageTitle}`,
  },
};

let result = false, input , idFoodElem;

document.addEventListener("click", (event) => {
  event.preventDefault();
  if (!event.target.className.includes("navbar-link")) {
    return false;
  }

  input = document.querySelector('.search-input').value
  if (event.target.href == 'http://127.0.0.1:8080/serach') {
    result = 'search'
  }else if (event.target.href == 'http://127.0.0.1:8080/foods') {
    result = 'foods'
    idFoodElem = event.target.id
  }
  urlRoutes(event);
});

function urlRoutes(event) {
  window.history.pushState({}, "", event.target.href);
  locationHandler();
}

async function locationHandler() {
  const loc = window.location.pathname;

  const route = router[loc] || router[404];

  const html = await fetch(route.template).then((res) => res.text());
  document.body.innerHTML = html;
  document.title = route.title;
  reload();
}

function reload() {
  if (result == 'search') {

    let $ = document

    $.querySelector('.spinner-border').hidden = false
    $.querySelector('.bage-search').innerHTML = input

    $.querySelector('.food-menu-list2').innerHTML = ''
    let i = 0;

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
      .then((res) => res.json()).then((data) => {
        $.querySelector('.spinner-border').hidden = true
        let food = data.meals;
        food.forEach((element) => {
          i++;
          $.querySelector('.food-menu-list2').insertAdjacentHTML('beforeend',
            `<li>
              <div class="food-menu-card">
  
                <div class="card-banner">
                  <img src="${element.strMealThumb}" width="300" height="300" loading="lazy"
                    alt="${element.strMeal}" class="w-100">
  
                  <div class="badge">-15%</div>
  
                  <button class="btn food-menu-btn btn-hover">Order Now</button>
                </div>
  
                <div class="wrapper">
                  <p class="category">${element.strCategory}</p>
                </div>
  
                <h3 class="h3 card-title">${element.strMeal}</h3>
  
                <div class="price-wrapper">
  
                  <p class="price-text"><i class="bi bi-cart4"></i> :</p>
  
                  <data class="price">$49.00</data>
  
                </div>
  
              </div>
            </li>`
          )
        })

        $.querySelector('.number-search').innerHTML = '+' + i

      })
  }

  if(result == 'foods'){

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idFoodElem}`)
      .then((pop) => pop.json()).then((data1) => {
        let foodelem = data1.meals;
        foodelem.map((e)=>{
          $.querySelector('.section-title').innerHTML = e.strMeal
          $.querySelector('.section-category').innerHTML = e.strCategory
          $.querySelector('.section-text').innerHTML = e.strInstructions
          $.querySelector('.cta-img').src = e.strMealThumb
        })


      })

  }
}

window.onpopstate = locationHandler;
