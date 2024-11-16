import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  IconButton,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";

const ContactTable = ({ contacts, fetchContacts }) => {
  const [editContactId, setEditContactId] = useState(null);
  const [editedContact, setEditedContact] = useState({});

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/contacts/${id}`);
      fetchContacts();
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const handleEdit = (contact) => {
    setEditContactId(contact._id);
    setEditedContact({ ...contact });
  };

  const handleSave = async () => {
    try {
      console.log("Saving contact with ID:", editContactId);
      console.log("Edited Contact Data:", editedContact);

      // Send PUT request to update contact
      const response = await axios.put(
        `http://localhost:5000/contacts/${editContactId}`,
        editedContact
      );

      console.log("Response from server:", response.data);

      // Reset edit mode and refresh the contact list
      setEditContactId(null);
      fetchContacts();
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedContact((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Job Title</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact._id}>
              <TableCell>
                {editContactId === contact._id ? (
                  <TextField
                    name="firstName"
                    value={editedContact.firstName}
                    onChange={handleChange}
                  />
                ) : (
                  contact.firstName
                )}
              </TableCell>
              <TableCell>
                {editContactId === contact._id ? (
                  <TextField
                    name="lastName"
                    value={editedContact.lastName}
                    onChange={handleChange}
                  />
                ) : (
                  contact.lastName
                )}
              </TableCell>
              <TableCell>
                {editContactId === contact._id ? (
                  <TextField
                    name="email"
                    value={editedContact.email}
                    onChange={handleChange}
                  />
                ) : (
                  contact.email
                )}
              </TableCell>
              <TableCell>
                {editContactId === contact._id ? (
                  <TextField
                    name="phoneNumber"
                    value={editedContact.phoneNumber}
                    onChange={handleChange}
                  />
                ) : (
                  contact.phoneNumber
                )}
              </TableCell>
              <TableCell>
                {editContactId === contact._id ? (
                  <TextField
                    name="company"
                    value={editedContact.company}
                    onChange={handleChange}
                  />
                ) : (
                  contact.company
                )}
              </TableCell>
              <TableCell>
                {editContactId === contact._id ? (
                  <TextField
                    name="jobTitle"
                    value={editedContact.jobTitle}
                    onChange={handleChange}
                  />
                ) : (
                  contact.jobTitle
                )}
              </TableCell>
              <TableCell>
                {editContactId === contact._id ? (
                  <IconButton onClick={handleSave}>
                    <SaveIcon color="primary" />
                  </IconButton>
                ) : (
                  <>
                    <IconButton onClick={() => handleEdit(contact)}>
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(contact._id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={contacts.length}
        rowsPerPage={10}
        page={0}
      />
    </>
  );
};

export default ContactTable;
