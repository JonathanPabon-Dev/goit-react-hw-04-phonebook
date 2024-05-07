import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) || []
  );
  const [filter, setFilter] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    if (name === 'name') {
      setContactName(value);
    } else if (name === 'number') {
      setContactNumber(value);
    }
  };

  const idExists = id => {
    return contacts.some(contact => contact.id === `id-${id}`);
  };

  const contactExists = name => {
    return contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  const generateId = () => {
    const randomId = Math.floor(Math.random() * 10000);
    return randomId.toString().padStart(4, '0');
  };

  const handleAddContact = () => {
    if (contactExists(filter)) {
      alert(`${filter} is already in contacts.`);
    } else {
      let newId = generateId();
      while (idExists(newId)) {
        newId = generateId();
      }
      const newContact = {
        id: `id-${newId}`,
        name: contactName,
        number: contactNumber,
      };
      setContacts(prevContacts => [...prevContacts, newContact]);
    }
    setContactName('');
    setContactNumber('');
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const handleDeleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  return (
    <>
      <h1 className="mt-5">Phonebook</h1>
      <ContactForm
        filter={filter}
        onInputChange={handleInputChange}
        onAddContact={handleAddContact}
      />

      <h2 className="mt-5">Contacts</h2>
      <Filter filter={filter} onFilterChange={handleFilterChange} />
      <ContactList
        filter={filter}
        contacts={contacts}
        onDeleteContact={handleDeleteContact}
      />
    </>
  );
};

export default App;
