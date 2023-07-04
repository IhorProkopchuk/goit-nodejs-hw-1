const { Command } = require("commander");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
      case "list":
        const contacts = await listContacts();
        console.table(contacts);
        break;

      case "get":
        const contactById = await getContactById(id);
        console.log(contactById);
        break;

      case "add":
        const newContact = await addContact(name, email, phone);
        console.log(newContact);
        break;

      case "remove":
        const removedContact = await removeContact(id);
        if (!removedContact) {
          return console.log(null);
        }
        console.log(`removed contact with ID: ${id}`);
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
};

invokeAction(argv);
