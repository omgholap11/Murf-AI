const playAudio = (audioUrl) => {
  const audio = new Audio(audioUrl);
  audio.play();
};

// Example usage

/*In this experiential elearning module, you'll master the basics of using this Text to Speech widget. Choose a voice, experiment with styles, explore languages, customize text, and play with various use-cases for a view into all that Murf offers. */
playAudio("https://murf.ai/user-upload/one-day-temp/79b07825-d67f-4797-a2c3-f5498f434a7b.wav?response-cache-control=max-age%3D604801&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250624T000000Z&X-Amz-SignedHeaders=host&X-Amz-Expires=259200&X-Amz-Credential=AKIA27M5532DYKBCJICE%2F20250624%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Signature=51ff6731ee332bad237c35bee08d32a43c00cc37331e02e283a12be13afd7f10");