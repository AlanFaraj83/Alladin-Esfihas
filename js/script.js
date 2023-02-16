esfihaJson.map((item, index ) => {
    //console.log(item)
    let esfihaItem = document.querySelector('.models .esfiha-item').cloneNode(true)
    //console.log(esfihaItem)
    document.querySelector('.esfiha-area').append(esfihaItem) 

    // preencher os dados de cada pizza
    esfihaItem.querySelector('.esfiha-item--img img').src = item.img
    esfihaItem.querySelector('.esfiha-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    esfihaItem.querySelector('.esfiha-item--name').innerHTML = item.name
    esfihaItem.querySelector('.esfiha-item--desc').innerHTML = item.description

    // Quando a esfiha for clicada
    esfihaItem.querySelector('.esfiha-item a').addEventListener('click', (e) => {
        e.preventDefault()
        console.log('clicou na esfiha')

        // Abrir janela modal
        document.querySelector('.esfihaWindowArea').style.display = 'flex'

    })

    document.querySelector('.esfihaInfo--cancelButton').addEventListener('click', () => {
        document.querySelector('.esfihaWindowArea').style.display = 'none'
    })


    document.querySelector('.esfihaInfo--cancelMobileButton').addEventListener('click', () => {
        document.querySelector('.esfihaWindowArea').style.display = 'none'
    })


})
