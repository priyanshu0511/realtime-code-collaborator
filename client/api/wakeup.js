export default async function handler(req, res) {
  try {
    await fetch(import.meta.env.VITE_BACKEND_URL, {
      method: "GET",
    });
    res.status(200).json({ status: "Backend wake-up sent" });
  } catch (err) {
    res.status(500).json({ error: "Failed to wake backend" });
  }
}