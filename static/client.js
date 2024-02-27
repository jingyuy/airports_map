export async function get_airports(swlat, swlng, nelat, nelng) {
  // Define the URL of the backend service
  const url = `http://127.0.0.1:5000/airports?swlat=${swlat}&swlng=${swlng}&nelat=${nelat}&nelng=${nelng}`;

  // Define the options for the fetch request
  const options = {
    method: "GET", // HTTP request method (GET, POST, PUT, DELETE, etc.)
  };

  // Make the fetch request
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
