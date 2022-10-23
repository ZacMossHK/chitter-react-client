const SidePanel = () => {
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
    </div>
  );
};

module.exports = SidePanel;
