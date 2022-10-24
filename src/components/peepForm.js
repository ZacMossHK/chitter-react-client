const PeepForm = () => {
  return (
    <div>
      <p>What would you like to Peep?</p>
      <input
        id="body-input"
        name="body"
        defaultValue=""
        placeholder="Enter your peep here"
      />
      <button name="peep">peep!</button>
      <button name="log-off">log off</button>
    </div>
  );
};

module.exports = PeepForm;
