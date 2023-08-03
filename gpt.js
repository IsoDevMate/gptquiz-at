const express =require('express')
const app=express('app')
const axios=require('axios')
require('dotenv').config()
const port = process.env.PORT || 5010

//initiating openAI library
const { Configuration, OpenAIApi } = require("openai");

const configuration=new Configuration({
    apiKey:process.env.OPENAI_API_KEY,
})
const openApi = new OpenAIApi({configuration})

 const gptChatCompletion = async(prompt)=>{

    try {
        let queryObj = {
            model: "gpt-3.5-turbo",
            messages: [
                {"role":"system","content":`
                "your role is to teach me in a progressive manner data structure and algorithms  considering am a beginner.teach me a 
                after every 2hrs and after you break down a concept to me device a way in which you can 
                verify that i have understood also ensure you ask me questions for the concept taught increasing
                 difficult according to the correctness of my responsefor the current question asked",.`},
                {"role":"user","content": prompt}
            ],
            max_tokens: 1000,
            temperature:0.3, 
            top_p:1,
        
        }
  const chatCompletion = await openApi.createChatCompletion(gptChatCompletion(queryObj))

  const messages = chatCompletion.data.choices[0].message;
  const usage = completion.data.usage;
  console.log(`message: ${JSON.stringify(messages)}`);
  return {messages,usage};
        }catch(err){
            console.log(JSON.stringify(err))
        }
    }




