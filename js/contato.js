'user strict'

/********* ARQUIVO QUE TRABALHA COM OS CONTATOS **************/


// Fazendo GET no FRONT de todos os contatos
export async function getContatos() {
    const url = `https://bakcend-fecaf-render.onrender.com/contatos`

    const response = await fetch(url) // Trazer os dados de forma completa

    const data = await response.json() // Extrair os dados para retornar o json
    
    return data
}

// Fazendo GET no FRONT de somente 1 CONTATO ESPECIFICO 
async function getContato(id) {
    const url = `https://bakcend-fecaf-render.onrender.com/contatos/${id}`

    const response = await fetch(url) // Trazer os dados de forma completa

    const data = await response.json() // Extrair os dados para retornar o json
    
    return data
}

// Fazendo GET no FRONT de somente 1 contato pelo nome
export async function getContatosPorNome(nome) {
    const url = `https://bakcend-fecaf-render.onrender.com/contatos?nome_like=^${nome}`

    const response = await fetch(url) // Trazer os dados de forma completa

    const data = await response.json() // Extrair os dados para retornar o json
    
    return data
}

// POST de um CONTATO
export async function postContato(contato) {
    const url = `https://bakcend-fecaf-render.onrender.com/contatos`

    // Opçoes do FETCH
    const options = {
        method: 'POST',  // Metodo que vai utilizar
        headers:{
            'Content-Type': 'application/json' // O tipo de dados que você espera receber
        },
        body: JSON.stringify(contato) // Transformando o json em string e enviando para o body
    }

    const response = await fetch(url, options) // Fazendo uma requesicao na url com as opçoes que foram criadas

    return response.ok // Metodo que retorna TRUE se deu tudo certo e false caso não der certo

}

// Atualizando/PUT um Contato
async function putContato(id,contato) {
    const url = `https://bakcend-fecaf-render.onrender.com/contatos/${id}`

    // Opçoes do FETCH
    const options = {
        method: 'PUT', // Mudando o método para o que atualiza algo já criado
        headers:{
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(contato) 
    }

    const response = await fetch(url, options) 

    return response.ok 

}

// Delet/ Deletando um contato
async function deletContato(id){
    const url = `https://bakcend-fecaf-render.onrender.com/contatos/${id}`

    const options = {
        method : 'DELETE' // Só precisa do method nas opçoes
    }

    const response = await fetch(url,options)

    return response.ok
}

