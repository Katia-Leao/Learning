import prompt from 'prompt'
import {Person} from './classes/Person'

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

/*abstract class Person {
        
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
}*/

class Student extends Person{
        
    constructor (name:string, cpf: string, birth:string, adress: string, telephone: string, emergencyContact: string, emergencyPhone: string){
        super (name, cpf, birth, adress, telephone, emergencyContact, emergencyPhone)
        idStudent = ('S-' + countStudent)
        countStudent ++
        this._id = idStudent
    }

    insertStudent (student: Student){
        students.push (student)
        console.log ('Aluno inserido com sucesso.')
    }

    removeStudent (nome: string) {
        const updatedList = students.filter ((s) => s._name != nome)
        students = updatedList
    }

    showStudents () {
        console.table(students)
    }

    search (nome: string) {
        const oneStudent = students.filter ((p) => p._name == nome)
        console.table (oneStudent)
    }

    setAdress (nome: string, adress1: string) {
        let toChange1 = students.find (students => students._name == nome)
        if(toChange1 != undefined){
            toChange1._adress = adress1
        }
    }

    setTelephone (nome: string, telephone1: string) {
        let toChange2 = students.find (students => students._name == nome)
        if(toChange2 != undefined){
            toChange2._telephone = telephone1
        }
    }

    setContact (nome: string, contact: string) {
        let toChange3 = students.find (students => students._name == nome)
        if(toChange3 != undefined){
            toChange3._emergencyContact = contact
        }
    }

    setEmergencyPhone (nome: string, phone1: string) {
        let toChange4 = students.find (students => students._name == nome)
        if(toChange4 != undefined){
            toChange4._emergencyPhone = phone1
        }
    } 

}

class Teacher extends Person{
    public subject: string   
    
    constructor (name:string, cpf: string, birth:string, adress: string, telephone: string, emergencyContact: string, emergencyPhone: string, subject: string){
        super (name, cpf, birth, adress, telephone, emergencyContact, emergencyPhone)
        idTeacher = ('T-' + countTeacher)
        countTeacher ++
        this._id = idTeacher
        this.subject = subject
    }

    insertTeacher (teacher: Teacher){
        teachers.push (teacher)
    }

    removeTeacher (nome: string) {
        const updatedList = teachers.filter ((t) => t._name != nome)
        teachers = updatedList
    }

    showTeachers () {
        console.table(teachers)
    }

    search (nome: string) {
        const oneTeacher = teachers.filter ((p) => p._name == nome)
        console.table (oneTeacher)
    }

    setAdress (nome: string, adress1: string) {
        let toChange1 = teachers.find (teachers => teachers._name == nome)
        if(toChange1 != undefined){
            toChange1._adress = adress1
        }
    }

    setTelephone (nome: string, telephone1: string) {
        let toChange2 = teachers.find (teachers => teachers._name == nome)
        if(toChange2 != undefined){
            toChange2._telephone = telephone1
        }
    }

    setContact (nome: string, contact: string) {
        let toChange3 = teachers.find (teachers => teachers._name == nome)
        if(toChange3 != undefined){
            toChange3._emergencyContact = contact
        }
    }

    setEmergencyPhone (nome: string, phone1: string) {
        let toChange4 = teachers.find (teachers => teachers._name == nome)
        if(toChange4 != undefined){
            toChange4._emergencyPhone = phone1
        }
    } 
}

class Note {
    
 
    noteId: number
    studentName: Student['_name']
    subject: Teacher['subject']
    description: string
    note: number
    
    constructor (studentName: Student['_name'], subject: Teacher['subject'], description: string, note: number) {
        this.noteId = noteId
        noteId ++
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

    changeNote (id: number, note: number){
        let toChange = notes.find (notes => notes.noteId == id)
        if(toChange != undefined){
            toChange.note = note
        }
    }

    showNote () {
        console.table (notes)
    }

    searchByStudent (nome: string){
        const newList = notes.filter ((s) => s.studentName == nome)
        console.table (newList)
    }

    searchBySubject (nome: string){
        const newList1 = notes.filter ((d) => d.subject == nome)
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
        console.log (`média da disciplina para o aluno: ${average}`)
    }
}

//const aluno1 = new Student ('katia', '000000', '08/02/1987', 'Rua A, 357', '996547852', 'Fulano', '996547852')
//const aluno2 = new Student ('rodolfo', '000000', '08/02/1987', 'Rua A, 357', '996547852', 'Fulano', '996547852')
//const prof1 = new Teacher ('Carlos', '000000', '08/02/1987', 'Rua A, 357', '996547852', 'Fulano', '996547852', 'Lógica')
//const prof2 = new Teacher ('Esdras', '000000', '08/02/1987', 'Rua A, 357', '996547852', 'Fulano', '996547852', 'POO')
//const nota1 = new Note ('katia', 'POO', 'prova 1', 10)
//const nota2 = new Note ('katia', 'POO', 'prova 2', 5)
//const nota3 = new Note ('katia', 'Logica', 'prova 1', 10)
//const nota4 = new Note ('rodolfo', 'POO', 'prova 1', 10)
//aluno2.insertStudent (aluno2)
//aluno2.insertStudent (aluno1)
//aluno2.showStudentInfo()
//prof1.insertTeacher (prof1)
//prof1.insertTeacher (prof2)
//prof1.showTeacherInfo ()
//nota1.insertNote (nota1)
//nota1.insertNote (nota2)
//nota1.insertNote (nota3)
//nota1.insertNote (nota4)
//nota1.showNote ()
//nota1.searchByStudent ('katia')
//nota1.searchByTeacher ('Esdras')
//nota1.searchByStudentSubject ('katia', 'POO')


const main = async function () {
    let shouldRun = true
    let student = new Student('name', 'cpf', 'birth', 'adress', 'telephone', 'emergencyContact', 'emergencyPhone')
    let teacher = new Teacher('name', 'cpf', 'birth', 'adress', 'telephone', 'emergencyContact', 'emergencyPhone', 'subject')
    let note = new Note ('studentName', 'subject', 'description', Number('note'))

    while (shouldRun) {
        console.log ('Escolha uma das opções abaixo:')
        console.log ('1. Perfil Administrador')
        console.log ('2. Perfil Professor')
        console.log ('3. Perfil Aluno')
        console.log ('4. Sair')
    
    const response = await prompt.get(['option'])
    if (response.option == '4') { break}
    else{
        switch (response.option){
            case '1':
                let shouldRun1 = true 
                while (shouldRun1) {
                console.clear ()
                console.log ('Escolha uma das opções abaixo:')
                console.log ('1. Inserir novo aluno')
                console.log ('2. Inserir novo professor')
                console.log ('3. Mostrar todos os alunos')
                console.log ('4. Mostrar todos os professores')
                console.log ('5. Mostrar dados de apenas um aluno')
                console.log ('6. Mostrar dados de apenas um professor')
                console.log ('7. Alterar dados de um aluno existente')
                console.log ('8. Alterar dados de um professor existente')
                console.log ('9. Remover um aluno existente')
                console.log ('10. Remover um professor existente')
                console.log ('11. Voltar ao menu anterior')

                const response = await prompt.get(['option'])

                if (response.option == '11') { break}
                else{
                    switch (response.option) {
                        case '1':
                            console.clear ()
                            console.log ('Insira os dados solicitados abaixo')
                            const response = await prompt.get(['name', 'cpf', 'birth', 'adress', 'telephone', 'emergencyContact', 'emergencyPhone'])
                            const adjustedName = response.name.toString()
                            const adjustedAdress = response.adress.toString()
                            const adjustedEmergencyContact = response.emergencyContact.toString()
                
                            student.insertStudent (new Student (
                                adjustedName.toUpperCase(),
                                response.cpf.toString(),
                                response.birth.toString(),
                                adjustedAdress.toUpperCase(),
                                response.telephone.toString(),
                                adjustedEmergencyContact.toUpperCase(),
                                response.emergencyPhone.toString()
                            ))
                            break;
           
                        case '2':
                            console.clear ()
                            console.log ('Insira os dados solicitados abaixo')
                            const response1 = await prompt.get(['name', 'cpf', 'birth', 'adress', 'telephone', 'emergencyContact', 'emergencyPhone', 'subject'])
                            const adjustedName1 = response1.name.toString()
                            const adjustedAdress1 = response1.adress.toString()
                            const adjustedEmergencyContact1 = response1.emergencyContact.toString()
                            const adjustedSubject = response1.subject.toString()
                
                            teacher.insertTeacher (new Teacher (
                                adjustedName1.toUpperCase(),
                                response1.cpf.toString(),
                                response1.birth.toString(),
                                adjustedAdress1.toUpperCase(),
                                response1.telephone.toString(),
                                adjustedEmergencyContact1.toUpperCase(),
                                response1.emergencyPhone.toString(),
                                adjustedSubject.toUpperCase()
                            ))
                            console.log ('Professor inserido com sucesso.')
                            break;
            
                        case '3':
                            console.clear ()
                            console.log ('==== Alunos ====')
                            student.showStudents ()
                            console.log('Pressione uma tecla para voltar ao menu anterior...')
                            await prompt.get(['pressione'])
                            break;

                        case '4':
                            console.clear ()
                            console.log ('==== Professores ====')
                            teacher.showTeachers ()
                            console.log('Pressione uma tecla para voltar ao menu anterior...')
                            await prompt.get(['pressione'])
                            break;

                        case '5':
                            console.clear()
                            console.log('Insira o nome do aluno que deseja visualizar:')
                            const position1 = await prompt.get(['nome'])
                            const nameAdjusted1 = position1.nome.toString()
                            student.search(nameAdjusted1.toUpperCase())
                            console.log('Pressione uma tecla para voltar ao menu anterior...')
                            await prompt.get(['pressione'])
                            break;

                        case '6':
                            console.clear()
                            console.log('Insira o nome do professor que deseja visualizar:')
                            const position2 = await prompt.get(['nome'])
                            const nameAdjusted = position2.nome.toString()
                            teacher.search(nameAdjusted.toUpperCase())
                            console.log('Pressione uma tecla para voltar ao menu anterior...')
                            await prompt.get(['pressione'])
                            break;
            
                        case '7':
                            let shouldRun2 = true
                            while (shouldRun2){            
                                console.clear ()
                                console.log ('Qual dado de aluno você deseja alterar?')
                                console.log ('1. Alterar endereço')
                                console.log ('2. Alterar telefone')
                                console.log ('3. Alterar contato de emergência (nome)')
                                console.log ('4. Alterar telefone de emergência')
                                console.log ('5. Retornar ao menu anterior')

                                const response = await prompt.get(['option'])              
                                    switch (response.option) {
                                        case '1':
                                            console.clear ()
                                            console.log('Insira o nome do aluno cujo endereço deseja visualizar:')
                                            const position = await prompt.get(['nome'])
                                            const nameAdjusted1 = position.nome.toString()
                                            student.search(nameAdjusted1.toUpperCase())
                                            console.log('Insira o novo endereço')
                                            const position1 = await prompt.get(['endereco'])
                                            const adressAdjusted = position1.endereco.toString()
                                            student.setAdress(nameAdjusted1.toUpperCase(), adressAdjusted.toUpperCase())
                                            console.log ('endereço alterado com sucesso')
                                            student.search(nameAdjusted1.toUpperCase())
                                            console.log('Pressione uma tecla para voltar ao menu anterior...')
                                            await prompt.get(['pressione'])
                                            break;
                    
                                        case '2':
                                            console.clear ()
                                            console.log('Insira o nome do aluno cujo telefone deseja visualizar:')
                                            const position2 = await prompt.get(['nome'])
                                            const nameAdjusted2 = position2.nome.toString()
                                            student.search(nameAdjusted2.toUpperCase())
                                            console.log('Insira o novo telefone')
                                            const position3 = await prompt.get(['telefone'])
                                            const telephoneAdjusted = position3.telefone.toString()
                                            student.setTelephone(nameAdjusted2.toUpperCase(), telephoneAdjusted.toUpperCase())
                                            console.log ('telefone alterado com sucesso')
                                            student.search(nameAdjusted2.toUpperCase())
                                            console.log('Pressione uma tecla para voltar ao menu anterior...')
                                            await prompt.get(['pressione'])
                                            break;
                    
                                        case '3':
                                            console.clear ()
                                            console.log('Insira o nome do aluno cujo contato de emergência deseja visualizar:')
                                            const position4 = await prompt.get(['nome'])
                                            const nameAdjusted3 = position4.nome.toString()
                                            student.search(nameAdjusted3.toUpperCase())
                                            console.log('Insira o novo nome do contato de emergência')
                                            const position5 = await prompt.get(['nome'])
                                            const contactAdjusted = position5.nome.toString()
                                            student.setContact(nameAdjusted3.toUpperCase(), contactAdjusted.toUpperCase())
                                            console.log ('contato alterado com sucesso')
                                            student.search(nameAdjusted3.toUpperCase())
                                            console.log('Pressione uma tecla para voltar ao menu anterior...')
                                            await prompt.get(['pressione'])
                                            break;
                
                                        case '4':
                                            console.clear ()
                                            console.log('Insira o nome do aluno cujo telefone de emergência deseja visualizar:')
                                            const position6 = await prompt.get(['nome'])
                                            const nameAdjusted4 = position6.nome.toString()
                                            student.search(nameAdjusted4.toUpperCase())
                                            console.log('Insira o novo telefone de emergência')
                                            const position7 = await prompt.get(['telefone'])
                                            const phoneAdjusted = position7.telefone.toString()
                                            student.setEmergencyPhone(nameAdjusted4.toUpperCase(), phoneAdjusted.toUpperCase())
                                            console.log ('telefone alterado com sucesso')
                                            student.search(nameAdjusted4.toUpperCase())
                                            console.log('Pressione uma tecla para voltar ao menu anterior...')
                                            await prompt.get(['pressione'])
                                            break;
                    
                                        default:
                                            break;
                                } break;
                            }break;
            
                        case '8':
                            let shouldRun3 = true
                            while (shouldRun3){            
                                console.clear ()
                                console.log ('Qual dado você deseja alterar?')
                                console.log ('1. Alterar endereço')
                                console.log ('2. Alterar telefone')
                                console.log ('3. Alterar contato de emergência (nome)')
                                console.log ('4. Alterar telefone de emergência')
                                console.log ('5. Retornar ao menu anterior')

                                const response3 = await prompt.get(['option'])
                                    switch (response3.option) {
                                        case '1':
                                            console.clear ()
                                            console.log('Insira o nome do professor cujo endereço deseja visualizar:')
                                            const position = await prompt.get(['nome'])
                                            const nameAdjusted1 = position.nome.toString()
                                            teacher.search(nameAdjusted1.toUpperCase())
                                            console.log('Insira o novo endereço')
                                            const position1 = await prompt.get(['endereco'])
                                            const adressAdjusted = position1.endereco.toString()
                                            teacher.setAdress(nameAdjusted1.toUpperCase(), adressAdjusted.toUpperCase())
                                            console.log ('endereço alterado com sucesso')
                                            teacher.search(nameAdjusted1.toUpperCase())
                                            console.log('Pressione uma tecla para voltar ao menu anterior...')
                                            await prompt.get(['pressione'])
                                            break;
                    
                                        case '2':
                                            console.clear ()
                                            console.log('Insira o nome do professor cujo telefone deseja visualizar:')
                                            const position2 = await prompt.get(['nome'])
                                            const nameAdjusted2 = position2.nome.toString()
                                            teacher.search(nameAdjusted2.toUpperCase())
                                            console.log('Insira o novo telefone')
                                            const position3 = await prompt.get(['telefone'])
                                            const telephoneAdjusted = position3.telefone.toString()
                                            teacher.setTelephone(nameAdjusted2.toUpperCase(), telephoneAdjusted.toUpperCase())
                                            console.log ('telefone alterado com sucesso')
                                            teacher.search(nameAdjusted2.toUpperCase())
                                            console.log('Pressione uma tecla para voltar ao menu anterior...')
                                            await prompt.get(['pressione'])
                                            break;
                    
                                        case '3':
                                            console.clear ()
                                            console.log('Insira o nome do professor cujo contato de emergência deseja visualizar:')
                                            const position4 = await prompt.get(['nome'])
                                            const nameAdjusted3 = position4.nome.toString()
                                            teacher.search(nameAdjusted3.toUpperCase())
                                            console.log('Insira o novo nome do contato de emergência')
                                            const position5 = await prompt.get(['nome'])
                                            const contactAdjusted = position5.nome.toString()
                                            teacher.setContact(nameAdjusted3.toUpperCase(), contactAdjusted.toUpperCase())
                                            console.log ('contato alterado com sucesso')
                                            teacher.search(nameAdjusted3.toUpperCase())
                                            console.log('Pressione uma tecla para voltar ao menu anterior...')
                                            await prompt.get(['pressione'])
                                            break;
                
                                        case '4':
                                            console.clear ()
                                            console.log('Insira o nome do professor cujo telefone de emergência deseja visualizar:')
                                            const position6 = await prompt.get(['nome'])
                                            const nameAdjusted4 = position6.nome.toString()
                                            teacher.search(nameAdjusted4.toUpperCase())
                                            console.log('Insira o novo telefone de emergência')
                                            const position7 = await prompt.get(['telefone'])
                                            const phoneAdjusted = position7.telefone.toString()
                                            teacher.setEmergencyPhone(nameAdjusted4.toUpperCase(), phoneAdjusted.toUpperCase())
                                            console.log ('telefone alterado com sucesso')
                                            teacher.search(nameAdjusted4.toUpperCase())
                                            console.log('Pressione uma tecla para voltar ao menu anterior...')
                                            await prompt.get(['pressione'])
                                            break;

                                        default:
                                            break;
                                } break;
                            } break;

                        case '9':
                            console.clear()
                            console.log('===== Remover aluno =====')
                            student.showStudents()
                            console.log('Insira o nome do aluno que deseja remover:')
                            const position = await prompt.get(['nome'])
                            const nameAdjusted7 = position.nome.toString()
                            student.removeStudent(nameAdjusted7.toUpperCase())
                            console.log ('Aluno removido com sucesso.')
                            break;

                        case '10':
                            console.clear()
                            console.log('===== Remover professor =====')
                            teacher.showTeachers()
                            console.log('Insira o nome do contato que deseja remover:')
                            const position3 = await prompt.get(['nome'])
                            const nameAdjusted8 = position3.nome.toString()
                            teacher.removeTeacher(nameAdjusted8.toUpperCase())
                            break;

                        default:
                            break;
                    }
                }} break;
    
            case '2':
                let shouldRun4 = true
                while (shouldRun4) {
                    console.clear ()    
                    console.log ('Escolha o que você deseja fazer')
                    console.log ('1. Alterar seu endereço')
                    console.log ('2. Alterar seu telefone')
                    console.log ('3. Alterar o nome do seu contato de emergência')
                    console.log ('4. Alterar o seu telefone de emergência')
                    console.log ('5. Inserir nota')
                    console.log ('6. Remover nota')
                    console.log ('7. Alterar nota')
                    console.log ('8. Ver as notas de todos os alunos por disciplina')
                    console.log ('9. Ver as notas de um aluno específico')
                    console.log ('10. Retornar ao menu anterior')
    
                    const response4 = await prompt.get(['option'])
                    if (response4.option == '10') { break}
                    else{
                        switch (response4.option){
                            case '1':
                                console.clear ()
                                console.log('Insira seu nome:')
                                const position = await prompt.get(['nome'])
                                const nameAdjusted1 = position.nome.toString()
                                teacher.search(nameAdjusted1.toUpperCase())
                                console.log('Insira o novo endereço')
                                const position1 = await prompt.get(['endereco'])
                                const adressAdjusted = position1.endereco.toString()
                                teacher.setAdress(nameAdjusted1.toUpperCase(), adressAdjusted.toUpperCase())
                                console.log ('endereço alterado com sucesso')
                                teacher.search(nameAdjusted1.toUpperCase())
                                console.log('Pressione uma tecla para voltar ao menu anterior...')
                                await prompt.get(['pressione'])
                                break;
                        
                            case '2':
                                console.clear ()
                                console.log('Insira seu nome:')
                                const position2 = await prompt.get(['nome'])
                                const nameAdjusted2 = position2.nome.toString()
                                teacher.search(nameAdjusted2.toUpperCase())
                                console.log('Insira o novo telefone')
                                const position3 = await prompt.get(['telefone'])
                                const telephoneAdjusted = position3.telefone.toString()
                                teacher.setTelephone(nameAdjusted2.toUpperCase(), telephoneAdjusted.toUpperCase())
                                console.log ('telefone alterado com sucesso')
                                teacher.search(nameAdjusted2.toUpperCase())
                                console.log('Pressione uma tecla para voltar ao menu anterior...')
                                await prompt.get(['pressione'])
                                break;
                        
                            case '3':
                                console.clear ()
                                console.log('seu nome:')
                                const position4 = await prompt.get(['nome'])
                                const nameAdjusted3 = position4.nome.toString()
                                teacher.search(nameAdjusted3.toUpperCase())
                                console.log('Insira o novo nome do contato de emergência')
                                const position5 = await prompt.get(['nome'])
                                const contactAdjusted = position5.nome.toString()
                                teacher.setContact(nameAdjusted3.toUpperCase(), contactAdjusted.toUpperCase())
                                console.log ('contato alterado com sucesso')
                                teacher.search(nameAdjusted3.toUpperCase())
                                console.log('Pressione uma tecla para voltar ao menu anterior...')
                                await prompt.get(['pressione'])
                                break;
                    
                            case '4':
                                console.clear ()
                                console.log('Insira seu nome:')
                                const position6 = await prompt.get(['nome'])
                                const nameAdjusted4 = position6.nome.toString()
                                teacher.search(nameAdjusted4.toUpperCase())
                                console.log('Insira o novo telefone de emergência')
                                const position7 = await prompt.get(['telefone'])
                                const phoneAdjusted = position7.telefone.toString()
                                teacher.setContact(nameAdjusted4.toUpperCase(), phoneAdjusted.toUpperCase())
                                console.log ('telefone alterado com sucesso')
                                teacher.search(nameAdjusted4.toUpperCase())
                                console.log('Pressione uma tecla para voltar ao menu anterior...')
                                await prompt.get(['pressione'])
                                break;
    
                            case '5':
                                console.clear ()
                                console.log ('Insira os dados solicitados abaixo')
                                const response = await prompt.get(['studentName', 'subject', 'description', 'note'])
                                const adjustedName = response.studentName.toString()
                                const adjustedSubject = response.subject.toString()
                                const adjustedDescription = response.description.toString()
                
                                note.insertNote (new Note (
                                    adjustedName.toUpperCase(),
                                    adjustedSubject.toUpperCase(),
                                    adjustedDescription.toString(),
                                    Number (response.note),
                                ))
                                console.log ('Nota inserida com sucesso.')
                                break;
                
                            case '6':
                                console.clear ()
                                console.log('===== Remover notas =====')
                                note.showNote()
                                console.log ('Insira o noteId da nota a ser removida')
                                const response1 = await prompt.get(['noteId'])
                                const adjustedIndex = Number(response1.noteId)
                                note.removeNote (adjustedIndex)
                                console.log ('Nota removida com sucesso')
                                break;

                            case '7':
                                console.clear ()
                                console.log('===== Alterar notas =====')
                                note.showNote()
                                console.log ('Insira o noteId da nota a ser alterada')
                                const response2 = await prompt.get(['noteId'])
                                const adjustedIndex1 = Number(response2.noteId)
                                console.log ('Insira a nova nota')
                                const response3 = await prompt.get(['nota'])
                                const adjustedNote2 = Number(response3.nota)

                                note.changeNote (adjustedIndex1, adjustedNote2)
                                console.log ('Nota alterada com sucesso')
                                break;

                            case '8':
                                console.log('Insira o nome da disciplina:')
                                const position8 = await prompt.get(['disciplina'])
                                const nameAdjusted5 = position8.disciplina.toString()
                                note.searchBySubject(nameAdjusted5.toUpperCase())
                                console.log('Pressione uma tecla para voltar ao menu anterior...')
                                await prompt.get(['pressione'])
                                break;
                    
                            case '9':
                                console.log('Insira o nome do aluno e da disciplina que deseja visualizar:')
                                const position9 = await prompt.get(['nome'])
                                const position10 = await prompt.get(['disciplina'])
                                const nameAdjusted6 = position9.nome.toString()
                                const subjectAdjusted = position10.disciplina.toString()
                                note.searchByStudentSubject(nameAdjusted6.toUpperCase(), subjectAdjusted.toUpperCase())
                                console.log('Pressione uma tecla para voltar ao menu anterior...')
                                await prompt.get(['pressione'])
                                break;

                            default: 
                                break;
                        }
                    }
                } break;
        
            case '3':
                let shouldRun5 = true
                while (shouldRun5) {
                    console.clear ()    
                    console.log ('Escolha o que você deseja fazer')
                    console.log ('1. Alterar seu endereço')
                    console.log ('2. Alterar seu telefone')
                    console.log ('3. Alterar o nome do seu contato de emergência')
                    console.log ('4. Alterar o seu telefone de emergência')
                    console.log ('5. Ver todas as suas notas')
                    console.log ('6. Ver notas por disciplina')
                    console.log ('7. Retornar ao menu anterior')

                    const response5 = await prompt.get(['option'])
                    if (response5.option == '7') { break}
                    else{
                        switch (response5.option){
                            case '1':
                                console.clear ()
                                console.log('Insira seu nome:')
                                const position = await prompt.get(['nome'])
                                const nameAdjusted1 = position.nome.toString()
                                student.search(nameAdjusted1.toUpperCase())
                                console.log('Insira o novo endereço')
                                const position1 = await prompt.get(['endereco'])
                                const adressAdjusted = position1.endereco.toString()
                                student.setAdress(nameAdjusted1.toUpperCase(), adressAdjusted.toUpperCase())
                                console.log ('endereço alterado com sucesso')
                                student.search(nameAdjusted1.toUpperCase())
                                console.log('Pressione uma tecla para voltar ao menu anterior...')
                                await prompt.get(['pressione'])
                                break;
                    
                            case '2':
                                console.clear ()
                                console.log('Insira seu nome:')
                                const position2 = await prompt.get(['nome'])
                                const nameAdjusted2 = position2.nome.toString()
                                student.search(nameAdjusted2.toUpperCase())
                                console.log('Insira o novo telefone')
                                const position3 = await prompt.get(['telefone'])
                                const telephoneAdjusted = position3.telefone.toString()
                                student.setTelephone(nameAdjusted2.toUpperCase(), telephoneAdjusted.toUpperCase())
                                console.log ('telefone alterado com sucesso')
                                student.search(nameAdjusted2.toUpperCase())
                                console.log('Pressione uma tecla para voltar ao menu anterior...')
                                await prompt.get(['pressione'])
                                break;
                    
                            case '3':
                                console.clear ()
                                console.log('seu nome:')
                                const position4 = await prompt.get(['nome'])
                                const nameAdjusted3 = position4.nome.toString()
                                student.search(nameAdjusted3.toUpperCase())
                                console.log('Insira o novo nome do contato de emergência')
                                const position5 = await prompt.get(['nome'])
                                const contactAdjusted = position5.nome.toString()
                                student.setContact(nameAdjusted3.toUpperCase(), contactAdjusted.toUpperCase())
                                console.log ('contato alterado com sucesso')
                                student.search(nameAdjusted3.toUpperCase())
                                console.log('Pressione uma tecla para voltar ao menu anterior...')
                                await prompt.get(['pressione'])
                                break;
                
                            case '4':
                                console.clear ()
                                console.log('Insira seu nome:')
                                const position6 = await prompt.get(['nome'])
                                const nameAdjusted4 = position6.nome.toString()
                                student.search(nameAdjusted4.toUpperCase())
                                console.log('Insira o novo telefone de emergência')
                                const position7 = await prompt.get(['telefone'])
                                const phoneAdjusted = position7.telefone.toString()
                                student.setEmergencyPhone(nameAdjusted4.toUpperCase(), phoneAdjusted.toUpperCase())
                                console.log ('telefone alterado com sucesso')
                                student.search(nameAdjusted4.toUpperCase())
                                console.log('Pressione uma tecla para voltar ao menu anterior...')
                                await prompt.get(['pressione'])
                                break;

                            case '5':
                                console.log('Insira seu nome:')
                                const position8 = await prompt.get(['nome'])
                                const nameAdjusted5 = position8.nome.toString()
                                note.searchByStudent(nameAdjusted5.toUpperCase())
                                console.log('Pressione uma tecla para voltar ao menu anterior...')
                                await prompt.get(['pressione'])
                                break;
                
                            case '6':
                                console.log('Insira seu nome e a disciplina que deseja visualizar:')
                                const position9 = await prompt.get(['nome'])
                                const position10 = await prompt.get(['disciplina'])
                                const nameAdjusted6 = position9.nome.toString()
                                const subjectAdjusted = position10.disciplina.toString()
                                note.searchByStudentSubject(nameAdjusted6.toUpperCase(), subjectAdjusted.toUpperCase())
                                console.log('Pressione uma tecla para voltar ao menu anterior...')
                                await prompt.get(['pressione'])
                                break;

                            default:
                            break;
                        }
                    }
                } break;
    
            default:
                break;
        }
    }}
console.clear()
}

main ()