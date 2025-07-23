import * as readline from "readline-sync";
import { AddressBook } from "./model/AddressBook";

class AddressBookMain {
  private addressBooks: Map<string, AddressBook> = new Map();

  welcomeToAddressBook(): void {
    console.log("Welcome to the Address Book System");
  }

  run(): void {
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

  private createAddressBook(): void {
    const name = readline.question("Enter a unique name for the Address Book: ").trim();
    if (this.addressBooks.has(name)) {
      console.log("Address Book with this name already exists.");
      return;
    }

    const newBook = new AddressBook();
    this.addressBooks.set(name, newBook);
    console.log(`Address Book '${name}' created successfully.`);
  }

  private openAddressBook(): void {
    const name = readline.question("Enter the Address Book name to open: ").trim();
    const book = this.addressBooks.get(name);
    if (!book) {
      console.log("Address Book not found.");
      return;
    }

    while (true) {
      console.log(`\n Address Book: ${name}`);
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

  private listAddressBooks(): void {
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
