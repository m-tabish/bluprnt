require('dotenv').config();
const url = "https://openrouter.ai/api/v1/chat/completions";
const headers = {
    "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
    "Content-Type": "application/json",
     
};
const payload = {
    "model": "google/gemma-3-27b-it",
    "max_tokens": 512,
    "messages": [
        {
            "role": "user",
            "content": "If you built the world's tallest skyscraper, what would you name it?"
        }
    ]
};
const callLLM = async () => {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(payload)
        });
        const data = await response.json();

        if (!response.ok) {
            const apiError = data?.error?.message || `OpenRouter request failed with status ${response.status}`;
            throw new Error(apiError);
        }

        const content = data?.choices?.[0]?.message?.content;
        if (!content) {
            throw new Error("OpenRouter returned no message content");
        }

        return { data, content };
    } catch (error) {
        console.error(error.message);
        throw error;
    }
};

callLLM()
    .then(({ data, content }) => {
        console.log(data);
        console.log(content);
    })
    .catch((err) => {
        console.error("Error:", err.message);
    });