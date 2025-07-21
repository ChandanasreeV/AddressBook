import * as readline from "readline-sync"
import { ContactPerson } from "./model/ContactPerson";
import { AddressBook } from './model/AddressBook';

class AddressBookMain {
    private addressBook: AddressBook;

    constructor() {
        this.addressBook = new AddressBook();
    }

    welcomeToAddressBook(): void {
        console.log("Welcome to the Address Book Program");
    }

    getContactFromUser(): ContactPerson {
        const firstName = readline.question("First name: ");
        const lastName = readline.question("Last name: ");
        const address = readline.question("Address: ");
        const city = readline.question("City: ");
        const state = readline.question("State: ");
        const zipcode = parseInt(readline.question("Zipcode: "));
        const phoneNumber = parseInt(readline.question("Phone Number: "));
        const email = readline.question("Email: ");

        return new ContactPerson(
            firstName,
            lastName,
            address,
            city,
            state,
            zipcode,
            phoneNumber,
            email
        );
    }

    run(): void {
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
