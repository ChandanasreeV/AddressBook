import * as readline from "readline-sync";
import { ContactPerson } from "./ContactPerson";

export class AddressBook {
  private contacts: ContactPerson[] = [];

  addContact(contact: ContactPerson): void {
    this.contacts.push(contact);
    console.log(" Contact added successfully.");
  }

  getAllContacts(): void {
    if (this.contacts.length === 0) {
      console.log(" No contacts available.");
      return;
    }

    console.log("\n Contact List:");
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

    const confirm = readline.question("Do you want to edit this contact? (yes/no): ").toLowerCase();
    if (confirm !== "yes") {
      console.log("Edit cancelled.");
      return false;
    }

    try {
      const updated = this.getContactFromUser(contact);

      contact.lastName = updated.lastName;
      contact.address = updated.address;
      contact.city = updated.city;
      contact.state = updated.state;
      contact.zipcode = updated.zipcode;
      contact.phoneNumber = updated.phoneNumber;
      contact.email = updated.email;

      console.log(" Contact updated successfully.");
      return true;
    } catch (error: unknown) {
      console.log(" Error updating contact:", error instanceof Error ? error.message : error);
      return false;
    }
  }

  addMultipleContacts(): void {
    do {
      const contact = this.getContactFromUser();
      this.addContact(contact);

      const more = readline.question("Add another contact? (yes/no): ").toLowerCase();
      if (more !== "yes") break;
    } while (true);
  }

  private prompt(promptText: string, validator?: (input: string) => boolean): string {
    while (true) {
      const input = readline.question(promptText).trim();
      if (!input) {
        console.log(" Input cannot be empty.");
        continue;
      }

      if (validator && !validator(input)) {
        console.log(" Invalid format. Please try again.");
        continue;
      }

      return input;
    }
  }

  getContactFromUser(existing?: ContactPerson): ContactPerson {
    const firstName = existing?.firstName ?? this.prompt("First Name: ");
    const lastName = this.prompt("Last Name: ");
    const address = this.prompt("Address: ");
    const city = this.prompt("City: ");
    const state = this.prompt("State: ");
    const zipcode = parseInt(this.prompt("Zipcode (6 digits): ", input => /^[1-9][0-9]{5}$/.test(input)));
    const phoneNumber = this.prompt("Phone Number (+91XXXXXXXXXX): ", input => /^\+91[6-9]\d{9}$/.test(input));
    const email = this.prompt("Email: ", input => /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(input));

    return new ContactPerson(firstName, lastName, address, city, state, zipcode, phoneNumber, email);
  }
}
