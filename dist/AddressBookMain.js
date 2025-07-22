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
const ContactPerson_1 = require("./model/ContactPerson");
const AddressBook_1 = require("./model/AddressBook");
const readline = __importStar(require("readline-sync"));
class AddressBookMain {
    constructor() {
        this.addressBook = new AddressBook_1.AddressBook();
    }
    welcomeToAddressBook() {
        console.log("👋 Welcome to the Address Book Program");
    }
    // 🔁 DRY Helper method for prompting input with optional validation
    promptInput(message, validator) {
        while (true) {
            const input = readline.question(message).trim();
            if (!input) {
                console.log("❌ Input cannot be empty. Try again.");
                continue;
            }
            if (validator && !validator(input)) {
                console.log("❌ Invalid input format. Try again.");
                continue;
            }
            return input;
        }
    }
    // 🧠 Method to get contact data from user
    getContactFromUser() {
        const firstName = this.promptInput("First Name: ");
        const lastName = this.promptInput("Last Name: ");
        const address = this.promptInput("Address: ");
        const city = this.promptInput("City: ");
        const state = this.promptInput("State: ");
        const zipcode = parseInt(this.promptInput("Zipcode (6 digits): ", input => /^\d{6}$/.test(input)));
        const phoneNumber = this.promptInput("Phone Number (with +91): ", input => /^\+91[6-9]\d{9}$/.test(input));
        const email = this.promptInput("Email: ", input => /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(input));
        return new ContactPerson_1.ContactPerson(firstName, lastName, address, city, state, zipcode, phoneNumber, email);
    }
    run() {
        this.welcomeToAddressBook();
        const personContact = this.getContactFromUser(); // ✅ Valid contact input
        this.addressBook.addContact(personContact); // ✅ Add contact
        this.addressBook.getAllContacts(); // ✅ Show all
        const nameToEdit = this.promptInput("Enter first name to edit: ");
        this.addressBook.editContact(nameToEdit); // ✅ Edit contact
        this.addressBook.getAllContacts(); // ✅ Show all after editing
        const nameToDelete = this.promptInput("Enter name to delete");
        this.addressBook.deleteContact(nameToDelete);
    }
}
// 🟢 Entry point
const addressApp = new AddressBookMain();
addressApp.run();
