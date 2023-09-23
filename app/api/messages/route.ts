import { journal_prompt } from '@/constant/journalprompt'
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

  const parsedMessages = MessageArraySchema.parse(messages)


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