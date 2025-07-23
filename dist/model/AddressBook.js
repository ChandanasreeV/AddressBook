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
    addContact(contact) {
        this.contacts.push(contact);
        console.log("Contact added successfully.");
    }
    getAllContacts() {
        if (this.contacts.length === 0) {
            console.log("No contacts available.");
            return;
        }
        console.log("Contact List:");
        this.contacts.forEach((contact, i) => console.log(`${i + 1}. ${contact.toString()}`));
    }
    getContactFromUser() {
        const firstName = this.prompt("First Name: ");
        const lastName = this.prompt("Last Name: ");
        const address = this.prompt("Address: ");
        const city = this.prompt("City: ");
        const state = this.prompt("State: ");
        const zipcodeStr = this.prompt("Zipcode (6 digits): ", true);
        const phoneNumber = this.prompt("Phone Number (+91XXXXXXXXXX): ");
        const email = this.prompt("Email: ");
        const zipcode = parseInt(zipcodeStr);
        return new ContactPerson_1.ContactPerson(firstName, lastName, address, city, state, zipcode, phoneNumber, email);
    }
    editContact(firstName) {
        const contact = this.contacts.find(c => c.firstName === firstName);
        if (!contact) {
            console.log("Contact not found.");
            return false;
        }
        const confirm = this.prompt("Do you want to edit this contact? (yes/no): ").toLowerCase();
        if (confirm !== "yes") {
            console.log("Edit cancelled.");
            return false;
        }
        try {
            const lastName = this.prompt("Last Name: ");
            const address = this.prompt("Address: ");
            const city = this.prompt("City: ");
            const state = this.prompt("State: ");
            const zipcodeStr = this.prompt("Zipcode (6 digits): ", true);
            const phoneNumber = this.prompt("Phone Number (+91XXXXXXXXXX): ");
            const email = this.prompt("Email: ");
            const updatedZip = parseInt(zipcodeStr);
            contact.validateZipcode(updatedZip);
            contact.validatePhoneNumber(phoneNumber);
            contact.validateEmail(email);
            contact.lastName = lastName;
            contact.address = address;
            contact.city = city;
            contact.state = state;
            contact.zipcode = updatedZip;
            contact.phoneNumber = phoneNumber;
            contact.email = email;
            console.log("Contact updated successfully.");
            return true;
        }
        catch (error) {
            console.error("Error updating contact:", error.message);
            return false;
        }
    }
    deleteContact(firstName) {
        const contactIndex = this.contacts.findIndex(c => c.firstName === firstName);
        if (contactIndex === -1) {
            console.log("Contact not found.");
            return false;
        }
        const confirm = this.prompt("Are you sure you want to delete this contact? (yes/no): ").toLowerCase();
        if (confirm !== "yes") {
            console.log("Deletion cancelled.");
            return false;
        }
        this.contacts.splice(contactIndex, 1);
        console.log("Contact deleted successfully.");
        return true;
    }
    prompt(promptText, isNumber = false) {
        while (true) {
            const input = readline.question(promptText).trim();
            if (!input) {
                console.log("Input cannot be empty. Please try again.");
                continue;
            }
            if (isNumber && !/^\d+$/.test(input)) {
                console.log("Invalid number. Please enter digits only.");
                continue;
            }
            return input;
        }
    }
}
exports.AddressBook = AddressBook;
