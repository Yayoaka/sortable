function popup(id){

          fetch('https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json')
  .then((response) => response.json())
  .then(data => {
          data.forEach(hero => {
                    if (id === hero.id){
                              const img = document.createElement('img')
                              img.src = hero.images.md
                              const div = document.createElement('div')
                              div.innerHTML = '<p>' + hero.name + '</p>' + '<p>' + hero.biography.fullName + '<br>' + '</p>' + '<p>Alter ego: ' + hero.biography.alterEgos+ '</p>' + '<p>Aliases: ' + hero.biography.aliases+ '</p>' + '<p>First appearance: ' + hero.biography.firstAppearence + '</p>' + '<p>Publisher: ' +hero.biography.publisher+ '</p>' + '<p>Work occupation: ' +hero.work.occupation+ '</p>' + '<p>Work base: ' +hero.work.base+ '</p>' + '<p>Group affiliation: ' +hero.connections.groupAffiliation+ '</p>' + '<p>Relatives: ' + hero.connections.relatives + '</div>'
                              div.appendChild(img)
                              const modal = document.getElementById('myModal');
                              const modalContent = document.getElementById('modal-content')
                              const closeButton = document.getElementsByClassName('close')[0]
                              modal.style.display = 'block'
                              modalContent.innerHTML = div.innerHTML
                              closeButton.onclick = function() {
                                        modal.style.display = 'none'
                                      }
                    }
          })
  })
}