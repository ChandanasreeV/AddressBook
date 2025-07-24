import * as readline from "readline-sync";
import { AddressBook } from './model/AddressBook';

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
      console.log("2. View All Contacts");
      console.log("3. Edit Contact");
      console.log("4. Delete Contact");
      console.log("5. Add Multiple Contacts");
      console.log("6. Search by City/State");
      console.log("7. View City Dictionary");
      console.log("8. View State Dictionary");
      console.log("9. Exit");

      const choice = readline.question("Enter your choice (1-9): ");

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
          this.addressBook.addMultipleContacts();
          break;

        case "6":
          const keyword = readline.question("Enter city or state to search: ");
          const results = this.addressBook.searchByCityOrState(keyword);
          if (results.length === 0) {
            console.log(" No matching contacts found.");
          } else {
            results.forEach((c, i) => console.log(`${i + 1}. ${c.toString()}`));
          }
          break;

        case "7":
          this.addressBook.viewCityDictionary();
          break;

        case "8":
          this.addressBook.viewStateDictionary();
          break;

        case "9":
          console.log("Exiting... Goodbye!");
          return;

        default:
          console.log("Invalid choice. Enter between 1 to 9.");
      }
    }
  }
}

const app = new AddressBookMain();
app.run();
