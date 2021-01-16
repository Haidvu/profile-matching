const isText = RegExp(/^[A-Z ]+$/i);
const isEmail = RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
const isPhone = RegExp(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4,6})$/); // us

export default function formValidation(name, value, schema) {
  const { validate, minLength, maxLength } = schema[name];
  let error = "";

  if (minLength && value.length < minLength)
    error = `Minimum of ${minLength} characters are required.`;
  else if (maxLength && value.length > maxLength)
    error = `Maximum length of ${maxLength} exceeded!`;
  if (!validate) return;

  switch (validate) {
    case "text":
      if (!isText.test(value)) error = "This field accepts text only.";
      break;

    case "contact_email":
      if (!isEmail.test(value)) error = "Please enter a valid email address.";
      break;

    case "contact_phone":
      if (!isPhone.test(value))
        error = "Please enter a valid phone number. i.e: xxx-xxx-xxxx";
      break;

    default:
      break;
  }

  return error;
}