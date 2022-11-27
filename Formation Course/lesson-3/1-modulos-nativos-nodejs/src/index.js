import fs from "fs";
import timestamp from "./timestamp.js";
import cpus from "./cpus.js";
import path from "path";

const caminho = path.resolve("./src/cpu")

fs.writeFileSync(`${caminho}.${timestamp}.txt`, `Minha quantidade de CPUs é ${JSON.stringify(cpus)}`)

fs.readFile (`./src/cpu.${timestamp}.txt`, {encoding: "utf-8"}, (err, data) => {
    err = "Não é possível ler o arquivo";
    console.log(data)
})