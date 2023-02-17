// funcoes auxiliares ou uteis
const seleciona = (elemento) => document.querySelector(elemento)
const selecionaTodos = (elemento) => document.querySelectorAll(elemento)

const abrirModal = () => {
    seleciona('.esfihaWindowArea').style.opacity = 0
    seleciona('.esfihaWindowArea').style.display = 'flex'
    setTimeout(() => {
        seleciona('.esfihaWindowArea').style.opacity = 1
    }, 150)
}

const fecharModal = () => {
    seleciona('.esfihaWindowArea').style.opacity = 0
    setTimeout(() => {
        seleciona('.esfihaWindowArea').style.display = 'none'
    }, 500)
}

const botoesFechar = () => {
    
    
    // BOTOES FECHAR MODAL
    selecionaTodos('.esfihaInfo--cancelButton, .esfihaInfo--cancelMobileButton').forEach((item) => {
        item.addEventListener('click', fecharModal)
    })
}

const preencheDadosDasEsfihas = (esfihaItem, item) => {
    esfihaItem.querySelector('.esfiha-item--img img').src = item.img
    esfihaItem.querySelector('.esfiha-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    esfihaItem.querySelector('.esfiha-item--name').innerHTML = item.name
    esfihaItem.querySelector('.esfiha-item--desc').innerHTML = item.description
}

const preencheDadosModal = (item) => {
    
    seleciona('.esfihaBig img').src = item.img
    seleciona('.esfihaInfo h1').innerHTML = item.name
    seleciona('.esfihaInfo--desc').innerHTML = item.description
    seleciona('.esfihaInfo--actualPrice').innerHTML = `R$ ${item.price.toFixed(2)}`
}

// MAPEAR esfihaJson para gerar lista de esfihas
esfihaJson.map((item, index ) => {
    //console.log(item)
    let esfihaItem = document.querySelector('.models .esfiha-item').cloneNode(true)
    
    seleciona('.esfiha-area').append(esfihaItem)

    // preencher os dados de cada esfiha
    preencheDadosDasEsfihas(esfihaItem, item)
    
    // pizza clicada
    esfihaItem.querySelector('.esfiha-item a').addEventListener('click', (e) => {
        e.preventDefault()
        console.log('Clicou na esfiha')

        // abrir janela modal
        
        abrirModal()

        // preenchimento dos dados
        preencheDadosModal(item)

    })

    botoesFechar()

}) // fim do MAPEAR pizzaJson para gerar lista de esfihas
