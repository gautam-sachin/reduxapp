import React from "react";
import { useSelector } from "react-redux";
import EditForm from "./EditForm";
import DeleteForm from "./DeleteForm";

function UserList({ handleShowForm, setInputValue, setLabel }) {
  const userList = useSelector((store) => store.users);

  //
  return (
    <div>
      {userList.length ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Message</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user, index) => (
              <tr key={user.id}>
                <th scope="row">{user.id}</th>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.message}</td>
                <td>
                  <EditForm 
                   handleShowForm ={handleShowForm}
                    user={user}
                    setInputValue={setInputValue}
                    setLabel={setLabel}
                    />
                </td>
                <td>
                  <DeleteForm index={index} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center mt-4">No User</p>
      )}
    </div>
  );
}

export default UserList;
