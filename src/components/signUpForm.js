import { useState } from "react";

const SignUpForm = ({ setUser, setSignUpFormVisible }) => {
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [emailValue, setEmailValue] = useState("");

  const handleBackButtonClick = () => {
    setSignUpFormVisible(false);
  };

  const handleSubmitButtonClick = async () => {
    const response = await fetch(`${process.env.REACT_APP_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: usernameValue,
          email: emailValue,
          password: passwordValue,
        },
      }),
    });
    const result = await response.json();
    console.log(result);
    setUser(result);
    setSignUpFormVisible(false);
  };

  return (
    <div>
      <h2>Sign up!</h2>
      <input
        name="username"
        placeholder="username"
        // value={usernameValue}
        onChange={(event) => setUsernameValue(event.target.value)}
      ></input>
      <input
        name="password"
        placeholder="password"
        // value={passwordValue}
        onChange={(event) => setPasswordValue(event.target.value)}
      ></input>
      <input
        name="email"
        placeholder="email"
        // value={emailValue}
        onChange={(event) => setEmailValue(event.target.value)}
      ></input>
      <button name="submit" onClick={handleSubmitButtonClick}>
        submit
      </button>
      <button name="back" onClick={handleBackButtonClick}>
        back
      </button>
    </div>
  );
};

export default SignUpForm;
