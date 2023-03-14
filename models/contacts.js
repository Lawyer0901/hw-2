const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join("models", "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    return contacts;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const result = contacts.find((contact) => contact.id === contactId);
    if (!result) {
      return null;
    }
    return result;
  } catch (error) {
    console.log(error.message);
  }
};
const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex((item) => item.id === contactId);
    if (idx === -1) {
      return null;
    }
    contacts[idx] = { contactId, name, email, phone };
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts[idx];
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex((contact) => contact.id === contactId);
    if (idx === -1) {
      return null;
    }
    const [deleteContact] = contacts.splice(idx, 1);
    await updateContact(contacts);
    return deleteContact;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  try {
    const contacts = await listContacts();

    const newContact = [...contacts, { id: v4(), name, email, phone }];

    await fs.writeFile(contactsPath, JSON.stringify(newContact), "utf-8");

    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
