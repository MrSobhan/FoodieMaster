
//----------------------------------------------------------------------------


const $ = document

$.querySelectorAll('.filter-btn').forEach((e) => {
  e.addEventListener('click', (btn) => {
    $.querySelectorAll('.filter-btn').forEach((w) => {
      if (w.className.includes('active')) {
        w.classList.remove('active')
      }
    })

    btn.target.classList.add('active')


    let value = btn.target.innerHTML


    fetchData(value)



  })

})


function fetchData(value) {
  $.querySelector('.spinner-border').hidden = false

  let fetchType = (value == 'All') ? 'https://www.themealdb.com/api/json/v1/1/search.php?f=a' : `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`


  $.querySelector('.food-menu-list').innerHTML = ''
  let i = 0;

  fetch(fetchType)
    .then((res) => res.json())
    .then((data) => {
      $.querySelector('.spinner-border').hidden = true
      const food = data.meals;
      food.forEach((element) => {
        i++;
        let foodId = element.idMeal;
        let foodName = element.strMeal;
        let foodImg = element.strMealThumb;
        let foodCategory = element.strCategory;
        //const foodArea = element.strArea;
        // const foodInstructions = element.strInstructions;
        if (i <= 9) {
          $.querySelector('.food-menu-list').insertAdjacentHTML('beforeend',
            `<li>
            <div class="food-menu-card">

              <div class="card-banner">
                <img src="${foodImg}" width="300" height="300" loading="lazy"
                  alt="${foodName}" class="w-100">

                <div class="badge">-15%</div>


                <a class="btn food-menu-btn btn-hover navbar-link" href="/foods" id="${foodId}">Order Now</a>
              </div>

              <div class="wrapper">
                <p class="category">${foodCategory}</p>
              </div>

              <h3 class="h3 card-title">${foodName}</h3>

              <div class="price-wrapper">

                <p class="price-text"><i class="bi bi-cart4"></i> :</p>

                <data class="price">$49.00</data>

              </div>

            </div>
          </li>`
          )
        }



      })

    })
}

fetchData('All')


//Arry Person

const ArryPerson = [
  {
    id: 1,
    name: 'Ahmad',
    profile: './assets/images/avatar-1.jpg',
    job: 'CEO Kingfisher',
    text: '"I would be lost without restaurant. I would like to personally thank you for your outstanding product."',
    star: 4
  },
  {
    id: 2,
    name: 'Sobhan',
    profile: './assets/images/avatar-2.jpg',
    job: 'CEO Kingfisher',
    text: '"I would be lost without restaurant. I would like to personally thank you for your outstanding product."',
    star: 5
  },
  {
    id: 3,
    name: 'Erfan',
    profile: './assets/images/avatar-3.jpg',
    job: 'CEO Kingfisher',
    text: '"I would be lost without restaurant. I would like to personally thank you for your outstanding product."',
    star: 4
  },
  {
    id: 4,
    name: 'Mohammad',
    profile: './assets/images/avatar-2.jpg',
    job: 'CEO Kingfisher',
    text: '"I would be lost without restaurant. I would like to personally thank you for your outstanding product."',
    star: 3
  },
  {
    id: 5,
    name: 'Mani',
    profile: './assets/images/avatar-1.jpg',
    job: 'CEO Kingfisher',
    text: '"I would be lost without restaurant. I would like to personally thank you for your outstanding product."',
    star: 2
  },
]

ArryPerson.forEach((men) => {
  $.querySelector('.img-testi').insertAdjacentHTML('beforeend',
    `<figure class="avatar">
  <img src="${men.profile}" width="80" height="80" loading="lazy" alt="${men.name}" class="img-targrt">
  </figure>`
  )
})

$.querySelectorAll('.img-targrt').forEach((img) => {
  img.addEventListener('click', (i) => {
    ArryPerson.forEach(element => {
      if (i.target.alt == element.name) {
        $.querySelector('.profile').src = element.profile
        $.querySelector('.testi-name').innerHTML = element.name
        $.querySelector('.testi-title').innerHTML = element.job
        $.querySelector('.testi-text').innerHTML = element.text
        $.querySelector('.rating-wrapper').innerHTML = ''
        for (let index = 1; index <= element.star; index++) {
          $.querySelector('.rating-wrapper').innerHTML += '<ion-icon name="star"></ion-icon>'
        }
      }
    });
  })
})


