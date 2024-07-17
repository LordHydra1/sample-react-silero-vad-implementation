async function makePost(audioData) {
  try {
    // Make a POST request to your backend
    const response = await fetch("http://localhost:8000/", {
      method: "POST",
      body: audioData,
    });
    if (response.ok) {
      console.log("Audio successfully uploaded");
    } else {
      console.error("Failed to upload audio");
    }
    const data = await response.json();
    console.log("Post created:", data);
    return data;
  } catch (error) {
    console.error("Error uploading audio:", error);
  }
}

export default makePost;
