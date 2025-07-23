"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactPerson = void 0;
class ContactPerson {
    constructor(firstName, lastName, address, city, state, zipcode, phoneNumber, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zipcode = zipcode;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.validateZipcode(zipcode);
        this.validatePhoneNumber(phoneNumber);
        this.validateEmail(email);
    }
    validateZipcode(zipcode) {
        const zipRegex = /^[1-9][0-9]{5}$/;
        if (!zipRegex.test(zipcode.toString())) {
            throw new Error("Invalid Zipcode! It should be a 6-digit number not starting with 0.");
        }
    }
    validatePhoneNumber(phone) {
        const phoneRegex = /^\+91[6-9]\d{9}$/;
        if (!phoneRegex.test(phone)) {
            throw new Error("Invalid Phone Number! It must start with +91 and be followed by a valid 10-digit Indian number.");
        }
    }
    validateEmail(email) {
        const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            throw new Error("Invalid Email Format!");
        }
    }
    toString() {
        return `${this.firstName} ${this.lastName}, ${this.address}, ${this.city}, ${this.state}, ${this.zipcode}, ${this.phoneNumber}, ${this.email}`;
    }
}
exports.ContactPerson = ContactPerson;
