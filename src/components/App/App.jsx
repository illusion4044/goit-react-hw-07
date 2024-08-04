import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, addContact } from '../../redux/contactsOps';
import { selectContacts, selectLoading, selectError } from '../../redux/contactsSlice';
import { selectNameFilter, changeFilter } from '../../redux/filtersSlice';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import SearchBox from '../SearchBox/SearchBox';
import css from './App.module.css';

export default function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const filter = useSelector(selectNameFilter);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

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
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ContactForm onAdd={handleAddUser} />
      <SearchBox filter={filter} onFilterChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} />
    </div>
  );
}