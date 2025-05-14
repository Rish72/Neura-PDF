import { OpenAIApi, Configuration } from 'openai-edge'

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const client = new OpenAIApi(config)

export async function getEmbeddings(text: string) {
  try {
    const res = await client.createEmbedding({
      model: 'text-embedding-ada-002',
      input: text.replace(/\n/g, ' '),
    })

    const result = await res.json()

    if (!result?.data || !Array.isArray(result.data) || result.data.length === 0) {
      console.error('OpenAI embedding API returned unexpected result:', result)
      throw new Error('Embedding data missing or malformed')
    }

    return result.data[0].embedding as number[]
  } catch (error) {
    console.error('error while calling openai embedding: ', error)
    throw error
  }
}
