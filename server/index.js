import cors from "cors"
import express, { response } from "express"

import { download } from "./download.js"
import {transcription} from "./transcrever.js"
import { summarize } from "./resumo.js"
import {convert} from "./convert.js"

const app = express()  //Colocando o express dentro de uma constante pra poder usá-lo
app.use(express.json()) 
app.use(cors())        //Passando o cors pra ele

app.get("/summary/:id", async (request, response) =>{   //quando colocar ":id" a linguagem ja entende q é um parâmetro
  try{
  await download(request.params.id)
  const audioConverted = await convert()
  const result = await transcription(audioConverted)

  return response.json({ result }) // result: result
  }
  catch(error){
    console.log(error)
    return response.json({ result })
  }
})

app.post("/summary", async (request, response) => {
  try {
    const result = await summarize(request.body.text)
    return response.json({ result }) // result: result
  } 
  catch (error) {
    console.log(error)
    return response.json({ result })
  }
})

app.listen(3333, () => console.log("Server is running on port 3333"))