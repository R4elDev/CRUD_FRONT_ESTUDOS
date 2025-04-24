'use strict'

import { getContatos, getContatosPorNome} from "./contato.js"


function criarCard (contato){
    const container = document.getElementById('container')
    const card = document.createElement('div')
    card.classList.add('card-contato')

    // Usar o innerHTML quando não está no html ou seja, está sendo criado aqui
    card.innerHTML = ` 
        <img src="${contato.foto}" alt="">
        <h2>${contato.nome}</h2>
        <p>${contato.celular}</p>
    `

    container.appendChild(card)
    // Usar o innerHTML após inserir no HTML é um problema para a segurança do seu site
}

async function exibirContatos(){
    const contatos = await getContatos()
    
    contatos.forEach(criarCard)
}

async function exibirPesquisa(evento) {
    if(evento.key == "Enter"){
        const contatos = await getContatosPorNome(evento.target.value)
        
        const container = document.getElementById('container')
        container.replaceChildren('')
        contatos.forEach(criarCard)
    }
}

exibirContatos()

document.getElementById('pesquisar').addEventListener('keydown',exibirPesquisa)