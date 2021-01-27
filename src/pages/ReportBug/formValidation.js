const isText = RegExp(/^[A-Z ]+$/i);
const isEmail = RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);

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

    default:
      break;
  }

  return error;
}
