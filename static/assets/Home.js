//this function displays the heros depending on the current page and the size of the page
function loadData(data, currentPage, pageSize){
  
  startIndex = (currentPage-1) * pageSize
  let endIndex = startIndex + pageSize

  const tbody = document.getElementById('tbody')
  tbody.innerHTML = ''

  

  for (let i = startIndex; i < endIndex; i++) {
    
    let hero = data[i]
    const row = document.createElement('tr')

    if (hero) {
      createCell(row, hero.id)
      createCell(row, hero.name)

      const heroImageURL = hero.images.xs
      const heroImage = document.createElement('img')
      heroImage.src = heroImageURL
      heroImage.id = 'mon-image'
      row.appendChild(heroImage)
      createCell(row, hero.biography.fullName)


      let powerstats = document.createElement("td")
        createCellStat(powerstats, hero.powerstats.intelligence, "intelligence")
        createCellStat(powerstats, hero.powerstats.strength, "strength")
        createCellStat(powerstats, hero.powerstats.speed, "speed")
        createCellStat(powerstats, hero.powerstats.durability, "durability")
        createCellStat(powerstats, hero.powerstats.power, "power")
        createCellStat(powerstats, hero.powerstats.combat, "combat")
      row.appendChild(powerstats)
      
      createCell(row, hero.appearance.race)
      createCell(row,hero.appearance.gender)
      createCell(row, hero.appearance.height)
      createCell(row, hero.appearance.weight)
      createCell(row, hero.biography.placeOfBirth)
      createCell(row, hero.biography.alignment)

      let button = document.createElement("button")
      button.textContent = "More infos"
      button.className = "more"
    
      button.addEventListener("click", function() {
        popup(hero.id)
      })
      row.appendChild(button)

    }
  
      tbody.appendChild(row)
      }
    
   
    endIndex = startIndex + selectorValue()
    const currentPageDisplay = document.getElementById('currentPageDisplay')
    currentPageDisplay.textContent = currentPage
}



function createCell(row, param){
  let cell = document.createElement("td")
  cell.textContent = param
  row.appendChild(cell)
}

function createCellStat(row, param, name){
let cell = document.createElement("tr")
cell.textContent = name + " : " + param 
row.appendChild(cell)
}

//this function gets the value of the selector and returns it as int value
function selectorValue(){
const selectElement = document.getElementById("select")
let selectedValue = 20
if (selectElement) {
selectedValue = selectElement.options[selectElement.selectedIndex].value
if (selectedValue == "all") {
selectedValue = 731
}
}
return parseInt(selectedValue)
}

function launchSearch(inputSearch) {
 return inputSearch
}

function filterResults(data, searchKey, searchTerm) {
  const filteredHeroes = data.filter(hero => {
      let searchElement
      switch(searchKey) {
          case "name":
              searchElement = hero.name.toLowerCase();
              break
          case "fullname":
              searchElement = hero.biography.fullName ? hero.biography.fullName.toLowerCase() : ''
              break
          case "race":
              searchElement = hero.appearance.race ? hero.appearance.race.toLowerCase() : ''
              break
          case "gender":
              searchElement = hero.appearance.gender ? hero.appearance.gender.toLowerCase() : ''
              break
          case "birth":
              searchElement = hero.biography.placeOfBirth.toLowerCase();
              break
          case "align":
              searchElement = hero.biography.alignment.toLowerCase();
              break
      }
      return searchElement.includes(searchTerm)
  })
  return filteredHeroes
}

// extrait les parametre de l'url
function getParameters() {
  var urlParams, match, pl = "/+/g" // Regex les symboles par des espaces
  search = /([^&=]+)=?([^&]*)/g,
  decode = function (s) { return decodeURIComponent(s.replace(pl, )); },
  query = window.location.search.substring(1)
  urlParams = {}
  while (match = search.exec(query))
  urlParams[decode(match[1])] = decode(match[2])
  return urlParams
}


//gets the api datas
//listens to the event on the page (buttons and selector)
//modify the data displayed accordingly to the user clicks
fetch('https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json')
  .then((response) => response.json())
  .then(data => {
    let currentPage = 1
    let pageSize = selectorValue()

    let order = 'name'
    let orderDir = 'descending'


    const pageDiv = document.querySelectorAll('.pages')
    const buttonNext = document.querySelector('.button-next')
    const buttonPrevious = document.querySelector('.button-previous')
    const buttonLastNext = document.querySelector('.button-last-next')
    const buttonLastPrevious = document.querySelector('.button-last-previous')
    const select = document.querySelector('#select')



    const hero_id = document.getElementById('hero_id')
    if (hero_id){
    hero_id.addEventListener('input', event => {
      const searchKey = document.getElementById('term_key').value
      console.log(searchKey)
      const searchTerm = event.target.value.toLowerCase()
      const filteredHeroes = filterResults(data, searchKey, searchTerm)
      // remplace l'url du navigateur
      window.history.replaceState(null, null, "?key="+searchKey+"&q="+searchTerm)
      loadData(filteredHeroes, 1, pageSize)
    })
  }


  const orderHeaders = document.querySelectorAll('.header-sort')

  orderHeaders.forEach(lien => {
    lien.addEventListener('click', (event) => {
      // Code à exécuter lorsque le lien est cliqué

      let specialValue = "zzz"

      if (orderDir == "ascending") {
        if (order == lien.textContent) {
          orderDir = "descending"
          specialValue = ""
        }
      } else {
        orderDir = "ascending"
      }
      order = lien.textContent
      // console.log("titre cliqué : " + order)

      
    let nomA, nomB
    // modification du mode de tri du tableau de données
    data.sort((a, b) => {
      switch (order) {
        case "ID":
          // console.log(a.id + " diff " + b.id)
          nomA = a.id
          nomB = b.id
          break;
        case "Name":
          nomA = a.name.toUpperCase()
          nomB = b.name.toUpperCase()
          break
          case "Full name":
            nomA = a.biography.fullName.toUpperCase()
            nomB = b.biography.fullName.toUpperCase()
            if(nomA=="") { nomA = specialValue }
            if(nomB=="") { nomB = specialValue }
        break
        case "Powerstats":
          nomA = a.powerstats.intelligence + a.powerstats.strength + a.powerstats.speed + a.powerstats.durability + a.powerstats.power + a.powerstats.combat
          nomB = b.powerstats.intelligence + b.powerstats.strength + b.powerstats.speed + b.powerstats.durability + b.powerstats.power + b.powerstats.combat
          break;
        case "Race":
          nomA = a.appearance.race ? a.appearance.race.toLowerCase() : ''
          nomB = b.appearance.race ? b.appearance.race.toLowerCase() : ''
          if(nomA=="") { nomA = specialValue }
          if(nomB=="") { nomB = specialValue }
        break
        case "Gender":
          nomA = a.appearance.gender ? a.appearance.gender.toLowerCase() : ''
          nomB = b.appearance.gender ? b.appearance.gender.toLowerCase() : ''
          if(nomA=="-") { nomA = specialValue }
          if(nomB=="-") { nomB = specialValue }
        break
        case "Height":
          nomA = parseInt(a.appearance.height[1])
              if ( typeof(a.appearance.height[1]) != 'undefined' && a.appearance.height[1].includes('meters') ) {
                nomA *= 100
              }
              nomB = parseInt(b.appearance.height[1])
              if ( typeof(b.appearance.height[1]) != 'undefined' && b.appearance.height[1].includes('meters') ) {
                nomB *= 100
              }
        break
          case "Weight":
            nomA = parseInt(a.appearance.weight[1].replace(/\D/g, ''))
            if (a.appearance.weight[1].includes('tons')) {
              nomA *= 1000
            }
            nomB = parseInt(b.appearance.weight[1].replace(/\D/g, ''))
            if (b.appearance.weight[1].includes('tons')) {
              nomB *= 1000;
            }
            break
        case "Place of birth":
          nomA = a.biography.placeOfBirth.toUpperCase()
          nomB = b.biography.placeOfBirth.toUpperCase()
          if(nomA=="-") { nomA = specialValue }
          if(nomB=="-") { nomB = specialValue }
        break
        case "Alignement":
          nomA = a.biography.alignment.toUpperCase()
          nomB = b.biography.alignment.toUpperCase()
          if(nomA=="-") { nomA = specialValue }
          if(nomB=="-") { nomB = specialValue }
        break
      }
      let result = 0
      if (nomA < nomB) result = -1
      if (nomA > nomB) result = 1
      // Inverser l'ordre si la direction est "desc"
      if (orderDir === "descending") result *= -1
      return result
    })
      event.preventDefault() // Empêche la page de se recharger lors du clic sur le lien
      // console.log('Le lien a été cliqué')

      loadData(data, currentPage, pageSize)
      console.log(data)
    })
  })
  

    pageDiv.forEach.call(pageDiv, function() {
      if (select) {
        select.addEventListener('change', () => {
        currentPage = 1
        pageSize = selectorValue()
        loadData(data, currentPage, pageSize)
        })
      }

      if (buttonNext) {
        buttonNext.addEventListener("click", function() {
          if (currentPage < Math.ceil(data.length / selectorValue()) ){
            currentPage++
            endIndex = startIndex + selectorValue()
            loadData(data, currentPage, pageSize)
          }
        })
      }

      if (buttonPrevious){
        buttonPrevious.addEventListener("click", function() {
          if (currentPage > 1){
            currentPage--
            pageSize = selectorValue()
            loadData(data, currentPage, pageSize)
          }
      })
      }

      if (buttonLastNext){
        buttonLastNext.addEventListener("click", function() {
        currentPage=Math.ceil(data.length / selectorValue())
        endIndex = startIndex + selectorValue()
        loadData(data, currentPage, pageSize)
        })
      }

      if (buttonLastPrevious){
        buttonLastPrevious.addEventListener("click", function() {
        currentPage=1
        pageSize = selectorValue()
        
        loadData(data, currentPage, pageSize)
      })
      }
    

      
    })
    // init recherche selon les parametre de l'uri
    const tabparams = getParameters()
    console.log(tabparams)
    
    if (tabparams['key'] && tabparams['q']) {
      document.getElementById('term_key').value = tabparams['key']
      document.getElementById('hero_id').value = tabparams['q']
      const filterHeroes = filterResults(data, tabparams['key'], tabparams['q'])
      loadData(filterHeroes, 1, pageSize)
    } else {
      loadData(data, currentPage, pageSize)
    }

})

