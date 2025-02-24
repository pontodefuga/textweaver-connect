
const OPENROUTER_API_KEY = 'YOUR_OPENROUTER_API_KEY'; // Replace with your OpenRouter API key

export async function processWithAI(text: string, instructions: string) {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': window.location.href,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gryphe/mythomist-7b', // Free model
        messages: [
          {
            role: 'system',
            content: instructions
          },
          {
            role: 'user',
            content: text
          }
        ],
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to process with AI');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('AI Processing error:', error);
    throw error;
  }
}
