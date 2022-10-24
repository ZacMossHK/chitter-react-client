import { useState } from "react";
import LoginForm from "./loginForm";
import PeepForm from "./peepForm";
import SignUpForm from "./signUpForm";

const SidePanel = () => {
  const [user, setUser] = useState(null);
  const [signUpFormVisible, setSignUpFormVisible] = useState(false);

  const renderPanel = () => {
    if (signUpFormVisible) return <SignUpForm />;
    if (user) return <PeepForm user={user} setUser={setUser} />;
    return (
      <LoginForm
        setUser={setUser}
        setSignUpFormVisible={setSignUpFormVisible}
      />
    );
  };
  return (
    <div>
      <h1>Chitter</h1>
      {renderPanel()}
    </div>
  );
};

export default SidePanel;
