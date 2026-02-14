const SERVER_URL = 'http://localhost:3000/';

async function runClient()
{
  // 1. GET Request
  console.log("--- Asking for \"Hello World\" ---");
  const getResponse = await fetch(SERVER_URL);
  const data = await getResponse.text();
  console.log("Server responded with:", data);
}

runClient();