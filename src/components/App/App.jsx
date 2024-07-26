import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, selectContacts } from '../../redux/contactsSlice';
import { selectNameFilter, changeFilter } from '../../redux/filtersSlice';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import SearchBox from '../SearchBox/SearchBox';
import css from './App.module.css';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export default function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectNameFilter);

  useEffect(() => {
    if (contacts.length === 0) {
      initialContacts.forEach(contact => {
        dispatch(addContact(contact));
      });
    }
  }, [contacts, dispatch]);

  const handleAddUser = (newUser) => {
    dispatch(addContact(newUser));
  };

  const handleFilterChange = (filter) => {
    dispatch(changeFilter(filter));
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1 className={css.MainTitle}>Phonebook</h1>
      <ContactForm onAdd={handleAddUser} />
      <SearchBox filter={filter} onFilterChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} />
    </div>
  );
}
