import * as readline from "readline-sync";
import { ContactPerson } from "./ContactPerson";

export class AddressBook {
    private contacts: ContactPerson[] = [];

    // UC1 & UC2 - Add contact
    addAccount(contact: ContactPerson): void {
        this.contacts.push(contact);
    }

    // Show all contacts
    getAllContacts(): void {
        console.log("\nContact List:");
        if (this.contacts.length === 0) {
            console.log("No contacts available.");
        } else {
            this.contacts.forEach((contact, i) => console.log(`${i + 1}. ${contact.toString()}`));
        }
    }

    // UC2 - Get contact input from user
    getContactFromUser(): ContactPerson {
        const firstName = readline.question("First name: ");
        const lastName = readline.question("Second name: ");
        const address = readline.question("Address: ");
        const city = readline.question("City: ");
        const state = readline.question("State: ");
        const zipcode = parseInt(readline.question("Zipcode: "));
        const phoneNumber = parseInt(readline.question("Phone Number: "));
        const email = readline.question("Email: ");
        return new ContactPerson(firstName, lastName, address, city, state, zipcode, phoneNumber, email);
    }

    // UC3 - Edit contact by first name
    editContact(firstName: string, updateDetails: Partial<ContactPerson>): boolean {
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
            } else {
                console.log("Edit cancelled.");
                return false;
            }
        }

        console.log("Contact not found.");
        return false;
    }

    // UC4 - Delete contact by first name
    deleteContactByName(firstName: string): boolean {
        const index = this.contacts.findIndex(c => c.firstName === firstName);

        if (index !== -1) {
            const deleted = this.contacts.splice(index, 1);
            console.log(`\nContact '${deleted[0].firstName} ${deleted[0].lastName}' deleted successfully.`);
            return true;
        } else {
            console.log("\nContact not found. Deletion failed.");
            return false;
        }
    }
}
