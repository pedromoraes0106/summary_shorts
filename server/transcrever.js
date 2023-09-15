import { Pipeline, pipeline } from "@xenova/transformers"
import { transcriptionExample } from "./utils/transcription.js"

export async function transcription(audio){

  try {
    //return transcriptionExample

    console.log("Realizando a transcrição do vídeo")
    
    const transcribe = await pipeline(
      "automatic-speech-recognition", 
      "Xenova/whisper-small"
      ) //Definindo o modelo da biblioteca da IA

      const transcription = await transcribe(audio, {
        chunk_length_s: 30,
        stride_length_S: 5,
        language: "portuguese",
        task: "transcribe"
      }) //Falando pra Ia qual a tarefa dela

      console.log("Transcrição finalizada com sucesso")
      return transcription?.text.replace("[Música]", "")  //"?" para não quebrar a aplicação caso a propriedade da resposta for nula ou diferente de text
                                                          //Também estamos tirando [música] da legenda

  } catch (error) {
    throw new Error(error) 
  }
}