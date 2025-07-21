"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline-sync"));
const ContactPerson_1 = require("./model/ContactPerson");
const AddressBook_1 = require("./model/AddressBook");
class AddressBookMain {
    constructor() {
        this.addressBook = new AddressBook_1.AddressBook();
    }
    welcomeToAddressBook() {
        console.log("Welcome to the Address Book Program");
    }
    getContactFromUser() {
        const firstName = readline.question("First name: ");
        const lastName = readline.question("Last name: ");
        const address = readline.question("Address: ");
        const city = readline.question("City: ");
        const state = readline.question("State: ");
        const zipcode = parseInt(readline.question("Zipcode: "));
        const phoneNumber = parseInt(readline.question("Phone Number: "));
        const email = readline.question("Email: ");
        return new ContactPerson_1.ContactPerson(firstName, lastName, address, city, state, zipcode, phoneNumber, email);
    }
    run() {
        this.welcomeToAddressBook();
        const personContact = this.getContactFromUser();
        this.addressBook.addContact(personContact);
        const contacts = this.addressBook.getAllContacts();
        console.log("\nAll Contacts in Address Book:");
        for (const contact of contacts) {
            console.log(contact.toString());
        }
    }
}
const addressApp = new AddressBookMain();
addressApp.run();
