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
        this.addressBookSystem = new Map();
    }
    start() {
        console.log(" Welcome to the Address Book Management System");
        while (true) {
            console.log("\n===== MENU =====");
            console.log("1. Add New Address Book");
            console.log("2. Select Address Book");
            console.log("3. View All Address Book Names");
            console.log("4. Exit");
            const choice = readline.question("Choose an option (1-4): ");
            switch (choice) {
                case "1":
                    this.addNewAddressBook();
                    break;
                case "2":
                    this.selectAddressBook();
                    break;
                case "3":
                    this.listAddressBooks();
                    break;
                case "4":
                    console.log(" Exiting program. Goodbye!");
                    process.exit(0);
                default:
                    console.log(" Invalid option. Try again.");
            }
        }
    }
    addNewAddressBook() {
        const name = readline.question("Enter a unique name for the Address Book: ").trim();
        if (this.addressBookSystem.has(name)) {
            console.log(" Address Book with this name already exists.");
            return;
        }
        const newBook = new AddressBook_1.AddressBook();
        this.addressBookSystem.set(name, newBook);
        console.log(` Address Book '${name}' created.`);
        newBook.addMultipleContacts();
    }
    selectAddressBook() {
        const name = readline.question("Enter the Address Book name to open: ").trim();
        const book = this.addressBookSystem.get(name);
        if (!book) {
            console.log(" No Address Book found with this name.");
            return;
        }
        while (true) {
            console.log(`\n--- Address Book: ${name} ---`);
            console.log("1. Add Contact");
            console.log("2. Edit Contact");
            console.log("3. View Contacts");
            console.log("4. Back to Main Menu");
            const choice = readline.question("Choose an option (1-4): ");
            switch (choice) {
                case "1":
                    book.addMultipleContacts();
                    break;
                case "2":
                    const fname = readline.question("Enter first name of contact to edit: ");
                    book.editContact(fname);
                    break;
                case "3":
                    book.getAllContacts();
                    break;
                case "4":
                    return;
                default:
                    console.log(" Invalid option. Try again.");
            }
        }
    }
    listAddressBooks() {
        console.log("\n Address Books Available:");
        if (this.addressBookSystem.size === 0) {
            console.log("No address books created yet.");
        }
        else {
            for (const name of this.addressBookSystem.keys()) {
                console.log(`- ${name}`);
            }
        }
    }
}
// Run the program
const app = new AddressBookMain();
app.start();
