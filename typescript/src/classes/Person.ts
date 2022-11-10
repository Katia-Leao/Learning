//let idTeacher: string = ('T-' + countTeacher)
//let idStudent: string = ('S-' + countStudent)



export abstract class Person {
        
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