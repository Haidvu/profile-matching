import React from "react";
import StudentProfile from "../../components/StudentProfile/StudentProfile";
import CompanyProfile from "../../components/CompanyProfile/CompanyProfile";

const Profile = () => {
  //for now I will just hardcode the profile option we can figure out how to make it work later
  const student = true;

  return <div>{student ? <StudentProfile /> : <CompanyProfile />}</div>;
};

export default Profile;
