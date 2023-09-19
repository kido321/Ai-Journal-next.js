import Openai from '@/app/openai';

import type { NextApiRequest, NextApiResponse } from 'next'
type Data = { name: string}

export default async function handler(        
        req: NextApiRequest,
        res: NextApiResponse<any>
     )       
{
    async function main() {
        const completion = await Openai.chat.completions.create({
          messages: [{ role: 'user', content: 'you are a journal writing expert i need you to help me write a journal. you will do that by asking me series of questions that will help you analyze how my day was going whats on my mind something like that and when i tell you to write the journal you will do that and ask the questions one by one.' }],
          model: 'gpt-3.5-turbo',
        });
        const response = completion.choices[0].message.content;
        res.status(200).json(response);
        console.log(response);
      }
      main();
}
