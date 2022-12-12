import { useEffect } from "react";
import Peep from "./peep";

const PeepsPanel = ({ peeps, setPeeps }) => {
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

  const renderPeeps = () => {
    return (
      <div>
        {peeps.map((peep, idx) => (
          <Peep key={idx} peep={peep} setPeeps={setPeeps} />
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
