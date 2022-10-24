const PeepForm = ({ user, setUser, peeps, setPeeps }) => {
  const handleLogOffButtonClick = async () => {
    const response = await fetch("");
    if (response.status === 204) setUser(null);
  };
  const handlePeepButtonClick = async () => {
    const response = await fetch("");
    const result = await response.json();
    setPeeps([result, ...peeps]);
  };
  return (
    <div>
      <h2>@{user.username}</h2>
      <p>What would you like to Peep?</p>
      <input
        id="body-input"
        name="body"
        defaultValue=""
        placeholder="Enter your peep here"
      />
      <button name="peep" onClick={handlePeepButtonClick}>
        peep!
      </button>
      <button name="log-off" onClick={handleLogOffButtonClick}>
        log off
      </button>
    </div>
  );
};

module.exports = PeepForm;
