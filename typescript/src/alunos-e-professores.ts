/*Crie as entidades de um sistema para gerenciar Alunos, Professores

Professores e alunos deve herdar de uma mesma classe pai
Alunos e Professores deve possuir dados pessoais(nome, idade, etc.)
Um professor deve possuir uma disciplina na qual ele ministra
Um aluno deve possuir um atributo nota do tipo ARRAY.
A classe aluno deve conter um metodo para adicionar notas.
A classe aluno deve conter um metodo calcular a média das notas.*/

//import prompt from 'prompt'

let countStudent: number = 0
let idStudent: string = ('S-' + countStudent)
let countTeacher: number = 0
let idTeacher: string = ('T-' + countTeacher)
let noteId: number = 0
let soma: number = 0
let average: number = 0
let students: Student [] = []
let teachers: Teacher [] = []
let notes: Note [] = []

abstract class Person {
        
    protected _name: string
    protected _cpf: string
    protected _birth: string
    protected _adress: string
    protected _telephone: string
    protected _emergencyContact: string
    protected _emergencyPhone: string
    protected _id: string
    
    constructor (name:string, cpf: string, birth:string, adress: string, telephone: string, emergencyContact: string, emergencyPhone: string){
        this._name = name
        this._cpf = cpf
        this._birth = birth
        this._adress = adress
        this._telephone = telephone
        this._emergencyContact = emergencyContact
        this._emergencyPhone = emergencyPhone
        this._id = idStudent || idTeacher
    }
}

class Student extends Person{
        
    constructor (name:string, cpf: string, birth:string, adress: string, telephone: string, emergencyContact: string, emergencyPhone: string){
        super (name, cpf, birth, adress, telephone, emergencyContact, emergencyPhone)
        countStudent ++
        idStudent = ('S-' + countStudent)
        this._id = idStudent
    }

    insertStudent (student: Student){
        students.push (student)
    }

    removeStudent (id: string) {
        const updatedList = students.filter ((s) => s._id != id)
        students = updatedList
    }

    showStudentInfo () {
        console.table(students)
    }

    set adress (adress1: string) {
        this._adress = adress1
    }

    set telephone (telephone1: string) {
        this._telephone = telephone1
    }

    set emergencyContact (contact: string) {
        this._emergencyContact = contact
    }

    set emergencyPhone (phone1: string) {
        this._emergencyPhone = phone1
    } 

}

class Teacher extends Person{
    public subject: string   
    
    constructor (name:string, cpf: string, birth:string, adress: string, telephone: string, emergencyContact: string, emergencyPhone: string, subject: string){
        super (name, cpf, birth, adress, telephone, emergencyContact, emergencyPhone)
        countTeacher ++
        idTeacher = ('T-' + countTeacher)
        this._id = idTeacher
        this.subject = subject
    }

    insertTeacher (teacher: Teacher){
        teachers.push (teacher)
    }

    removeTeacher (id: string) {
        const updatedList = teachers.filter ((t) => t._id != id)
        teachers = updatedList
    }

    showTeacherInfo () {
        console.table(teachers)
    }

    set adress (adress1: string) {
        this._adress = adress1
    }

    set telephone (telephone1: string) {
        this._telephone = telephone1
    }

    set emergencyContact (contact: string) {
        this._emergencyContact = contact
    }

    set emergencyPhone (phone1: string) {
        this._emergencyPhone = phone1
    } 
}

class Note {
    
 
    noteId: number
    studentName: Student['_name']
    subject: Teacher['subject']
    description: string
    note: number
    
    constructor (studentName: Student['_name'], subject: Teacher['subject'], description: string, note: number) {
        noteId ++
        this.noteId = noteId
        this.studentName = studentName
        this.subject = subject
        this.description = description
        this.note = note
    }

    insertNote (note: Note) {
        notes.push (note)
    }

    removeNote (index: number) {
        const updatedNotes = notes.filter ((n) => n.noteId != index)
        notes = updatedNotes
    }

    showNote () {
        console.table (notes)
    }

    searchByStudent (nome: string){
        const newList = notes.filter ((s) => s.studentName == nome)
        console.table (newList)
    }

    searchBySubject (nome: string){
        const newList1 = notes.filter ((t) => t.subject == nome)
        console.table (newList1)
    }

    searchByStudentSubject (nomeAluno: string, nomeDisciplina: string) {
        const newList2 = notes.filter ((a) => a.studentName == nomeAluno)
        const newList3 = newList2.filter ((p) => p.subject == nomeDisciplina)
        for (let i = 0; i < newList3.length; i++){
            soma = soma + newList3[i].note 
        } 
        average = soma / newList3.length
        console.table (newList3)
        console.log (`média da disciplina ${this.subject} para o aluno ${this.studentName}: ${average}`)
    }
}

const aluno1 = new Student ('katia', '000000', '08/02/1987', 'Rua A, 357', '996547852', 'Fulano', '996547852')
const aluno2 = new Student ('rodolfo', '000000', '08/02/1987', 'Rua A, 357', '996547852', 'Fulano', '996547852')
const prof1 = new Teacher ('Carlos', '000000', '08/02/1987', 'Rua A, 357', '996547852', 'Fulano', '996547852', 'Lógica')
const prof2 = new Teacher ('Esdras', '000000', '08/02/1987', 'Rua A, 357', '996547852', 'Fulano', '996547852', 'POO')
const nota1 = new Note ('katia', 'POO', 'prova 1', 10)
const nota2 = new Note ('katia', 'POO', 'prova 2', 5)
const nota3 = new Note ('katia', 'Logica', 'prova 1', 10)
const nota4 = new Note ('rodolfo', 'POO', 'prova 1', 10)
aluno2.insertStudent (aluno2)
aluno2.insertStudent (aluno1)
//aluno2.showStudentInfo()
prof1.insertTeacher (prof1)
prof1.insertTeacher (prof2)
//prof1.showTeacherInfo ()
nota1.insertNote (nota1)
nota1.insertNote (nota2)
nota1.insertNote (nota3)
nota1.insertNote (nota4)
//nota1.showNote ()
//nota1.searchByStudent ('katia')
//nota1.searchByTeacher ('Esdras')
nota1.searchByStudentSubject ('katia', 'POO')





/*const main = async function () {
    let shouldRun = true

    while (shouldRun) {
        console.log ('Escolha uma das opções abaixo')
        console.log ('1. Inserir novo aluno')
        console.log ('2. Remover aluno')
        console.log ('3. Ver todos os alunos')
        console.log ('4. Ver apenas um aluno')
        console.log ('5. Inserir notas')
        console.log ('6. Remover notas')
        console.log ('7. Ver notas de todos os alunos')
        console.log ('8. Ver notas de apenas um aluno')
        console.log ('9. Inserir novo professor')
        console.log ('10. Remover professor')
        console.log ('11. Ver todos os professores')
        console.log ('12. Ver apenas um professor')
        console.log ('13. Sair')
    
const response = await prompt.get(['option'])
}
}*/