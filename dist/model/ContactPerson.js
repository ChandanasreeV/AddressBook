"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactPerson = void 0;
class ContactPerson {
    constructor(firstName, lastName, address, city, state, zipcode, phoneNumber, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zipcode = zipcode;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }
    toString() {
        return `${this.firstName} ${this.lastName}, ${this.city}, ${this.state}, ${this.zipcode}, ${this.phoneNumber}, ${this.email}`;
    }
}
exports.ContactPerson = ContactPerson;
