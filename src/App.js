import React, { useState } from "react";
import SidePanel from "./components/sidePanel";
import PeepsPanel from "./components/peepsPanel";

const App = () => {
  const [peeps, setPeeps] = useState([]);
  const [user, setUser] = useState(null);
  return (
    <div>
      <SidePanel
        peeps={peeps}
        setPeeps={setPeeps}
        user={user}
        setUser={setUser}
      />
      <PeepsPanel peeps={peeps} setPeeps={setPeeps} user={user} />
    </div>
  );
};

export default App;
