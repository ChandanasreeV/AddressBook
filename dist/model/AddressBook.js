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
exports.AddressBook = void 0;
const readline = __importStar(require("readline-sync"));
const ContactPerson_1 = require("./ContactPerson");
class AddressBook {
    constructor() {
        this.contacts = [];
    }
    // UC1 & UC2 - Add contact
    addAccount(contact) {
        this.contacts.push(contact);
    }
    // Show all contacts
    getAllContacts() {
        console.log("\nContact List:");
        if (this.contacts.length === 0) {
            console.log("No contacts available.");
        }
        else {
            this.contacts.forEach((contact, i) => console.log(`${i + 1}. ${contact.toString()}`));
        }
    }
    // UC2 - Get contact input from user
    getContactFromUser() {
        const firstName = readline.question("First name: ");
        const lastName = readline.question("Second name: ");
        const address = readline.question("Address: ");
        const city = readline.question("City: ");
        const state = readline.question("State: ");
        const zipcode = parseInt(readline.question("Zipcode: "));
        const phoneNumber = parseInt(readline.question("Phone Number: "));
        const email = readline.question("Email: ");
        return new ContactPerson_1.ContactPerson(firstName, lastName, address, city, state, zipcode, phoneNumber, email);
    }
    // UC3 - Edit contact by first name
    editContact(firstName, updateDetails) {
        const contact = this.contacts.find(c => c.firstName === firstName);
        if (contact) {
            console.log("\nDo you want to edit this contact?");
            const choice = readline.question("Type 'yes' to edit: ").toLowerCase();
            if (choice === 'yes') {
                const newLastName = readline.question("Second name: ");
                const newAddress = readline.question("Address: ");
                const newCity = readline.question("City: ");
                const newState = readline.question("State: ");
                const newZipcode = parseInt(readline.question("Zipcode: "));
                const newPhoneNumber = parseInt(readline.question("Phone Number: "));
                const newEmail = readline.question("Email: ");
                Object.assign(contact, {
                    lastName: newLastName,
                    address: newAddress,
                    city: newCity,
                    state: newState,
                    zipcode: newZipcode,
                    phoneNumber: newPhoneNumber,
                    email: newEmail,
                });
                console.log("Contact updated successfully.");
                return true;
            }
            else {
                console.log("Edit cancelled.");
                return false;
            }
        }
        console.log("Contact not found.");
        return false;
    }
    // UC4 - Delete contact by first name
    deleteContactByName(firstName) {
        const index = this.contacts.findIndex(c => c.firstName === firstName);
        if (index !== -1) {
            const deleted = this.contacts.splice(index, 1);
            console.log(`\nContact '${deleted[0].firstName} ${deleted[0].lastName}' deleted successfully.`);
            return true;
        }
        else {
            console.log("\nContact not found. Deletion failed.");
            return false;
        }
    }
}
exports.AddressBook = AddressBook;
