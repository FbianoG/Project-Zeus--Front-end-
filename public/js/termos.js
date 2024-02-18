// Variáveis
let files
let list = document.querySelectorAll('.list-card')[0]
let searchInput = document.querySelector('#search-input')

const URLBack = "https://project-zeus-ten.vercel.app"


document.querySelectorAll('nav')[0].addEventListener('mouseleave', (e) => { // Criar transition ao tirar mouse do menu lateral (para evitar problemas no carregamento)
    e.target.style.transition = '400ms'
})
searchInput.addEventListener('keyup', filterForName) // Filtra "lista de documentos" pelo valor do "input"




// Funções

function createList(e) { // Cria e gera "card de documentos"
    console.log(e);
    list.innerHTML = ''
    e.forEach(element => {
        let newDoc = document.createElement('div') // Cria HTML dos "cards de documentos"
        newDoc.classList = `card ${element.type}`
        newDoc.innerHTML = createCardHtml(element)
        list.appendChild(newDoc)
    })
}

function filterForName() { // Filtra "lista de documentos" pelo valor do "input"
    let findDoc = files.filter(element =>{
        return element.name.toLowerCase().includes(searchInput.value.toLowerCase())
    })
    console.log(findDoc)
    createList(findDoc)
}

function createCardHtml(e) {  // Cria HTML dos "cards de documentos"
    const html = `
        <p class="card-termo">${e.name}</p>
        <p class="card-categoria" id="card-${e.category}">${e.category}</p> 
        <a href="../pdf/${e.src}" target='_blank' class="card-pdf"><i class="fa-solid fa-file-pdf"></i></a>
    `
    return html
}




// Chamadas
async function getDocs() {
    const api = await fetch(`${URLBack}/getDocs`)
    const data = await api.json()
    files = data
    createList(files) // Cria e gera "card de documentos"}
}

getDocs()
