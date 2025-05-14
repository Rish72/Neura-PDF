import {OpenAIApi, Configuration} from 'openai-edge'

const config = new Configuration({
    apiKey : process.env.OPENAI_API_KEY
})

const client = new OpenAIApi(config);

export async function getEmbeddings(text: string){
    try {
        const res = await client.createEmbedding({
            model : 'text-embedding-ada-002	',
            input : text.replace(/\n/g," ") 
        })
        const result = await res.json();
        return result.data[0].embedding as number[]
    } catch (error) {
        console.log("error while calling openai embedding: ",error)
        throw error
    }
}