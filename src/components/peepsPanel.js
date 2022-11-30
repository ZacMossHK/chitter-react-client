import { useEffect, useState } from "react";

const PeepsPanel = ({ peeps, setPeeps }) => {
  const [like, setLike] = useState(true);
  useEffect(() => {
    fetchPeepsFromAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRefreshButtonClick = () => {
    fetchPeepsFromAPI();
  };

  const fetchPeepsFromAPI = async () => {
    const response = await fetch("");
    const result = await response.json();
    setPeeps(result);
  };

  const handleLikeClick = async () => {
    const response = await fetch("");
    const result = await response.json();
    // result
  };

  const renderPeeps = () => {
    return (
      <div>
        {peeps.map((peep) => {
          return (
            <div key={peep._id}>
              <p>@{peep.username}</p>
              <p>{peep.body}</p>
              <p>Posted at {new Date(peep.createdAt).toString()}</p>
              <p
                data-testid={`peeps-likes-${peep._id}`}
                id={`peeps-likes-${peep._id}`}
                onClick={handleLikeClick}
              >
                ♡ {peep.likes.length}
              </p>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <button onClick={handleRefreshButtonClick}>refresh feed</button>
      {renderPeeps()}
    </div>
  );
};

export default PeepsPanel;
