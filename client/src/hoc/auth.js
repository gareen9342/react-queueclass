import React, { useEffect } from "react";

export default (SpecificComponent, option) => {
  const AuthenticationCheck = (props) => {
    useEffect(() => {
      if (option) {
        if(!Boolean(localStorage.getItem("user"))){
          props.history.push("/login");
        }
      } else {
        if (Boolean(localStorage.getItem("user"))) {
          props.history.push("/");
        }
      }
    }, []);
    return <SpecificComponent {...props} />;
  };
  return AuthenticationCheck;
};
