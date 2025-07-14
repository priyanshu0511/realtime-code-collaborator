export default async function handler(req, res) {
  try {
    await fetch("https://realtime-collaborative-code-editor-8fu4.onrender.com/", {
      method: "GET",
    });
    res.status(200).json({ status: "Backend wake-up sent" });
  } catch (err) {
    res.status(500).json({ error: "Failed to wake backend" });
  }
}