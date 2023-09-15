import ytdl from 'ytdl-core'
import fs from 'fs' //Biblioteca para manipular arquivos


export const download = (videoId) => 
new Promise((resolve, reject) => {
  
  const videoURL = "https://www.youtube.com/shorts/" + videoId
  //const videoURL = "https://www.youtube.com/watch?v=" + videoId opção para video do yt sem ser shorts
  console.log("Realizando o download do video:" + videoId)

  ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" }) //Para passa um objeto precisa usar {}
    .on("info", 
    (info) => {
      const seconds = info.formats[0].approxDurationMs/1000

      if(seconds > 60){
        throw new Error("A duração desse vídeo é maior do que 60 segundos.") 
      }
      //console.log(seconds) mostra os segundos do video
  })
  .on("end", () => {
    console.log("Download do vídeo finalizado.")
    resolve()
  })
  .on("error", (error) => {
    console.log(
      "Nâo foi possível fazer o download do vídeo. Detalhes do erro:",
      error
    )
    reject(error)
  })
  .pipe(fs.createWriteStream("./temp/audio.mp4")) //Define aonde será salvo o vídeo
})