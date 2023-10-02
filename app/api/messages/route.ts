import { journal_prompt  , first_question} from '@/constant/journalprompt'
import { gratitude_journal } from '@/constant/gratitude_journal'
import { dream_journal } from '@/constant/dream_journal'
import { morning_journal } from '@/constant/morning_journal'
import { evening_journal } from '@/constant/evening_journal'
import {
  ChatGPTMessage,
  OpenAIStream,
  OpenAIStreamPayload,
} from '@/lib/openai-stream'
import { useContext } from 'react'
import { MessageArraySchema } from '@/lib/validators/message'
import { MessagesContext } from '@/app/context/messages'




 
export async function POST(req: Request) {
  const { messages } = await req.json()
  console.log('messages');
  console.log(messages);

  const parsedMessages = MessageArraySchema.parse(messages)
  console.log('parsedMessages');
  console.log(parsedMessages);

  const outboundMessages: ChatGPTMessage[] = parsedMessages.map((message) => {
    return {
      role: message.isUserMessage ? 'user' : 'system',
      content: message.text,
    }
  })

  outboundMessages.unshift({
    role: 'system',
    content: journal_prompt,
  })

  console.log('outboundMessages');
  console.log(outboundMessages);
 

  const payload: OpenAIStreamPayload = {
    model: 'gpt-3.5-turbo',
    messages: outboundMessages,
    temperature: 0.4,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 400,
    stream: true,
    n: 1,
  }

  const stream = await OpenAIStream(payload)

  return new Response(stream)
}