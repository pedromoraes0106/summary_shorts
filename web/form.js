import { transcription } from "../server/transcrever.js"
import {server} from "./server.js"

const form = document.querySelector('#form')
const url = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", async (event) => {
  event.preventDefault()
  content.classList.add("placeholder")
  
  const videoURL= url.value

  if(!videoURL.includes("shorts")){
    return (content.textContent = "Esse vídeo não parece ser um shorts.")
  }

  //"_" é usado para omitir uma posição quando não formos usar ela
  const [_, params]= videoURL.split("/shorts/") 
  //Divide o texto da url de acordo com o parâmetro especificado (tudo o que vem antes e depois de shorts ele divide em textos diferentes)

  //Quando queremos só a primeiro posição da array, não precisa usar ", _"
  const [videoId] = params.split("?si") //Purificando o ID do video 
  
  content.textContent = "Obtendo o texto do áudio..."

  const transcription = await server.get("/summary/" + videoId)
  content.textContent = "Realizando o resumo..."

  const summary = await server.post("/summary", {
     text: transcription.data.result,
   })

   content.textContent = summary.data.result //exibe pro usuário o texto do video
   content.classList.remove("placeholder")
})