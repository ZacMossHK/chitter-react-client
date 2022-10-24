const LoginForm = () => {
  return (
    <div>
      <label htmlFor="username-login-input"></label>
      <input
        id="username-login-input"
        name="username"
        defaultValue=""
        placeholder="username"
      />
      <label htmlFor="password-login-input"></label>
      <input
        id="password-login-input"
        name="password"
        defaultValue=""
        placeholder="password"
      />
      <button name="log-in">log in</button>
      <button name="sign-up">sign up</button>
    </div>
  );
};

module.exports = LoginForm;
