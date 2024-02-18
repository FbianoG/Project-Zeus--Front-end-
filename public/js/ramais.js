// Viriáveis //
let searchInput = document.querySelector('#search-input')
let listaRamais = document.querySelectorAll('.ramais-card')[0]
let title = document.querySelectorAll('h2')[0]
let Ramais = []

const URLBack = "https://project-zeus-ten.vercel.app"

Ramais.forEach(element => {
  element.Setor = element.Setor.toLowerCase()
})


// Eventos //

document.querySelectorAll('nav')[0].addEventListener('mouseleave', (e) => { // Cria style.transiton no Menu
  e.target.style.transition = '400ms'
})
searchInput.addEventListener('keyup', filterForSetor) // Pesquisar setor pelo valor do"input"



//Funções //

async function getRamais() { // Pegar dados vindo do DataBase 
  const api = await fetch(`${URLBack}/getRamais`)
  const data = await api.json()
  gerar(data)
}

function gerar(e) {
  let oderedRamais = orderRamais(e) // Ordena "lista de ramais" por ordem alfabética
  listaRamais.innerHTML = ""
  oderedRamais.forEach(element => {
    let newCardRamal = document.createElement('li')
    newCardRamal.classList = "card"
    newCardRamal.innerHTML = cardRamalHtml(element) // cria o "HTML" do "ramal"
    listaRamais.appendChild(newCardRamal)
  })
}

function cardRamalHtml(e) { // cria o "HTML" do "ramal"
  const html = `
    <p class="card-setor">${e.setor}</p>
    <p class="card-ramal">${e.ramal}</p>`
  return html
}

function orderRamais(e) { // Ordena "lista de ramais" por ordem alfabética
  return Array.from(e).sort((a, b) => {
    return a.setor.localeCompare(b.setor)
  })
}

function filterForSetor() { // Pesquisar setor pelo valor do"input"
  let filter = Ramais.filter(ramal => {
    return ramal["Setor"].includes(searchInput.value.toLowerCase())
  })
  gerar(filter)
}



// Chamadas //

getRamais() // Pegar dados vindo do DataBase