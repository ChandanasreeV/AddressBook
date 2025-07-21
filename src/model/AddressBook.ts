import { ContactPerson } from './ContactPerson';

export class AddressBook {
    private contacts: ContactPerson[] = [];

    addContact(contact: ContactPerson): void {
        this.contacts.push(contact);
    }

    getAllContacts(): ContactPerson[] {
        return this.contacts;
    }
}
