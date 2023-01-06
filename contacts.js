const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const { log } = require("console");

const contactsPath = path.resolve(__dirname, "./db/contacts.json");

async function readFile() {
  const contactsRaw = await fs.readFile(contactsPath);
  const contacts = JSON.parse(contactsRaw);

  return contacts;
}

async function writeFile(db) {
  await fs.writeFile(contactsPath, JSON.stringify(db, null, 2));
}

async function listContacts() {
  try {
    return await readFile();
  } catch (e) {
    console.log(e.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await readFile();
    return contacts.find((contact) => contact.id === contactId);
  } catch (e) {
    console.log(e.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await readFile();
    const filteredContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );

    writeFile(filteredContacts);
  } catch (e) {
    console.log(e.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await readFile();
    const id = nanoid();
    contacts.push({ id, name, email, phone });

    writeFile(contacts);
  } catch (e) {
    console.log(e.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
