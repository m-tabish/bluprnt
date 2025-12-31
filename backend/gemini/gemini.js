require('dotenv').config();
const callLLM = async () => {
    const result = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer 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`,
            "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
            "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "model": "moonshotai/kimi-k2:free",
            "messages": [
                {
                    "role": "user",
                    "content": "What is the meaning of life?"
                }
            ]
        })
    });
    const response = await result.json();
    const content = response?.choices?.[0]?.message?.content;
    console.log(JSON.stringify(content));

} 