export default async function handler(req, res) {
  if (req.method === 'POST') {
    // const prompt = `My name is ${applicantName}. I want to work for ${companyName}, they are ${companyDescription}
    // I am applying for the job ${jobTitle}. I have been working before for: ${remainderText()}
    // And I have used the technologies such as ${technologies}
    // I want to cold email ${recruiterName} my resume and write why I fit for the company.
    // Can you please write me the email in a friendly voice, not offical? without subject, maximum 300 words and say in the end that my CV is attached.`;

    const response = await fetch(
      'https://api.openai.com/v1/engines/text-davinci-003/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.Token,
        },
        body: JSON.stringify({
          prompt: `write a professional comprehensive review in breif of boat object around 1000 words in professional tone which is more descriptive based on attributes such as`,
          temperature: 0.6,
          max_tokens: 350,
          top_p: 1,
          frequency_penalty: 1,
          presence_penalty: 1,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    return res.status(200).json({ text: data.choices[0].text });
  }
}
