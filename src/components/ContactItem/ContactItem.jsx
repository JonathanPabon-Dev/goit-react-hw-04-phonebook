import React from 'react';
import css from './ContactItem.module.css';
import PropTypes from 'prop-types';

const ContactItem = ({ contact, onDeleteContact }) => {
  return (
    <li id={contact.id} className={css.contact}>
      <div className={css.contactInfo}>
        <span>
          {contact.name}: {contact.number}
        </span>
        <button
          type="button"
          title="Delete"
          onClick={() => onDeleteContact(contact.id)}
          className="btn btn-danger"
        >
          <i className="bi bi-trash3"></i>
        </button>
      </div>
    </li>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object,
  onDeleteContact: PropTypes.func,
};

export default ContactItem;
