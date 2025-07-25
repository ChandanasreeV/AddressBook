import * as readline from "readline-sync";
import { ContactPerson } from "./ContactPerson";

export class AddressBook {
  private contacts: ContactPerson[] = [];
  private cityDictionary: Map<string, ContactPerson[]> = new Map();
  private stateDictionary: Map<string, ContactPerson[]> = new Map();

  addContact(contact: ContactPerson): void {
    const isDuplicate = this.contacts.some(existing => existing.isEqual(contact));
    if (isDuplicate) {
      console.log(" Duplicate contact! This person already exists.");
      return;
    }

    this.contacts.push(contact);
    this.updateDictionaries(contact);
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
      console.log(" Edit cancelled.");
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

      this.refreshDictionaries();
      console.log(" Contact updated successfully.");
      return true;
    } catch (error: unknown) {
      console.log(" Error updating contact:", error instanceof Error ? error.message : error);
      return false;
    }
  }

  deleteContact(firstName: string): void {
    const index = this.contacts.findIndex(c => c.firstName === firstName);
    if (index === -1) {
      console.log(" Contact not found.");
      return;
    }

    const deleted = this.contacts.splice(index, 1)[0];
    this.refreshDictionaries();
    console.log(` Contact '${deleted.firstName}' deleted successfully.`);
  }

  addMultipleContacts(): void {
    do {
      try {
        const newContact = this.getContactFromUser();
        const isDuplicate = this.contacts.some(existing => existing.isEqual(newContact));

        if (isDuplicate) {
          console.log(" Duplicate contact detected! Already exists.");
        } else {
          this.contacts.push(newContact);
          this.updateDictionaries(newContact);
          console.log(" Contact added successfully.");
        }
      } catch (err) {
        console.log(" Failed to add contact:", err instanceof Error ? err.message : err);
      }

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
        console.log(" Invalid format. Try again.");
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

  searchByCityOrState(keyword: string): ContactPerson[] {
    const results = this.contacts.filter(c =>
      c.city.toLowerCase() === keyword.toLowerCase() ||
      c.state.toLowerCase() === keyword.toLowerCase()
    );

    if (results.length === 0) {
      console.log(" No matching contacts found.");
    } else {
      console.log(`\nFound ${results.length} contact(s) in '${keyword}':`);
      results.forEach((c, i) => console.log(`${i + 1}. ${c.toString()}`));

      const cityCount = results.filter(c => c.city.toLowerCase() === keyword.toLowerCase()).length;
      const stateCount = results.filter(c => c.state.toLowerCase() === keyword.toLowerCase()).length;

      console.log(`\nCount by City: ${cityCount}`);
      console.log(`Count by State: ${stateCount}`);
    }

    return results;
  }

  viewCityDictionary(): void {
    console.log("\n--- City Dictionary ---");
    for (const [city, persons] of this.cityDictionary.entries()) {
      console.log(`\n${city} (${persons.length}):`);
      persons.forEach(p => console.log("  - " + p.toString()));
    }
  }

  viewStateDictionary(): void {
    console.log("\n--- State Dictionary ---");
    for (const [state, persons] of this.stateDictionary.entries()) {
      console.log(`\n${state} (${persons.length}):`);
      persons.forEach(p => console.log("  - " + p.toString()));
    }
  }

  private updateDictionaries(contact: ContactPerson): void {
    if (!this.cityDictionary.has(contact.city)) {
      this.cityDictionary.set(contact.city, []);
    }
    this.cityDictionary.get(contact.city)!.push(contact);

    if (!this.stateDictionary.has(contact.state)) {
      this.stateDictionary.set(contact.state, []);
    }
    this.stateDictionary.get(contact.state)!.push(contact);
  }

  private refreshDictionaries(): void {
    this.cityDictionary.clear();
    this.stateDictionary.clear();
    this.contacts.forEach(contact => this.updateDictionaries(contact));
  }
}
