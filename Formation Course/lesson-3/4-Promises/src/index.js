import { Db } from "./db.js"


function criarCliente(dados) {
    return Db.create(dados, "tabelaPessoaFisica")
}

function buscarCientes() {
    return Db.find("tabelaPessoaFisica")
}
/*console.log ((criarCliente( ))
console.log ((criarCliente())
criarCliente())
console*/


    //,

criarCliente({nome: "Janaina",
idade: "36"})
criarCliente({nome: "Katia",
idade: "35"})
criarCliente({nome: "Leandro",
idade: "30"})
criarCliente({nome: "Lilian",
idade: "38"})
criarCliente({nome: "Ricardo",
idade: "42"})

/*buscarCientes().then((dados) =>
console.log ("TERMINOU DE EXECUTAR FUNCAO PROMISE", dados)).catch((err) => console.log(err))*/

async function buscarClienteAsync () {
   const dados2 = await buscarCientes()
   console.log (dados2)
}

buscarClienteAsync()