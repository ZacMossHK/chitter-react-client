import React, { useState } from "react";
import SidePanel from "./components/sidePanel";
import PeepsPanel from "./components/peepsPanel";

const App = () => {
  const [peeps, setPeeps] = useState([]);
  return (
    <div>
      <SidePanel peeps={peeps} setPeeps={setPeeps} />
      <PeepsPanel peeps={peeps} setPeeps={setPeeps} />
    </div>
  );
};

export default App;
