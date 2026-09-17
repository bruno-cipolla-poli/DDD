class Reservation{
    constructor(idr, idc, cin, cout){
        this.id_reservation = idr;
        this.id_customer = idc;
        this.status = 'realizada';
        this.checkin = cin;
        this.checkout = cout;
    }
}

class Employee{
    constructor(id, username, cpf, email, password){
        this.id = id;
        this.username = username;
        this.cpf = cpf;
        this.email = email;
        this.password = password;
    }
}

class Customer{
    constructor(id, name, date, cpf, email, password){
        this.id = id;
        this.name = name;
        this.date = date;
        this.cpf = cpf;
        this.email = email;
        this.password = password;
    }
}

class Rooms{
    constructor(beds, price, number, description){
        this.beds = beds;
        this.price = price;
        this.number = number;
        this.description = description;
    }
}

class System{
    constructor(){
        this.input = require('prompt-sync')();
        this.reservations = this.employees = this.customers = this.rooms = this.reviews = []; // Lista de reservas, quartos, clientes e avaliações respectivamente
        this.current = null; // Funcionário ou cliente usando o sistema no momento
    }
    menu(...txt){
        const size = txt.pop();
        let m = '='.repeat(size) + '\n';
        for (let i = 0; i < txt.length; i++){
            m += ' [' + (i+1) + '] ' + txt[i] + '\n';
        }
        m += '='.repeat(size) + '\n';
        return m;
    }
    login(person, email, password){
        if (person.email == email && person.password == password){
            this.current = person;
            return true;
        }
        return false;
    }
    signup(...list){
        if (list.pop()) this.customers.push(new Customer(...list));
        else this.employees.push(new Employee(...list));
    }
    exit(){
        return false;        
    }
    data(){
        console.log('\nMeus Dados\n')
        if (this.current instanceof Customer){
            console.log(`
ID: ${this.current.id}
Nome: ${this.current.name}
Data de nascimento: ${this.current.date}
CPF: ${this.current.cpf}
Email: ${this.current.email}
Senha: ${this.current.password}
`);
        }
        if (this.current instanceof Employee) {
            console.log(`
ID: ${this.current.id}
Nome: ${this.current.username}
CPF: ${this.current.cpf}
Email; ${this.current.email}
Senha: ${this.current.password}
`);
        }
    }
    reservationsList(){
        if (!this.reservations.length){
            console.log('\nLista de Reservas')
            let it = 1;
            for (let r of this.reservations){
                console.log(`
Reserva ${it}
ID Reserva: ${r.id_reservation}
ID Cliente: ${r.id_customer}
Status: ${r.status}
Check-in: ${r.checkin}
Check-out: ${r.checkout}
`);
                it++;
            }
        }
        else console.log('\nNão há reservas\n');
    }
    roomsList(){
        if (!this.rooms.length){
            console.log('\nLista de Quartos\n')
            let it = 1;
            for (let r of this.rooms){
                console.log(`
Quarto ${it}
Quantidade de camas: ${r.beds}
Preço por noite: ${r.price}
Número: ${r.number}
Descrição: ${r.description}
`);
                it++;
            }
        }
        else console.log('\nNão há quartos\n');
    }
    customersList(){
        if (!this.customers.length){
            console.log('\nLista de Clientes\n')
            let it = 1;
            for (let c of this.customers){
                console.log(`
Cliente ${it}
ID: ${c.id}
Nome: ${c.name}
Data de nascimento: ${c.date}
CPF: ${c.cpf}
Email: ${c.email}
Senha: ${c.password}
`);
                it++;
            }
        }
        else console.log('\nNão há clientes\n');
    }
    reservationStatus(){
        const id = this.input('ID da reserva: ');
        console.log(this.menu('Pendente', 'Adiada', 'Realizada', 'Cancelada', 15));
        const st = this.input('Digite aqui: ');
        let ok = false;
        for (let r of this.reservations){
            if (r.id_reservation == id){
                ok = true;
                r.status = st;
                console.log();
                break;
            }
        }
        if (!ok) console.log('\nValor inválido\n');  
    }
    newRoom(){
        console.log('\nNovo Quarto\n');
        this.rooms.push(new Rooms(this.input('Quantidade de camas: '), this.input('Preço por noite: '), this.input('Número do quarto: '), this.input('Descrição breve: ')));
        console.log('\nQuarto criado\n');
    }
    newReservation(){
        console.log('\nNova Reserva\n');
        this.reservations.push(new Reservation(('0r' + this.reservations.length), this.current.id, this.input('Data de entrada: '), this.input('Data de saída: ')));
        console.log('\nReserva realizada\n');
    }
    cancelReseservation(){
        if (this.input('ENTER para confirmação de cancelamento de reserva (Caso contrário, digitar qualquer coisa): ') == ''){
            let ok = false;
            for (let r of this.reservations){
                if (r.id_customer == this.current.id && r.status){
                    ok = true;
                    r.status = 'cancelada';
                    console.log('\nReserva cancelada\n');
                    break;
                }
            }
            if (!ok) console.log('\nNenhuma reserva no seu nome\n')
        }   
    }
    myReservations(){
        console.log('\nMinhas Reservas\n')
        let it = 1;
        let ok = false;
        for (let r of system.reservations){
            if (r.id_customer == system.current.id){
                ok = true;
                console.log(`
Reserva ${it}
ID Reserva: ${r.id_reservation}
ID Cliente: ${r.id_customer}
Status: ${r.status}
Check-in: ${r.checkin}
Check-out: ${r.checkout}
`);
                it++;
            }
        }
        if (!ok) console.log('\nNenhuma reserva no seu nome\n')
    }
    newReview(){
        console.log('\nAvaliação de Estadia\n');
        const score = this.input('Nota de 0 a 10: ');
        const comment = this.input('Comentário breve: ');
        const review = `
Cliente: ${this.current.name}
Nota: ${score}
Comentário: ${comment}
`;
        this.reviews.push(review);
        console.log('\nAvaliação realizada\n');
    }
    reviewsList(){
        if (!this.reviews.length){
            console.log('\nLista de Avaliações\n');
            let it = 1;
            for (let r of this.reviews){
                console.log(`
Avaliação ${it} ${r}`);
                it++;
            }
        }
        else console.log('\nNão há avaliações\n');
    }
    modData(){
        if (this.current instanceof Customer){
            console.log('\nModificar meus dados de cliente\n')
            this.current.name = this.input('Nome: ');
            this.current.date = this.input('Data de nascimento: ');
            this.current.cpf = this.input('CPF: ');
            this.current.email = this.input('Email: ');
            this.current.password = this.input('Senha: ');
        }
        if (this.current instanceof Employee){
            console.log('\nModificar meus dados de funcionário\n');
            this.current.username = this.input('Nome: ');
            this.current.cpf = this.input('CPF: ');
            this.current.email = this.input('Email: ');
            this.current.password = this.input('Senha: ');
        }
        console.log('\nDados modificados\n');
    }
    editRoom(){
        let ok = false;
        console.log('\nEditar Quarto\n');
        const number = this.input('Digite aqui o número do quarto: ');
        for (let r of this.rooms){
            if (r.number == number){
                ok = true;
                this.beds = this.input('Quantidade de camas: ');
                this.price = this.input('Preço por noite: ');
                this.number = this.input('Número do quarto: ');
                this.description = this.input('Descrição breve: ');
                console.log(`\nQuarto ${number} editado\n`);
                break;
            }
        }
        if (!ok) console.log('\nValor inválido\n');  
    }
    delRoom(){
        console.log('\nExcluir Quarto\n');
        const number = this.input('Digite aqui o número do quarto: ');
        let ok = false;
        for (let r of this.rooms){
            if (r.number == number){
                ok = true;
                this.rooms.filter(r);
                console.log(`\nQuarto ${number} removido\n`)
                break;
            }
        }
        if (!ok) console.log('\nValor inválido\n');  
    }
}

const system = new System;
const prompt = require('prompt-sync')();
let run = true;
while (run){
    console.log('='.repeat(36) + '\n Seja bem-vindo(a) ao Hotel F-Luxo!\n' + '='.repeat(36));
    console.log('\n'+ '='.repeat(17) + '\n  MENU INICIAL')
    console.log(system.menu('Funcionário', 'Cliente', 'Sair', 17));
    const answer = Number(prompt('Digite aqui: '));
    switch (answer){
        case 1:
            console.log('\n' + '='.repeat(14) + '\n FUNCIONÁRIO');
            console.log(system.menu('Login', 'Cadastro', 'Sair', 'Voltar', 14));
            const answer2 = Number(prompt('Digite aqui: '));
            switch (answer2){
                case 1:
                    console.log('\nLogin de Funcionário\n')
                    const login = [prompt('Email: '), prompt('Senha: ')];
                    let ok = false;
                    for (let e of system.employees){
                        if (system.login(e, ...login)){
                            ok = true;
                            break;
                        }
                    }
                    if (!ok) console.log('\nUsuário ou senha incorretos\n');
                    while (ok){
                        console.log(`\nOlá, ${system.current.username}! Seja bem-vindo(a)!`);
                        console.log(system.menu('Ver meus dados', 'Ver lista de reservas', 'Ver lista de quartos', 'Ver lista de clientes', 'Mudar status da reserva', 'Adicionar quarto', 'Visualizar avaliações', 'Modificar meus dados', 'Editar quarto', 'Excluir quarto', 'Sair', 29));
                        const answer3 = Number(prompt('Digite aqui: '));
                        switch (answer3){
                            case 1:
                                system.data();
                                break;
                            case 2:
                                system.reservationsList();
                                break;
                            case 3:
                                system.roomsList();
                                break;
                            case 4:
                                system.customersList();
                                break;
                            case 5:
                                system.reservationStatus();
                                break;
                            case 6:
                                system.newRoom();;
                                break;
                            case 7:
                                system.reviewsList();
                                break;
                            case 8:
                                system.modData();
                                break;
                            case 9:
                                system.editRoom();
                                break;
                            case 10:
                                system.delRoom();
                                break;
                            case 11:
                                system.current = null;
                                ok = false;
                                console.log(`\nTchau! Até a próxima!\n`);
                                break;
                            default:
                                console.log('\nValor inválido\n');
                                break;
                        }
                    }
                    break;
                case 2:
                    console.log('\nCadastro de novo funcionário\n');
                    system.signup(('0e' + system.employees.length), prompt('Nome: '), prompt('CPF: '), prompt('Email: '), prompt('Senha: '), 0);
                    console.log('\nNovo funcionário registrado\n');
                    break;
                case 3:
                    system.current = null;
                    run = system.exit();
                    console.log(`\nTchau! Até a próxima!\n`);
                    break;
                case 4:
                    continue;
                default:
                    console.log('\nValor inválido\n');
                    break; 
            }
            break;
        case 2:
            console.log('\n' + '='.repeat(14) + '\n   CLIENTE');
            console.log(system.menu('Login', 'Cadastro', 'Sair', 'Voltar', 14));
            const answer4 = Number(prompt('Digite aqui: '));
            switch (answer4){
                case 1:
                    console.log('\nLogin de Cliente\n')
                    const login = [prompt('Email: '), prompt('Senha: ')];
                    let ok = false;
                    for (let c of system.customers){
                        if (system.login(c, ...login)){
                            ok = true;
                            break;
                        }
                    }
                    if (!ok) console.log('\nUsuário ou senha incorretos\n');
                    while (ok){
                        console.log(`\nOlá, ${system.current.name}! Seja bem-vindo(a)!`);
                        console.log(system.menu('Ver meus dados', 'Ver lista de quartos', 'Fazer reserva', 'Cancelar reserva', 'Ver minhas reservas', 'Avaliar estadia', 'Visualizar avaliações', 'Modificar meus dados', 'Sair', 27));
                        const answer5 = Number(prompt('Digite aqui: '));
                        switch (answer5){
                            case 1:
                                system.data();
                                break;
                            case 2:
                                system.roomsList();
                                break;
                            case 3:
                                system.newReservation();
                                break;
                            case 4:
                                system.cancelReseservation();
                                break;
                            case 5:
                                system.myReservations();
                                break;
                            case 6:
                                system.newReview();
                                break;
                            case 7:
                                system.reviewsList();
                                break;
                            case 8:
                                system.modData();
                                break;
                            case 9:
                                system.current = null;
                                ok = false;
                                console.log(`\nTchau! Até a próxima!\n`);
                                break;
                            default:
                                console.log('\nValor inválido\n');
                                break;
                        }
                    }
                    break;
                case 2:
                    console.log('\nCadastro de novo cliente\n');
                    system.signup(('0c' + system.customers.length), prompt('Nome: '), prompt('Data de nascimento: '), prompt('CPF: '), prompt('Email: '), prompt('Senha: '), 1);
                    console.log('\nNovo cliente resgistrado\n');
                    break;
                case 3:
                    system.current = null;
                    run = system.exit();
                    console.log(`\nTchau! Até a próxima!\n`);
                    break;
                case 4:
                    continue;
                default:
                    console.log('\nValor inválido\n');
                    break; 
            }
            break;
        case 3:
            system.current = null;
            run = system.exit();
            console.log(`\nTchau! Até a próxima!\n`);
            break;
        default: 
            console.log('\nValor inválido\n');
            break;
    }
}