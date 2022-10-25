import { useEffect } from "react";

const PeepsPanel = ({ peeps, setPeeps }) => {
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
          {peeps.map((peep, idx) => {
            return (
              <div key={idx}>
                <p>@{peep.username}</p>
                <p>{peep.body}</p>
                <p>Posted at {new Date(peep.createdAt).toString()}</p>
                <p>♡ {peep.likes.length}</p>
              </div>
            );
          })}
        </div>
      );
    }
  };

  return <div>{renderPeeps()}</div>;
};

export default PeepsPanel;
