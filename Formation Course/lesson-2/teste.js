const array = [{id: 'A', nome: 'KATIA'}, {id: 'B', nome: 'Viinicius'}]

const queroAchar = 'B'
const achei1 = array.find (array => array.id == queroAchar)
console.log (achei1)
achei1.nome = 'Violeta'
console.log (achei1)
console.log (array)