export class ContactPerson {
    constructor(
        public firstName: string,
        public lastName: string,
        public address: string,
        public city: string,
        public state: string,
        public zipcode: number,
        public phoneNumber: number,
        public email: string
    ) {}

    toString(): string {
        return `Name: ${this.firstName} ${this.lastName}, Address: ${this.address}, ${this.city}, ${this.state} - ${this.zipcode}, Phone: ${this.phoneNumber}, Email: ${this.email}`;
    }
}
