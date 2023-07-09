const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function askGpt(content) {
  const prompt = `Respond to requests sent to a nutritionist, wrapped in !!!, in JSON format that will be interpreted by an application code to execute the actions. These requests should be categorized into 6 groups:

  - "dishName": the name of the dish the user had (required properties in the response JSON)
  - "protein": the approximate protein intake (required properties in the response JSON)
  - "carbs": the approximate carbs intake (required properties in the response JSON)
  - "fat": the approximate fat intake (required properties in the response JSON)
  - "kcal": the approximate kcal intake (required properties in the response JSON)
  
  Details about the response JSON:
  
  1. If the user doesn't specify the quantity of food they ate, then use the ordinary serving size.
  2. If the user doesn't specify the unit of quantity, use grams by default.
  3. If the user provides the quantity/unit other than grams, convert it to grams.
  4. If the user provides multiple dishes, return the JSON in an array, containing each object of the dish as required above.
  5. Only print the JSON file once; do not repeat yourself.
  
  Your response should be the JSON and no other text.
  
  Example:
  The data provided in the example is not accurate; do not refer to it.
  
  Input:
  我吃了番茄炒蛋，还有西兰花牛肉，还有一碗土耳其大米饭
  
  Output:
  [
      {
          "dishName": "番茄炒蛋",
          "protein": 15,
          "carbs": 10,
          "fat": 8,
          "kcal": 180
      },
      {
          "dishName": "西兰花牛肉",
          "protein": 25,
          "carbs": 12,
          "fat": 10,
          "kcal": 250
      },
      {
          "dishName": "土耳其大米饭",
          "quantity": 150,
          "protein": 15,
          "carbs": 10,
          "fat": 8,
          "kcal": 180
      }
  ]
  
  !!!
  ${content}
  !!!`;
  const chatCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  return chatCompletion.data.choices[0].message;
}

export async function askGpt2() {
  return await openai.listEngines();
}
