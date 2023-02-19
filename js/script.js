let modalKey = 0


let quantEsfihas = 1

let cart = []



// funcoes auxiliares ou uteis
const seleciona = (elemento) => document.querySelector(elemento)
const selecionaTodos = (elemento) => document.querySelectorAll(elemento)

const formatoReal = (valor) => {
    return valor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
}

const formatoMonetario = (valor) => {
    if(valor) {
        return valor.toFixed(2)
    }
}

const abrirModal = () => {
    seleciona('.esfihaWindowArea').style.opacity = 0
    seleciona('.esfihaWindowArea').style.display = 'flex'
    setTimeout(() => seleciona('.esfihaWindowArea').style.opacity = 1, 150)
}

const fecharModal = () => {
    seleciona('.esfihaWindowArea').style.opacity = 0
    setTimeout(() => seleciona('.esfihaWindowArea').style.display = 'none', 500)
}

const botoesFechar = () => {
    
    
    // BOTOES FECHAR MODAL
    selecionaTodos('.esfihaInfo--cancelButton, .esfihaInfo--cancelMobileButton').forEach((item) => item.addEventListener('click', fecharModal)
    )
}

const preencheDadosDasEsfihas = (esfihaItem, item, index) => {
    esfihaItem.setAttribute('data-key', index)
    esfihaItem.querySelector('.esfiha-item--img img').src = item.img
    esfihaItem.querySelector('.esfiha-item--price').innerHTML = formatoReal(item.price[2])
    esfihaItem.querySelector('.esfiha-item--name').innerHTML = item.name
    esfihaItem.querySelector('.esfiha-item--desc').innerHTML = item.description
}

const preencheDadosModal = (item) => {
    
    seleciona('.esfihaBig img').src = item.img
    seleciona('.esfihaInfo h1').innerHTML = item.name
    seleciona('.esfihaInfo--desc').innerHTML = item.description
    seleciona('.esfihaInfo--actualPrice').innerHTML = formatoReal(item.price[2])
}

const pegarkey = (e) => {

    let key = e.target.closest('.esfiha-item').getAttribute('data-key')
    console.log('esfiha clicada' + key)
    console.log(esfihaJson[key])

    quantEsfihas = 1

    modalKey = key

    return key
}

const preencherTamanhos = (key) => {
    // tira a seleção do tamanho atual e seleciona o tamanho grande
    seleciona('.esfihaInfo--size.selected').classList.remove('selected')

    selecionaTodos('.esfihaInfo--size').forEach((size, sizeIndex) => {

        (sizeIndex == 2) ? size.classList.add('selected') : ''
        size.querySelector('span').innerHTML = esfihaJson[key].sizes[sizeIndex]
    })

}

const escolherTamanhoPreco = (key) => {
    // Ações nos botões de tamanho
    // selecionar todos os tamanhos
    selecionaTodos('.esfihaInfo--size').forEach((size, sizeIndex) => {
        size.addEventListener('click', (e) =>{

            seleciona('.esfihaInfo--size.selected').classList.remove('selected')

            size.classList.add('selected')

            seleciona('.esfihaInfo--actualPrice').innerHTML = formatoReal(esfihaJson[key].price[sizeIndex])
        })
    })
}

const mudarQuantidade = () => {
    // Ações nos botões + e - da janela modal
    seleciona('.esfihaInfo--qtmais').addEventListener('click', () => {
        quantEsfihas++
        seleciona('.esfihaInfo--qt').innerHTML = quantEsfihas
    })

    seleciona('.esfihaInfo--qtmenos').addEventListener('click', () => {
        if(quantEsfihas > 1) {
            quantEsfihas--
            seleciona('.esfihaInfo--qt').innerHTML = quantEsfihas	
        }
    })
}


// MAPEAR esfihaJson para gerar lista de esfihas
esfihaJson.map((item, index ) => {
    //console.log(item)
    let esfihaItem = document.querySelector('.models .esfiha-item').cloneNode(true)
    
    seleciona('.esfiha-area').append(esfihaItem)

    // preencher os dados de cada esfiha
    preencheDadosDasEsfihas(esfihaItem, item, index)
    
    // esfiha clicada
    esfihaItem.querySelector('.esfiha-item a').addEventListener('click', (e) => {
        e.preventDefault()
        console.log('Clicou na esfiha')

        let chave = pegarkey(e)

        // abrir janela modal
        
        abrirModal()

        // preenchimento dos dados
        preencheDadosModal(item)

        preencherTamanhos(chave)

        seleciona('.esfihaInfo--qt').innerHTML = quantEsfihas

        escolherTamanhoPreco(chave)

    })

    botoesFechar()

}) // fim do MAPEAR pizzaJson para gerar lista de esfihas

mudarQuantidade()