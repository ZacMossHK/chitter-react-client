import { useEffect, useState } from "react";

const PeepsPanel = ({ peeps, setPeeps }) => {
  const [heart, setHeart] = useState("♡");
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
    if (response.status === 201) {
      await setHeart("♥");
      setPeeps([
        {
          _id: 1,
          username: "foo",
          body: "second peep",
          createdAt: new Date(2022, 10, 11).toISOString(),
          likes: [1],
        },
      ]);
    }
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
                {heart} {peep.likes.length}
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
