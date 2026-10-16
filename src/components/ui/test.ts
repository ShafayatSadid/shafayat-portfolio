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


