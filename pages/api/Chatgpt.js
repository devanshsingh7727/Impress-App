import nextConnect from 'next-connect';
// import { moneyMask } from '../../lib/utils';
import { Configuration, OpenAIApi } from 'openai';
// import { AutofillFormPrompt } from '../../../lib/utils';

const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

const handler = nextConnect();

handler.post(async (req, res) => {
  try {
    let data = JSON.stringify(req.body.text);
    let CompanyData = { ...req.body.CompanyData };

    let prompt = `Compose a professional email using the provided resume data to apply for the position at ${CompanyData.company_name}. The company requires candidates with the following skills: ${CompanyData.company_description}. I am interested in the ${CompanyData.position} position, and I noticed that the recruiter handling this role is ${CompanyData.recruiter_name}. Please use the candidate's information enclosed within '''${data}''' to craft the email.
    also create a json format which have keys-> 1) subject 2)content, output the json only which is parsed by JSON.parse
    `;

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `you are the ai assitant which help the user generating the email in profesional tone.`,
        },
        {
          role: 'assistant',
          content: prompt,
        },
      ],
      temperature: 0,
    });

    if (response) {
      let rek = response.data.choices[0].message.content;

      res.status(200).json({ data: rek });
    } else {
      res.status(201).send('');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal server error!!!');
  }
});

export default handler;
