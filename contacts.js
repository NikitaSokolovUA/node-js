const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

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
  return await readFile();
}

async function getContactById(contactId) {
  const contacts = await readFile();
  return contacts.find((contact) => contact.id === contactId);
}

async function removeContact(contactId) {
  const contacts = await readFile();
  const filteredContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );

  writeFile(filteredContacts);
}

async function addContact(name, email, phone) {
  const contacts = await readFile();
  const id = nanoid();
  contacts.push({ id, name, email, phone });

  writeFile(contacts);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
