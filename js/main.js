'use strict'

import { getContatos, getContatosPorNome, postContato} from "./contato.js"

import { uploadImageToAzure } from "./uploadImageToAzre.js"


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
    const container = document.getElementById('container')
    container.replaceChildren('')
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

function cadastrarContato(){
    document.querySelector('main').className = 'form-show'
}

function abrirHome(){
    document.querySelector('main').className = 'card-show'
}

async function salvarContato(){
    

    const uploadParams = {
        file: document.getElementById('foto').files[0],
        storageAccount: 'uploadimagerael',
        sasToken: 'sp=racwdli&st=2025-05-15T14:03:38Z&se=2025-05-15T22:03:38Z&sv=2024-11-04&sr=c&sig=JCDTHSWaYAbau6BH1mt%2B%2BFgrqISfcvUvGUbZBN1flNs%3D',
        containerName: 'fotos',
    };

    

    const contato = {
        "nome"    : document.getElementById('nome').value,
        "celular" : document.getElementById('celular').value,
        "foto"    : await uploadImageToAzure(uploadParams),
        "email"   : document.getElementById('email').value,
        "endereco": document.getElementById('endereco').value,
        "cidade"  : document.getElementById('cidade').value 
    }

    if(await postContato(contato)){
        await exibirContatos()
        abrirHome()
        alert('Cadastro Realizado com Sucesso')
    }
}

exibirContatos()

document.getElementById('pesquisar').addEventListener('keydown',exibirPesquisa)
document.getElementById('novo-contato').addEventListener('click',cadastrarContato)
document.getElementById('cancelar').addEventListener('click',abrirHome)
document.getElementById('salvar').addEventListener('click',salvarContato)