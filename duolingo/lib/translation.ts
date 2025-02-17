export async function translateText(
  inputText: string, 
  originLanguage: string = 'en', 
  targetLanguage: string = 'ar'
): Promise<string> {
  const url = 'https://translateai.p.rapidapi.com/google/translate/text';
  const options = {
    method: 'POST',
    headers: {
      'x-rapidapi-key': process.env.RAPID_API_KEY || '',
      'x-rapidapi-host': 'translateai.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      origin_language: originLanguage,
      target_language: targetLanguage,
      input_text: inputText
    })
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    
    // Check if translation is successful
    if (result.message === 'Success' && result.translation) {
      return result.translation;
    } else {
      console.error('Translation failed:', result);
      return inputText; // Fallback to original text
    }
  } catch (error) {
    console.error('Translation error:', error);
    return inputText; // Fallback to original text
  }
}
