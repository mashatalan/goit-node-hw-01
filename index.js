const { Command } = require('commander');
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require('./contacts');

const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list': {
      const contactList = await listContacts();
      console.dir(contactList);
      break;
    }

    case 'get': {
      const contact = await getContactById(id);
      console.dir(contact);
      break;
    }

    case 'add': {
      const contact = await addContact(name, email, phone);
      console.dir(contact);
      break;
    }

    case 'remove': {
      const contact = await removeContact(id);
      console.dir(contact);
      break;
    }

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

// fix for top level await
(async () => {
  await invokeAction(argv);
})();
