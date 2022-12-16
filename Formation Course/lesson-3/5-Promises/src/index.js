import { Db } from "./db.js";

function criarCliente(dados) {
  return Db.create(dados, "tabelaPessoaFisica");
}

function buscarCientes() {
  return Db.find("tabelaPessoaFisica");
}

//Exercício começa aqui.
criarCliente({ nome: "Janaina", idade: "36" });
criarCliente({ nome: "Katia", idade: "35" });
criarCliente({ nome: "Leandro", idade: "30" });
criarCliente({ nome: "Lilian", idade: "38" });
criarCliente({ nome: "Ricardo", idade: "42" });

// primeira forma de fazer, com o .then e .catch
buscarCientes()
  .then((dados) => console.log("TERMINOU DE EXECUTAR FUNCAO PROMISE", dados))
  .catch((err) => console.log(err));

// segunda forma de fazer com o async/await
async function buscarClienteAsync() {
  const dados2 = await buscarCientes();
  console.log(dados2);
}

buscarClienteAsync();
