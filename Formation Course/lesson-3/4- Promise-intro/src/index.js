import fs from "fs";

function readFilePromise(file) {
  // outro jeito de escrever: const promise = new Promise... aí no final, antes da última } poderia colocar o return promise
  return new Promise((resolve, reject) => {
    fs.readFile(file, { encoding: "utf-8" }, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

// Esse vai printar apenas a pending promise
console.log(
  `primeiro console.log de pending. ${readFilePromise("src/arquivo.txt")}`
);
console.log("texto 1, depois do primeiro pending");

// Esse vai printar o resultado. Estranho que o prof colocou console.log (String(data)), pois se fosse igual o meu, trazia um buffer, mas o meu não trouxe. Deve ser a versão do node.
readFilePromise("src/arquivo.txt")
  .then((data) => {
    console.log(`primeiro console.log de resolução. ${data}`);
  })
  .catch((err) => {
    console.error(err);
  });
console.log("texto 2 depois do primeiro console de resolução");

// se não colocar o await, o console.log vai dar pending e o data vai ser uma promise. com o await, o data passa a ser apenas uma const normal.
// de novo, o professor precisou colocar o string(data) para não dar buffer
// nesse caso o prof falou que a resposta viria depois do mesmo jeito, mas a minha veio antes
function readFileFunction() {
  const data = readFilePromise("src/arquivo.txt");
  console.log(`segundo console.log pending. Função síncrona. ${data}`);
}

readFileFunction();
console.log("texto 3 depois do segundo pending");
// com o await, o data passa a ser apenas uma const normal.
// de novo, o professor precisou colocar o string(data) para não dar buffer
async function readFileAsyncAwait() {
  const data = await readFilePromise("src/arquivo.txt");
  console.log(`terceiro console.log. Função assíncrona. ${data}`);
}

readFileAsyncAwait();
console.log("texto 4 depois do terceiro console. Função assíncrona");

// Outra forma de escrever
async function readFileAsyncAwait2() {
  const data = await readFilePromise("src/arquivo.txt");
  console.log(`quarto console.log. Função assíncrona. ${data}`);
}

const execute = async () => {
  await Promise.all([await readFileAsyncAwait2()]);
};

execute();
console.log("texto 5 depois do quarto console, com execute");

// para conseguir executar direto tem que ser com o set time out
function readFileAsyncAwait3() {
  setTimeout(async () => {
    const data = await readFilePromise("src/arquivo.txt");
    console.log(`quinto console.log. SetTimeOut. ${data}`);
  }, 5000);
}

readFileAsyncAwait3();
console.log("texto 6 com o set time out. Função assíncrona");
