import { AddressBook } from './model/AddressBook';
import * as readline from "readline-sync";

class AddressBookMain {
  private addressBook = new AddressBook();

  welcomeToAddressBook(): void {
    console.log("Welcome to the Address Book Program");
  }

  run(): void {
    this.welcomeToAddressBook();

    while (true) {
      console.log("\n--- MENU ---");
      console.log("1. Add Contact");
      console.log("2. View Contacts");
      console.log("3. Edit Contact by First Name");
      console.log("4. Delete Contact by First Name");
      console.log("5. Exit");

      const choice = readline.question("Enter your choice (1-5): ");

      switch (choice) {
        case "1":
          const contact = this.addressBook.getContactFromUser();
          this.addressBook.addContact(contact);
          break;

        case "2":
          this.addressBook.getAllContacts();
          break;

        case "3":
          const nameToEdit = readline.question("Enter first name to edit: ");
          this.addressBook.editContact(nameToEdit);
          break;

        case "4":
          const nameToDelete = readline.question("Enter first name to delete: ");
          this.addressBook.deleteContact(nameToDelete);
          break;

        case "5":
          console.log("Exiting program. Goodbye!");
          return;

        default:
          console.log("Invalid choice. Please select between 1 to 5.");
      }
    }
  }
}

const addressApp = new AddressBookMain();
addressApp.run();
