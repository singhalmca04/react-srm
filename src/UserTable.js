import React, { useEffect, useState } from "react";

const UserTable = () => {
  const [users, setUsers] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    fetch("https://seca.vercel.app/find/student")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data);
        setLoading(false);
        console.log(data.data);
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
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.subject}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.marks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
