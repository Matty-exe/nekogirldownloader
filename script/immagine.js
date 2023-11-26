const generateButton = document.querySelector("#bottone");
const downloadButton = document.querySelector("#download");
const downloadLink = document.getElementById("downloadLink");
const defaultImage = document.getElementById("defaultImage");
var check = document.querySelector("#nsfw");
let nsfw = "flase";
generateButton.addEventListener("click", () => {
  var jsonUrl = "https://nekos.moe/api/v1/random/image?nsfw=false"; // Sostituisci con l'URL JSON effettivo
  if(check.checked === true){
    console.log("nsfw on");
    jsonUrl = "https://nekos.moe/api/v1/random/image?nsfw=true"; // Sostituisci con l'URL JSON effettivo
  }

  // Fetch the JSON data
  fetch(jsonUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("Errore nella richiesta HTTP: " + response.status);
      }
      const risp = response.json();
      console.log(risp);
      return risp;
    })
    .then(data => {
      if (data.images && data.images.length > 0) {
        const firstImage = data.images[0]; // Prendi il primo oggetto nell'array "images"
        const id = firstImage.id;

        // Ora puoi utilizzare l'ID come desideri
        console.log("Valore di 'id': " + id);

        img = new Image();
        img.src = "https://nekos.moe/image/" + id;

        const imageContainer = document.querySelector('.imageContenitor');
        imageContainer.innerHTML = ''; // Cancella immagini esistenti
        imageContainer.appendChild(img);

        // Aggiungi l'URL dell'immagine al link per il download
        downloadLink.href = img.src;
        downloadLink.download = `immagine_${id}.jpg`;

        // Nascondi l'immagine predefinita
        defaultImage.style.display = "none";
      } else {
        console.error("Nessun elemento 'images' trovato nel JSON:", data);
      }
    })
    .catch(error => {
      console.error("Si è verificato un errore durante il recupero o la lettura del JSON:", error);
    });
});
downloadButton.addEventListener("click", async () => {
  // Simula il download dell'immagine
  downloadLink.click();
  /*const image = await fetch(img);
  const imageBlog = await image.blob();
  const imageURL = URL.createObjectURL(imageBlog);

  const link = document.createElement('a');
  link.href = imageURL;
  link.download = 'image file name here';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);*/
});
// Mostra l'immagine predefinita quando la pagina si carica
defaultImage.style.display = "block";
