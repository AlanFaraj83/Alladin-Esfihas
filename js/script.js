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

const adicionarNoCarrinho = () => {
    seleciona('.esfihaInfo--addButton').addEventListener('click', () => {
        console.log('Adicionar no carrinho')

        console.log("Esfiha " + modalKey)

        let size = seleciona('.esfihaInfo--size.selected').getAttribute('data-key')
        console.log("Tamanho " + size)

        console.log("Quant. " + quantEsfihas)

        let price = seleciona('.esfihaInfo--actualPrice').innerHTML.replace('R$&nbsp;', '')


        let identificador = esfihaJson[modalKey].id+'t'+size

        let key = cart.findIndex( (item) => item.identificador == identificador)
        console.log(key)

        if(key > -1) {
            cart[key].qt += quantEsfihas
        } else {

            let esfiha = {
                identificador,
                id:esfihaJson[modalKey].id,
                size,
                qt: quantEsfihas,
                price: parseFloat(price)
                
            }
            cart.push(esfiha)
            console.log(esfiha)
            console.log('Sub total R$' + (esfiha.qt * esfiha.price).toFixed(2))
        }

        fecharModal()
        abrirCarrinho()
        atualizarCarrinho()
    })
}

const abrirCarrinho = () => {
    console.log('Qtd de itens no carrinho ' + cart.length)
    if(cart.length > 0) {
        //mostrar o carrinho
        seleciona('aside').classList.add('show')
        seleciona('header').style.display = 'flex' //mostra barra superior
    }

    //exibir aside do carrinho no modo mobile
    seleciona('.menu-openner').addEventListener('click', () => {
        if(cart.length > 0) {
            seleciona('aside').classList.add('show')
            seleciona('aside').style.left = '0'
        }
    })

}

const fecharCarrinho = () => {
    // fechar o carrinho com o botão X no modo mobile
    seleciona('.menu-closer').addEventListener('click', () => {
        seleciona('aside').style.left = '100vw' // usando 100vw ele ficará fora da tela
        seleciona('header').style.display = 'flex'
    })
}

const atualizarCarrinho = () => {
    // exibir número de itens no carrinho
    seleciona('.menu-openner span').innerHTML = cart.length

    // mostrar ou nao o carrinho
    if(cart.length > 0) {

        //mostrar o carrinho
        seleciona('aside').classList.add('show')

        // zerar meu .cart para não fazer insercoes duplicadas
        seleciona('.cart').innerHTML = ''

        // crie as variaveis antes do for
        let subtotal = 0
        let desconto = 0
        let total    = 0

        // para preencher os itens do carrinho, calcular subtotal
        for(let i in cart) {
            // use o find para pegar o item por id
            let esfihaItem = esfihaJson.find((item) => item.id == cart[i].id)
            console.log(esfihaItem)

            // em cada item pegar o subtotal
            subtotal += cart[i].price * cart[i].qt
            //console.log(cart[i].price)

            // fazer o clone, exibir na telas e depois preencher as informações
            let cartItem = seleciona('.models .cart--item').cloneNode(true)
            seleciona('.cart').append(cartItem)

            let esfihaSizeName = cart[i].size
            let esfihaName = `${esfihaItem.name} (${esfihaSizeName})`

            // preencher as informações
            cartItem.querySelector('img').src = esfihaItem.img
            cartItem.querySelector('.cart--item-nome').innerHTML = esfihaName
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt

            // selecionar botoes + e -
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () =>{
                console.log('Clicou no botão mais')
                // adicionar apenas a quantidade que esta neste assunto
                cart[i].qt++
                // atualizar a quantidade
                atualizarCarrinho()
            })

            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () =>{
                console.log('clicou no botão menos')
                if(cart[i].qt > 1) {
                    // subtrair apenas a quantidade que esta neste assunto
                    cart[i].qt--
                } else {
                    // remover se for zero
                    cart.splice(i, 1)
                }

                (cart.length < 1) ? seleciona('header').style.display = 'flex': ''

                // atualizar a quantidade
                atualizarCarrinho()
            })

            seleciona('.cart').append(cartItem)

        } // fim do for

        // fora do for
        //calcular o desconto 10% e total
        //desconto = subtotal * 0.1
        desconto = subtotal * 0
        total = subtotal - desconto

        // exibir na tela os resultados
       //  selecionar o ultimo span do elemento
       seleciona('.subtotal span:last-child').innerHTML = formatoReal(subtotal)
       seleciona('.desconto span:last-child').innerHTML = formatoReal(desconto)
       seleciona('.total span:last-child').innerHTML    = formatoReal(total)

    } else {
        // ocultar o carrinho
        seleciona('aside').classList.remove('show')
        seleciona('aside').style.left = '100vw'
    }
}

const finalizarCompra = () => {
    seleciona('.cart--finalizar').addEventListener('click', () => {
        console.log('finalizar compra')
        seleciona('aside').classList.remove('show')
        seleciona('aside').style.left = '100vw'
        seleciona('header').style.display = 'flex'
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

adicionarNoCarrinho()
atualizarCarrinho()
fecharCarrinho()
finalizarCompra()
