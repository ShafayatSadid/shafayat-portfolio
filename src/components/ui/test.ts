const products: { id: number, name: string, price: number, inStock: boolean }[] = [
    { id: 1, name: 'Alu', price: 2323, inStock: true },
    { id: 2, name: 'Kha', price: 2323, inStock: true }
]

const user: {
    name: string;
    contact: { email: string, phone: number };
    hobbies: string[];
} = {
    name: '',
    contact: { email: '', phone: 0 },
    hobbies: []
}

user.name = 'Abbas';
user.contact.email = 'test@gmail.com';
user.hobbies = ['ahla', 'asdfsd', 'asdj'];

const orders: {
    orderId: number;
    items: { productName: string; qty: number }[];
}[] = [
        {
            orderId: 101,
            items: [
                { productName: "চাল", qty: 2 },
                { productName: 'am', qty: 45 }
            ],
        },
        {
            orderId: 102,
            items: [
                { productName: 'jam', qty: 4 },
                { productName: 'kathal', qty: 56 }
            ]
        }
    ];



function great(name: string) {
    return `Hello ${name}`;
}

function add(a: number, b: number): number {
    return a + b;
}

function sayHello(): void {
    console.log('Hello');
}

const double = (n: number): number => n * 2;


function calculateTotal(price: number, qty: number): number {
    return price * qty;
}


function formUser(user: { name: string; age: number }): string {
    return `${user.name} ${(user.age)}`
}

function createProduct(name: string, price: number, inStock: boolean = true): { name: string, price: number, inStock: boolean } {
    return { name, price, inStock }
}

type Task = {
    id: number;
    title: string;
    status: "todo" | "inProgress" | "done";
}

interface User {
    id: number;
    name: string;
    email?: string;
    phone?: string;
}

const tasks: Task[] = [
    { id: 1, title: 'learn how to type typing', status: 'todo' },
    { id: 2, title: 'learn how to declare type', status: 'done' },
    { id: 3, title: 'how to get error', status: 'delete' }
]

const users: User[] = [
    { id: 1, name: 'ornod', email: 'email@gmail.com' }
]

function notify(notification: { message: string, type: "info" | "warning" | "error", duration?: number }): string {
    return notification.type.toLocaleUpperCase()
}


interface Person {
    name: string;
    age: number;
}

interface Employee extends Person {
    employeeId: number;
    department: string;
}

const person: Person = {
    name: 'Galib',
    age: 12
}

const employee: Employee = {
    name: 'Habib',
    age: 34,
    employeeId: 1,
    department: 'figix'
}

type Fun = {
    id: number;
    title: string;
    status: 'done' | 'in-progress' | 'cancel';
}

type NewFun = Fun &{
    dueDate: string
}

const fun: NewFun ={
    id:2,
    title: 'abul',
    status: 'done',
    dueDate: '12/323/23'
}

