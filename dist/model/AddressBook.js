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
        this.log("✅ Contact added successfully.");
    }
    getAllContacts() {
        if (this.contacts.length === 0) {
            this.log("📭 No contacts available.");
            return;
        }
        this.log("📇 Contact List:");
        this.contacts.forEach((contact, i) => console.log(`${i + 1}. ${contact.toString()}`));
    }
    //* 👉 UC4 - Edit Contact
    editContact(firstName) {
        const contact = this.contacts.find(c => c.firstName === firstName);
        if (!contact)
            return this.log("❌ Contact not found.", false);
        const confirm = this.prompt("Do you want to edit this contact? (yes/no): ").toLowerCase();
        if (confirm !== "yes")
            return this.log("✋ Edit cancelled.", false);
        try {
            const updated = this.getContactFromUser(contact);
            contact.lastName = updated.lastName;
            contact.address = updated.address;
            contact.city = updated.city;
            contact.state = updated.state;
            contact.zipcode = updated.zipcode;
            contact.phoneNumber = updated.phoneNumber;
            contact.email = updated.email;
            this.log("✅ Contact updated successfully.");
            return true;
        }
        catch (error) {
            if (error instanceof Error) {
                this.log(`❌ Error updating contact: ${error.message}`, false);
            }
            else {
                this.log("❌ Unknown error occurred while updating contact.", false);
            }
            return false;
        }
    }
    //* 👉 UC6 - Delete Contact
    deleteContact(firstName) {
        const index = this.contacts.findIndex(c => c.firstName === firstName);
        if (index === -1)
            return this.log("❌ Contact not found.", false);
        const confirm = this.prompt("Are you sure you want to delete this contact? (yes/no): ").toLowerCase();
        if (confirm !== "yes")
            return this.log("✋ Deletion cancelled.", false);
        this.contacts.splice(index, 1);
        this.log("🗑️ Contact deleted successfully.");
        return true;
    }
    //* 👉 UC5 - Add Multiple Contacts
    addMultipleContact() {
        do {
            const contact = this.getContactFromUser();
            this.addContact(contact);
            const addMore = this.prompt("\nDo you want to add more contacts? (yes/no): ").toLowerCase();
            if (addMore !== "yes")
                break;
        } while (true);
    }
    //* 🔧 Helper for safe user input
    prompt(promptText, isNumber = false) {
        while (true) {
            const input = readline.question(promptText).trim();
            if (!input) {
                this.log("❌ Input cannot be empty. Please try again.", false);
                continue;
            }
            if (isNumber && !/^\d+$/.test(input)) {
                this.log("❌ Invalid number. Please enter digits only.", false);
                continue;
            }
            return input;
        }
    }
    //* 🔧 Helper method for uniform logging
    log(message, success = true) {
        console.log(message);
        return success;
    }
    //* 🔧 Get or update contact from user (used in UC1, UC4, UC5)
    getContactFromUser(existingContact) {
        var _a;
        const firstName = (_a = existingContact === null || existingContact === void 0 ? void 0 : existingContact.firstName) !== null && _a !== void 0 ? _a : this.prompt("First Name: ");
        const lastName = this.prompt("Last Name: ");
        const address = this.prompt("Address: ");
        const city = this.prompt("City: ");
        const state = this.prompt("State: ");
        const zipcode = parseInt(this.prompt("Zipcode: ", true));
        const phoneNumber = this.prompt("Phone Number (with +91): ");
        const email = this.prompt("Email: ");
        // Validation using methods from ContactPerson
        const contact = new ContactPerson_1.ContactPerson(firstName, lastName, address, city, state, zipcode, phoneNumber, email);
        contact['validateZipcode'](zipcode);
        contact['validatePhoneNumber'](phoneNumber);
        contact['validateEmail'](email);
        return contact;
    }
}
exports.AddressBook = AddressBook;
