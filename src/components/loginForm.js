const { useState } = require("react");

const LoginForm = ({ setUser, setSignUpFormVisible }) => {
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const handleLogInButtonClick = async () => {
    const response = await fetch("");
    const result = await response.json();
    setUser(result);
    setUsernameValue("");
    setPasswordValue("");
  };

  const handleSignUpButtonClick = () => {
    setSignUpFormVisible(true);
  };

  return (
    <div>
      <label htmlFor="username-login-input"></label>
      <input
        id="username-login-input"
        name="username"
        defaultValue={usernameValue}
        onChange={setUsernameValue}
        placeholder="username"
      />
      <label htmlFor="password-login-input"></label>
      <input
        id="password-login-input"
        name="password"
        defaultValue={passwordValue}
        onChange={setPasswordValue}
        placeholder="password"
      />
      <button name="log-in" onClick={handleLogInButtonClick}>
        log in
      </button>
      <button name="sign-up" onClick={handleSignUpButtonClick}>
        sign up
      </button>
    </div>
  );
};

module.exports = LoginForm;
