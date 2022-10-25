import { useEffect } from "react";

const PeepsPanel = ({ peeps, setPeeps }) => {
  useEffect(() => {
    fetchPeepsFromAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRefreshButtonClick = () => {
    fetchPeepsFromAPI();
  };

  const fetchPeepsFromAPI = () => {
    fetch("")
      .then((response) => response.json())
      .then((result) => {
        if (result.length) setPeeps(result);
      });
  };

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

  return (
    <div>
      <button onClick={handleRefreshButtonClick}>refresh feed</button>
      {renderPeeps()}
    </div>
  );
};

export default PeepsPanel;
