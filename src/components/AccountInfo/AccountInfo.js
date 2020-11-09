import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import CompanyInfo from "./CompanyInfo";
import StudentInfo from "./StudentInfo";

const AccountInfo = () => {
  const [userType, setUserType] = useState({ student: false, company: false });

  useEffect(() => {
    const role = localStorage.getItem("role_id");
    if (role === "0") {
      setUserType({ student: true });
    } else if (role === "1") {
      setUserType({ company: true });
    }
  }, [setUserType]);

  return (
    <Container>
      {userType.student ? <StudentInfo /> : null}
      {userType.company ? <CompanyInfo /> : null}
    </Container>
  );
};

export default AccountInfo;
