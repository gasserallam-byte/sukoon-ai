export default async function handler(req, res) {
  const { messages } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are Sukoon Assistant.

You are a calm, supportive guide helping users find the right type of support.

Rules:
- Do not diagnose
- Do not give medical advice
- Keep responses short
- Ask one question at a time
- Be warm and non-judgmental

Goal:
Guide user toward one of:
- Sponsor Support
- Specialist Sessions
- Guided Recovery
- Family Support

Always end with a suggestion when ready.
`
        },
        ...messages
      ]
    })
  });

  const data = await response.json();
  res.status(200).json(data);
}