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
const AddressBook_1 = require("./model/AddressBook");
class AddressBookMain {
    constructor() {
        this.addressBooks = new Map();
    }
    welcomeToAddressBook() {
        console.log("Welcome to the Address Book System");
    }
    run() {
        this.welcomeToAddressBook();
        while (true) {
            console.log("\n1. Create New Address Book");
            console.log("2. Open Existing Address Book");
            console.log("3. List Address Books");
            console.log("4. Exit");
            const choice = readline.question("Enter your choice: ").trim();
            switch (choice) {
                case "1":
                    this.createAddressBook();
                    break;
                case "2":
                    this.openAddressBook();
                    break;
                case "3":
                    this.listAddressBooks();
                    break;
                case "4":
                    console.log("Exiting the program. Goodbye!");
                    return;
                default:
                    console.log("Invalid choice. Try again.");
            }
        }
    }
    createAddressBook() {
        const name = readline.question("Enter a unique name for the Address Book: ").trim();
        if (this.addressBooks.has(name)) {
            console.log("Address Book with this name already exists.");
            return;
        }
        const newBook = new AddressBook_1.AddressBook();
        this.addressBooks.set(name, newBook);
        console.log(`Address Book '${name}' created successfully.`);
    }
    openAddressBook() {
        const name = readline.question("Enter the Address Book name to open: ").trim();
        const book = this.addressBooks.get(name);
        if (!book) {
            console.log("Address Book not found.");
            return;
        }
        while (true) {
            console.log(`\n📒 Address Book: ${name}`);
            console.log("1. Add Contact");
            console.log("2. Add Multiple Contacts");
            console.log("3. View Contacts");
            console.log("4. Edit Contact");
            console.log("5. Go Back");
            const choice = readline.question("Choose an action: ").trim();
            switch (choice) {
                case "1":
                    const contact = book.getContactFromUser();
                    book.addContact(contact);
                    break;
                case "2":
                    book.addMultipleContact();
                    break;
                case "3":
                    book.getAllContacts();
                    break;
                case "4":
                    const fname = readline.question("Enter First Name to edit: ").trim();
                    book.editContact(fname);
                    break;
                case "5":
                    return;
                default:
                    console.log("Invalid choice. Try again.");
            }
        }
    }
    listAddressBooks() {
        if (this.addressBooks.size === 0) {
            console.log("No Address Books available.");
            return;
        }
        console.log("Existing Address Books:");
        for (const name of this.addressBooks.keys()) {
            console.log("- " + name);
        }
    }
}
// Entry point
const app = new AddressBookMain();
app.run();
