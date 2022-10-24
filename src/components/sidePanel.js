import { useState } from "react";
import LoginForm from "./loginForm";
import PeepForm from "./peepForm";

const SidePanel = () => {
  const [user, setUser] = useState(null);

  const renderPanel = () => {
    if (user) return <PeepForm user={user} />;
    return <LoginForm setUser={setUser} />;
  };
  return (
    <div>
      <h1>Chitter</h1>
      {renderPanel()}
    </div>
  );
};

export default SidePanel;
