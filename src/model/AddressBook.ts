import * as readline from "readline-sync";
import { ContactPerson } from "./ContactPerson";

export class AddressBook {
  private contacts: ContactPerson[] = [];
  private contacts: ContactPerson[] = [];

  addContact(contact: ContactPerson): void {
    this.contacts.push(contact);
    this.log("Contact added successfully.");
  }
  addContact(contact: ContactPerson): void {
    this.contacts.push(contact);
    console.log(" Contact added successfully.");
  }

  getAllContacts(): void {
    if (this.contacts.length === 0) {
      this.log("No contacts available.");
      return;
    }

    this.log("Contact List:");
    this.contacts.forEach((contact, i) =>
      console.log(`${i + 1}. ${contact.toString()}`)
    );
  }

  //* UC4 - Edit Contact
  editContact(firstName: string): boolean {
    const contact = this.contacts.find(c => c.firstName === firstName);
    if (!contact) return this.log("Contact not found.", false);

    const confirm = this.prompt("Do you want to edit this contact? (yes/no): ").toLowerCase();
    if (confirm !== "yes") return this.log("Edit cancelled.", false);

    try {
      const updated = this.getContactFromUser(contact);

      contact.lastName = updated.lastName;
      contact.address = updated.address;
      contact.city = updated.city;
      contact.state = updated.state;
      contact.zipcode = updated.zipcode;
      contact.phoneNumber = updated.phoneNumber;
      contact.email = updated.email;

      this.log(" Contact updated successfully.");
      return true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.log(`Error updating contact: ${error.message}`, false);
      } else {
        this.log("Unknown error occurred while updating contact.", false);
      }
      return false;
    }
  }
  getAllContacts(): void {
    if (this.contacts.length === 0) {
      console.log(" No contacts available.");
      return;
    }

    console.log(" Contact List:");
    this.contacts.forEach((contact, i) =>
      console.log(`${i + 1}. ${contact.toString()}`)
    );
  }

  editContact(firstName: string): boolean {
    const contact = this.contacts.find(c => c.firstName === firstName);

    if (!contact) {
      console.log(" Contact not found.");
      return false;
    }

    const confirm = this.prompt("Do you want to edit this contact? (yes/no): ").toLowerCase();
    if (confirm !== "yes") {
      console.log(" Edit cancelled.");
      return false;
    }
 
    try {
      const lastName = this.prompt("Last Name: ");
      const address = this.prompt("Address: ");
      const city = this.prompt("City: ");
      const state = this.prompt("State: ");
      const zipcodeStr = this.prompt("Zipcode: ", true);
      const phoneNumber = this.prompt("Phone Number (with +91): ");
      const email = this.prompt("Email: ");

      // Validate manually using helper methods
      const updatedZip = parseInt(zipcodeStr);
      contact['validateZipcode'](updatedZip);
      contact['validatePhoneNumber'](phoneNumber);
      contact['validateEmail'](email);

      // Now update the fields
      contact.lastName = lastName;
      contact.address = address;
      contact.city = city;
      contact.state = state;
      contact.zipcode = updatedZip;
      contact.phoneNumber = phoneNumber;
      contact.email = email;

      console.log(" Contact updated successfully.");
      return true;
    } catch (error: any) {
      console.error(" Error updating contact:", error.message);
      return false;
    }
  }

  //* UC6 - Delete Contact
  deleteContact(firstName: string): boolean {
    const index = this.contacts.findIndex(c => c.firstName === firstName);
    if (index === -1) return this.log("Contact not found.", false);

    const confirm = this.prompt("Are you sure you want to delete this contact? (yes/no): ").toLowerCase();
    if (confirm !== "yes") return this.log(" Deletion cancelled.", false);

    this.contacts.splice(index, 1);
    this.log("Contact deleted successfully.");
    return true;
  }

  //* UC5 - Add Multiple Contacts
  addMultipleContact(): void {
    do {
      const contact = this.getContactFromUser();
      this.addContact(contact);
      const addMore = this.prompt("\nDo you want to add more contacts? (yes/no): ").toLowerCase();
      if (addMore !== "yes") break;
    } while (true);
  }

  //* Helper for safe user input
  private prompt(promptText: string, isNumber: boolean = false): string {
    while (true) {
      const input = readline.question(promptText).trim();
      if (!input) {
        this.log("Input cannot be empty. Please try again.", false);
        continue;
      }

      if (isNumber && !/^\d+$/.test(input)) {
        this.log("Invalid number. Please enter digits only.", false);
        continue;
      }

      return input;
    }
  }

  //* Helper method for uniform logging
  private log(message: string, success: boolean = true): boolean {
    console.log(message);
    return success;
  }

  //* Get or update contact from user (used in UC1, UC4, UC5)
  getContactFromUser(existingContact?: ContactPerson): ContactPerson {
    const firstName = existingContact?.firstName ?? this.prompt("First Name: ");
    const lastName = this.prompt("Last Name: ");
    const address = this.prompt("Address: ");
    const city = this.prompt("City: ");
    const state = this.prompt("State: ");
    const zipcode = parseInt(this.prompt("Zipcode: ", true));
    const phoneNumber = this.prompt("Phone Number (with +91): ");
    const email = this.prompt("Email: ");

    // Validation using methods from ContactPerson
    const contact = new ContactPerson(firstName, lastName, address, city, state, zipcode, phoneNumber, email);
    contact['validateZipcode'](zipcode);
    contact['validatePhoneNumber'](phoneNumber);
    contact['validateEmail'](email);

    return contact;
  }
}
  private prompt(promptText: string, isNumber: boolean = false): string {
    while (true) {
      const input = readline.question(promptText).trim();

      if (!input) {
        console.log(" Input cannot be empty. Please try again.");
        continue;
      }

      if (isNumber) {
        if (!/^\d+$/.test(input)) {
          console.log(" Invalid number. Please enter digits only.");
          continue;
        }
      }

      return input;
    }
  }
   deleteContact(firstName: string): boolean {
    const contactIndex = this.contacts.findIndex(c => c.firstName === firstName);

    if (contactIndex === -1) {
      console.log(" Contact not found.");
      return false;
    }

    const confirm = this.prompt("Are you sure you want to delete this contact? (yes/no): ").toLowerCase();
    if (confirm !== "yes") {
      console.log(" Deletion cancelled.");
      return false;
    }

    this.contacts.splice(contactIndex, 1);
    console.log(" Contact deleted successfully.");
    return true;
  }

  
}