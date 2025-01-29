import React from "react";
import { GoogleLogout } from "react-google-login";
import { useHistory } from "react-router-dom";

const clientID =
  "435696027529-ed433bjttma4reflq6p2trm6heo226ml.apps.googleusercontent.com";

function Logout() {
  const history = useHistory();
  const onSuccess = (_res) => {
    history.push("/");
  };
  return (
    <div id="signOutButton">
      <GoogleLogout
        clientId={clientID}
        buttonText={"Logout"}
        onLogoutSuccess={onSuccess}
        className="w-36 h-10"
      />
    </div>
  );
}

export default Logout;
