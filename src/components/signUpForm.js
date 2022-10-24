const SignUpForm = ({ setUser }) => {
  const handleSubmitButtonClick = async () => {
    fetch("");
    setUser({ _id: 1, username: "foo" });
  };
  return (
    <div>
      <h2>Sign up!</h2>
      <input name="username" placeholder="username"></input>
      <input name="password" placeholder="password"></input>
      <input name="email" placeholder="email"></input>
      <button name="submit" onClick={handleSubmitButtonClick}>
        submit
      </button>
      <button name="back">back</button>
    </div>
  );
};

export default SignUpForm;
