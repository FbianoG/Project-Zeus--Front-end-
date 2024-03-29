let planos 
const URLBack = "https://project-zeus-ten.vercel.app"

async function getPlans() {
    const api = await fetch(`${URLBack}/getPlans`)
    const data = await api.json()
    planos = [...data]
    console.log(planos)
    setTimeout(loadAll , 0);

}


getPlans()

// loadAll()

function loadAll() {

    // Variáveis

    let list = document.querySelector('#lista')
    let searchInput = document.querySelector('#search-input')



    // Eventos

    document.querySelectorAll('nav')[0].addEventListener('mouseleave', (e) => { // Criar transition ao tirar mouse do menu lateral (para evitar problemas no carregamento)
        e.target.style.transition = '400ms'
    })
    list.addEventListener('click', coppyEvent) // Copia "login" ou "senha"
    list.addEventListener('click', openDeepData) // Cria e abre as "informações adicionais" dos planos
    searchInput.addEventListener('keyup', filterForName) // Pesquisa "plano" pelo valor do "input"




    // Funções

    function createCardPlan(planos) { // Cria e gera os "cards dos planos"
        list.innerHTML = ''
        planos.forEach(element => {
            let newCardPlan = document.createElement('div') // Cria o HTML dos "cards dos planos"
            newCardPlan.className = 'card'
            newCardPlan.innerHTML = createCardHtml(element)
            list.appendChild(newCardPlan)
        });
    }

    function createCardHtml(e) { // Cria o HTML dos "cards dos planos"
        const html = `
        <h2>${e.name}</h2>
        <label>User: </label>
        <p class='user'>${e.login}</p>
        <label>Senha: </label>
        <p class='password'>${e.password}</p>
        <div class="data">
            <a class='file'><i class="fa-solid fa-folder-open"></i></a>
            <a href="${e.web}" target="_blank"><i class="fa-solid fa-globe"></i></a>
        </div>
    `
        return html
    }

    function openDeepData(e) { // Cria e abre as "informações adicionais" dos planos
        let eventFather = e.target.parentElement
        if (eventFather.classList.value == "file") {
            let alvo = eventFather.parentElement.parentElement.querySelectorAll('h2')[0]
            let findTarget = planos.find(element => {
                return element.name == alvo.textContent.toLowerCase()
            })
            if (findTarget) {
                let deepDataCard = document.querySelectorAll('.deep')[0]
                let newCardPlan = document.createElement('div')
                newCardPlan.className = 'dados'
                newCardPlan.innerHTML = createCardPlanHtml(findTarget)
                deepDataCard.appendChild(newCardPlan)
                deepDataCard.style.opacity = '1'
                deepDataCard.style.zIndex = '10'
                document.querySelector('#exit').addEventListener('click', (ex) => {
                    ex.target.parentElement.parentElement.remove()
                    deepDataCard.style.opacity = '0'
                    deepDataCard.style.zIndex = '-1'
                })
            }
            else {
                console.log('Nenhum plano foi encontrado!')
            }
        }
        else {
            return
        }
    }

    function createCardPlanHtml(e) { // Cria HTML das "informações adicionais" dos planos
        const html = `
            <h1>${e.name.toUpperCase()}</h1>
            <br><br>
            <p><b>Código de prestador:</b> ${e.data.cod}</p>
            <br>
            <p><b>Telefone:</b> ${e.data.tel}</p>
            <p><b>Email:</b> ${e.data.email}</p>
            <br>
            <p><b>Autorização:</b> ${e.data.att}</p>
            <p><b>Senha:</b> ${e.data.senha}</p>
            <p><b>Guia:</b> ${e.data.guia}</p><br>
            <p><b>Obs:</b> ${e.data.obs}</p>
            <span><i class="fa-solid fa-arrow-right-from-bracket" id='exit'></i></span>
        `
        return html
    }

    function coppyEvent(e) { // Copia "login" ou "senha"
        const target = e.target;
        if (target.classList.value == 'user' || target.classList.value == 'password') {
            let popup = document.querySelectorAll('.popup')[0]
            let copiado = document.querySelector('#copiado')
            navigator.clipboard.writeText(target.textContent)
            copiado.innerText = `"${target.textContent}"`
            popup.style.bottom = '20px'
            popup.style.transition = '600ms'
            popup.style.opacity = '1'
            setTimeout(hidden, 3500)
            function hidden() {
                popup.style.bottom = '-100px'
                popup.style.transition = '600ms'
                popup.style.opacity = '0'
            }
        }
    }

    function filterForName() { // Pesquisa "plano" pelo valor do "input"
        let filterPlanos = planos.filter(element => {
            return element.name.toLowerCase().includes(searchInput.value.toLowerCase())
        })
        createCardPlan(filterPlanos)
    }



    // Chamados

    createCardPlan(planos) // Cria e gera os "cards dos planos"
}