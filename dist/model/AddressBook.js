"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressBook = void 0;
class AddressBook {
    constructor() {
        this.contacts = [];
    }
    addAccount(contact) {
        this.contacts.push(contact);
    }
    getAllContacts() {
        console.log(" Contact List:");
        this.contacts.forEach((contact, i) => console.log(`${i + 1}. ${contact.toString()}`));
    }
}
exports.AddressBook = AddressBook;
