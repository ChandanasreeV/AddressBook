import * as readline from "readline-sync";
import { AddressBook } from './model/AddressBook';

class AddressBookMain {
  private addressBookSystem: Map<string, AddressBook> = new Map();

  start(): void {
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

  private addNewAddressBook(): void {
    const name = readline.question("Enter a unique name for the Address Book: ").trim();
    if (this.addressBookSystem.has(name)) {
      console.log(" Address Book with this name already exists.");
      return;
    }

    const newBook = new AddressBook();
    this.addressBookSystem.set(name, newBook);
    console.log(` Address Book '${name}' created.`);

    newBook.addMultipleContacts();
  }

  private selectAddressBook(): void {
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

  private listAddressBooks(): void {
    console.log("\n Address Books Available:");
    if (this.addressBookSystem.size === 0) {
      console.log("No address books created yet.");
    } else {
      for (const name of this.addressBookSystem.keys()) {
        console.log(`- ${name}`);
      }
    }
  }
}

// Run the program
const app = new AddressBookMain();
app.start();
