import React, { useEffect, useState } from "react";

const App = () => {
  // const [passwordValue, setPasswordValue] = useState("");
  const [peeps, setPeeps] = useState([]);
  // const handleChange = (event) => {
  //   if (event.target.id === "username-login-input") {
  //     setPasswordValue(event.target.value);
  //   }
  // };
  useEffect(() => {
    fetch("")
      .then((response) => response.json())
      .then((result) => {
        if (result.length) setPeeps(result);
      });
  }, []);

  const renderPeeps = () => {
    if (peeps.length) {
      return (
        <div>
          <p>@{peeps[0].username}</p>
          <p>{peeps[0].body}</p>
          <p>Posted at {new Date(peeps[0].createdAt).toString()}</p>
          <p>♡ {peeps[0].likes.length}</p>
        </div>
      );
    } else {
      return <p>No peeps</p>;
    }
  };
  return (
    <div>
      <h1>Chitter</h1>
      <form>
        <input
          id="username-login-input"
          name="username"
          defaultValue=""
          placeholder="username"
        />
        <input
          id="password-login-input"
          name="password"
          defaultValue=""
          placeholder="password"
        />
        <input id="log in" type="submit" value="log in" />
      </form>
      <p>sign up</p>
      {renderPeeps()}
    </div>
  );
};

export default App;
