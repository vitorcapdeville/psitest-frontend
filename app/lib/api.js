// const URL = "http://127.0.0.1:8000";
// const URL = "http://gateway:80";

export async function login(email, password) {
  let formData = new FormData();
  formData.append("username", email);
  formData.append("password", password);

  const user = await fetch(`${process.env.GATEWAY_URL}/login`, {
    method: "POST",
    body: formData,
  });

  if (!user.ok) {
    throw new Error("Failed to fetch data");
  }
  return user.json();
}
