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
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'what is the color' }],
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
