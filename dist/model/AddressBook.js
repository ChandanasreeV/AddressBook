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
        console.log("✅ Contact added successfully.");
    }
    getAllContacts() {
        if (this.contacts.length === 0) {
            console.log("ℹ️ No contacts available.");
            return;
        }
        console.log("\n📒 Contact List:");
        this.contacts.forEach((contact, i) => console.log(`${i + 1}. ${contact.toString()}`));
    }
    editContact(firstName) {
        const contact = this.contacts.find(c => c.firstName === firstName);
        if (!contact) {
            console.log("❌ Contact not found.");
            return false;
        }
        const confirm = readline.question("Do you want to edit this contact? (yes/no): ").toLowerCase();
        if (confirm !== "yes") {
            console.log("ℹ️ Edit cancelled.");
            return false;
        }
        try {
            const updated = this.getContactFromUser(contact);
            contact.lastName = updated.lastName;
            contact.address = updated.address;
            contact.city = updated.city;
            contact.state = updated.state;
            contact.zipcode = updated.zipcode;
            contact.phoneNumber = updated.phoneNumber;
            contact.email = updated.email;
            console.log("✅ Contact updated successfully.");
            return true;
        }
        catch (error) {
            console.log("❌ Error updating contact:", error instanceof Error ? error.message : error);
            return false;
        }
    }
    addMultipleContacts() {
        do {
            const contact = this.getContactFromUser();
            this.addContact(contact);
            const more = readline.question("Add another contact? (yes/no): ").toLowerCase();
            if (more !== "yes")
                break;
        } while (true);
    }
    prompt(promptText, validator) {
        while (true) {
            const input = readline.question(promptText).trim();
            if (!input) {
                console.log("⚠️ Input cannot be empty.");
                continue;
            }
            if (validator && !validator(input)) {
                console.log("⚠️ Invalid format. Please try again.");
                continue;
            }
            return input;
        }
    }
    getContactFromUser(existing) {
        var _a;
        const firstName = (_a = existing === null || existing === void 0 ? void 0 : existing.firstName) !== null && _a !== void 0 ? _a : this.prompt("First Name: ");
        const lastName = this.prompt("Last Name: ");
        const address = this.prompt("Address: ");
        const city = this.prompt("City: ");
        const state = this.prompt("State: ");
        const zipcode = parseInt(this.prompt("Zipcode (6 digits): ", input => /^[1-9][0-9]{5}$/.test(input)));
        const phoneNumber = this.prompt("Phone Number (+91XXXXXXXXXX): ", input => /^\+91[6-9]\d{9}$/.test(input));
        const email = this.prompt("Email: ", input => /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(input));
        return new ContactPerson_1.ContactPerson(firstName, lastName, address, city, state, zipcode, phoneNumber, email);
    }
}
exports.AddressBook = AddressBook;
