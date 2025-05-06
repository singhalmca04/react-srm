import React, { useEffect, useState } from "react";
const apiUrl = process.env.REACT_APP_API_URL;
const UserTable = () => {
  const [users, setUsers] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    fetch(apiUrl + "/findstudent")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data);
        setLoading(false);
        console.log("users", data.data);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>User List</h2>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Reg  No </th>
            <th>Name</th>
            <th>Aadhar</th>
            <th>Address</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.regno}</td>
              <td>{user.name}</td>
              <td>{user.aadhar}</td>
              <td>{user.address}</td>
              <td>{user.marks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
