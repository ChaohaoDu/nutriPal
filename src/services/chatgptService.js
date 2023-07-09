const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

export default async function askGpt(content) {
  const chatCompletion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: "user", content }],
  });

  return chatCompletion.data.choices[0].message;
}

export async function askGpt2() {
  return await openai.listEngines();
}


