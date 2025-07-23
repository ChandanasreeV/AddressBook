import * as readline from "readline-sync";
import { ContactPerson } from "./ContactPerson";

export class AddressBook {
  private contacts: ContactPerson[] = [];

  addContact(contact: ContactPerson): void {
    this.contacts.push(contact);
    console.log("Contact added successfully.");
  }

  getAllContacts(): void {
    if (this.contacts.length === 0) {
      console.log("No contacts available.");
      return;
    }

    console.log("Contact List:");
    this.contacts.forEach((contact, i) =>
      console.log(`${i + 1}. ${contact.toString()}`)
    );
  }

  getContactFromUser(): ContactPerson {
    const firstName = this.prompt("First Name: ");
    const lastName = this.prompt("Last Name: ");
    const address = this.prompt("Address: ");
    const city = this.prompt("City: ");
    const state = this.prompt("State: ");
    const zipcodeStr = this.prompt("Zipcode (6 digits): ", true);
    const phoneNumber = this.prompt("Phone Number (+91XXXXXXXXXX): ");
    const email = this.prompt("Email: ");

    const zipcode = parseInt(zipcodeStr);

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

  editContact(firstName: string): boolean {
    const contact = this.contacts.find(c => c.firstName === firstName);

    if (!contact) {
      console.log("Contact not found.");
      return false;
    }

    const confirm = this.prompt("Do you want to edit this contact? (yes/no): ").toLowerCase();
    if (confirm !== "yes") {
      console.log("Edit cancelled.");
      return false;
    }

    try {
      const lastName = this.prompt("Last Name: ");
      const address = this.prompt("Address: ");
      const city = this.prompt("City: ");
      const state = this.prompt("State: ");
      const zipcodeStr = this.prompt("Zipcode (6 digits): ", true);
      const phoneNumber = this.prompt("Phone Number (+91XXXXXXXXXX): ");
      const email = this.prompt("Email: ");

      const updatedZip = parseInt(zipcodeStr);

      contact.validateZipcode(updatedZip);
      contact.validatePhoneNumber(phoneNumber);
      contact.validateEmail(email);

      contact.lastName = lastName;
      contact.address = address;
      contact.city = city;
      contact.state = state;
      contact.zipcode = updatedZip;
      contact.phoneNumber = phoneNumber;
      contact.email = email;

      console.log("Contact updated successfully.");
      return true;
    } catch (error: any) {
      console.error("Error updating contact:", error.message);
      return false;
    }
  }

  deleteContact(firstName: string): boolean {
    const contactIndex = this.contacts.findIndex(c => c.firstName === firstName);

    if (contactIndex === -1) {
      console.log("Contact not found.");
      return false;
    }

    const confirm = this.prompt("Are you sure you want to delete this contact? (yes/no): ").toLowerCase();
    if (confirm !== "yes") {
      console.log("Deletion cancelled.");
      return false;
    }

    this.contacts.splice(contactIndex, 1);
    console.log("Contact deleted successfully.");
    return true;
  }

  private prompt(promptText: string, isNumber: boolean = false): string {
    while (true) {
      const input = readline.question(promptText).trim();

      if (!input) {
        console.log("Input cannot be empty. Please try again.");
        continue;
      }

      if (isNumber && !/^\d+$/.test(input)) {
        console.log("Invalid number. Please enter digits only.");
        continue;
      }

      return input;
    }
  }
}
