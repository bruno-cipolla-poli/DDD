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
        this.reservations = this.employees = this.customers = this.rooms = []; // Lista de reservas, quartos e clientes, respectivamente
        this.current = null; // Funcionário ou cliente usando o sistema no momento
    }
    menu(...txt){
        const size = txt.pop();
        let m = '\n' + '='.repeat(size) + '\n';
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
        if (list.pop()) this.customers.push(new Customer());
        else this.employees.push(new Employee());
    }
    exit(){
        return true;        
    }
    run(){
        const prompt = require('prompt-sync')();
        let exit = false;
        while (!exit){
            console.log('\n' + '='.repeat(36) + '\n Seja bem-vindo(a) ao Hotel F-Luxo!\n' + '='.repeat(36));
            console.log(this.menu('Funcionário', 'Cliente', 'Sair', 'Voltar', 17));
            const answer = Number(prompt('Digite aqui: '));
            switch (answer){
                case 1:
                    console.log(this.menu('Login', 'Cadastro', 'Sair', 'Voltar', 14));
                    const answer2 = Number(prompt('Digite aqui: '));
                    switch (answer2){
                        case 1:
                            const login = [prompt('Email: '), prompt('Senha: ')];
                            let ok = false;
                            for (let e of this.employees){
                                if (this.login(e, ...login)){
                                    ok = true;
                                    break;
                                }
                            }
                            if (ok){
                                console.log(`\nOlá, ${e.username}! Seja bem-vindo(a)!\n`);
                                console.log(this.menu('Ver meus dados', 'Ver lista de reservas', 'Ver lista de quartos', 'Ver lista de clientes', 'Mudar status da reserva', 'Adicionar quarto', 'Sair', 'Voltar', 29));
                                const answer3 = Number(prompt('Digite aqui: '));
                                switch (answer3){
                                    case 1:
                                        console.log(this.current);
                                        break;
                                    case 2:
                                        console.log(this.reservations);
                                        break;
                                    case 3:
                                        console.log(this.rooms);
                                        break;
                                    case 4:
                                        console.log(this.customers);
                                        break;
                                    case 5:
                                        const id = prompt('ID da reserva: ');
                                        console.log(this.menu('Pendente', 'Adiada', ' Realizada', 'Cancelada', 15));
                                        const st = prompt('Digite aqui: ');
                                        for (let r of this.reservations) if (r.id_reservation == id) r.status = st;
                                        break;
                                    case 6:
                                        this.rooms.push(new Rooms(prompt('Quantidade de camas: '), prompt('Preço por noite: '), prompt('Número do quarto: '), prompt('Descrição breve: ')));
                                        break;
                                    case 7:
                                        this.current = null;
                                        exit = this.exit();
                                        console.log(`\nTchau! Até a próxima!\n`);
                                        break;
                                    case 8:
                                        console.log
                                        continue;
                                    default:
                                        console.log('\nValor inválido\n');
                                        break;
                                }
                            }
                            else console.log('\nUsuário ou senha incorretos\n');
                            break;
                        case 2:
                            this.signup(('0e' + this.employees.length), prompt('Nome: '), prompt('CPF: '), prompt('Email: '), prompt('Senha: '), 0);
                            break;
                        case 3:
                            this.current = null;
                            exit = this.exit();
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
                    console.log(this.menu('Login', 'Cadastro', 'Sair', 'Voltar', 14));
                    const answer4 = Number(prompt('Digite aqui: '));
                    switch (answer4){
                        case 1:
                            const login = [prompt('Email: '), prompt('Senha: ')];
                            let ok = false;
                            for (let c of this.customers){
                                if (this.login(c, ...login)){
                                    ok = true;
                                    break;
                                }
                            }
                            if (ok){
                                console.log(`\nOlá, ${c.name}! Seja bem-vindo(a)!\n`);
                                console.log(this.menu('Ver meus dados', 'Ver lista de quartos', 'Fazer reserva', 'Cancelar reserva', 'Ver minhas reservas', 'Sair', 'Voltar', 25));
                                const answer5 = Number(prompt('Digite aqui: '));
                                switch (answer5){
                                    case 1:
                                        console.log(this.current);
                                        break;
                                    case 2:
                                        console.log(this.rooms);
                                        break;
                                    case 3:
                                        this.reservations.push(new Reservation(('0r' + this.reservations.length), this.current.id, prompt('Data de entrada: '), prompt('Data de saída: ')));
                                        break;
                                    case 4:
                                        for (let r of this.reservations) if (r.id_customer == this.current.id) r.status('cancelada');
                                        break;
                                    case 5:
                                        for (let r of this.reservations) if (r.id_customer == this.current.id) console.log(r);
                                        break;
                                    case 6:
                                        this.current = null;
                                        exit = this.exit();
                                        console.log(`\nTchau! Até a próxima!\n`);
                                        break;
                                    case 7:
                                        continue;
                                    default:
                                        console.log('\nValor inválido\n');
                                        break;
                                }
                            }
                            else console.log('\nUsuário ou senha incorretos\n');
                            break;
                        case 2:
                            this.signup(('0c' + this.customers.length), prompt('Nome: '), prompt('Data de nascimento: '), prompt('CPF: '), prompt('Email: '), prompt('Senha: '), 1);
                            break;
                        case 3:
                            this.current = null;
                            exit = this.exit();
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
                    this.current = null;
                    exit = this.exit();
                    console.log(`\nTchau! Até a próxima!\n`);
                    break;
                case 4:
                    continue;
                default: 
                    console.log('\nValor inválido\n');
                    break;
            }
        }
    }      
}

const system = new System;
system.run();
