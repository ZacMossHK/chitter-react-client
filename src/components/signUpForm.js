const SignUpForm = ({ setUser }) => {
  return (
    <div>
      <h2>Sign up!</h2>
      <input name="username" placeholder="username"></input>
      <input name="password" placeholder="password"></input>
      <input name="email" placeholder="email"></input>
      <button name="submit">submit</button>
      <button name="back">back</button>
    </div>
  );
};

export default SignUpForm;
