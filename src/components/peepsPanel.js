import { useEffect } from "react";
import Peep from "./peep";

const PeepsPanel = ({ peeps, setPeeps, user }) => {
  useEffect(() => {
    fetchPeepsFromAPI();
  }, []);

  const handleRefreshButtonClick = () => {
    fetchPeepsFromAPI();
  };

  const fetchPeepsFromAPI = async () => {
    const response = await fetch("");
    const result = await response.json();
    await setPeeps(result);
  };

  const renderPeeps = () => {
    return (
      <div>
        {peeps.map((peep, idx) => (
          <Peep key={idx} peep={peep} user={user} />
        ))}
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
