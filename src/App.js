import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [usersLoaded, setUsersLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    try {
      let response = await fetch("https://randomuser.me/api/?results=15");
      let json = await response.json();
      return { success: true, data: json };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  };

  const removeUser = (u) => {
    setUsers(users.filter((user) => user !== u));
  };

  useEffect(() => {
    (async () => {
      setUsersLoaded(false);
      let res = await fetchUsers();
      if (res.success) {
        setUsers(res.data.results);
        setUsersLoaded(true);
      }
    })();
  }, []);

  return (
    <div className="App">
      <div className="Main">
        <h1>Perfiles de usuario</h1>
        <input
          type="text"
          placeholder="Search..."
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
        <div className="Result">
          {usersLoaded ? (
            users
              .filter((res) => {
                if (searchTerm == "") {
                  return res;
                } else if (
                  res.name.first
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  res.name.last
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  res.email.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return res;
                }
              })
              .map((user, key) => {
                return (
                  <div className="User" key={key}>
                    <div className="Remove" onClick={() => removeUser(user)}>
                      x
                    </div>
                    <img src={user.picture.medium} alt="User" />
                    <p>{user.name.first + " " + user.name.last}</p>
                    <p>{user.cell}</p>
                    <p>{user.email}</p>
                    <p>
                      {user.location.street.number +
                        " " +
                        user.location.street.name +
                        ", " +
                        user.location.city +
                        ", " +
                        user.location.state}
                    </p>
                    {console.log(user.location)}
                  </div>
                );
              })
          ) : (
            <div>No se encontraron usuarios, intente nuevamente.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
