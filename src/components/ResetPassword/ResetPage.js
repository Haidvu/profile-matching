import React, { useState } from "react";
import ResetPassword from "./ResetPassword";
import ResetPasswordTwo from "./ResetPasswordTwo";

export default function ResetPage() {
  const [validEmail, setValidEmail] = useState(false);

  return !validEmail ? (
    <ResetPassword setValidEmail={setValidEmail} />
  ) : (
    <ResetPasswordTwo />
  );
}
