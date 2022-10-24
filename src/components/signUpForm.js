import { useState } from "react";

const SignUpForm = ({ setUser }) => {
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [emailValue, setEmailValue] = useState("");

  const handleSubmitButtonClick = async () => {
    const response = await fetch("");
    const result = await response.json();
    setUser(result);
  };
  return (
    <div>
      <h2>Sign up!</h2>
      <input
        name="username"
        placeholder="username"
        value={usernameValue}
        onChange={setUsernameValue}
      ></input>
      <input
        name="password"
        placeholder="password"
        value={passwordValue}
        onChange={setPasswordValue}
      ></input>
      <input
        name="email"
        placeholder="email"
        value={emailValue}
        onChange={setEmailValue}
      ></input>
      <button name="submit" onClick={handleSubmitButtonClick}>
        submit
      </button>
      <button name="back">back</button>
    </div>
  );
};

export default SignUpForm;
