import React from 'react';
import EditIcon from "@mui/icons-material/Edit";

function EditForm({ user, handleShowForm, setInputValue, setLabel }) { 
  const onClickEdit = () => {
    handleShowForm(true);
    setLabel(false);
    setInputValue({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      message: user.message,
    }); 
  }
  return (
    <div><EditIcon onClick={onClickEdit} /></div>
  );
}

export default EditForm;