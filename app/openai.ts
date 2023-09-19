import OpenAI from 'openai';

const Openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY as string,
});

export default Openai;
