//Obtenemos la fecha a consultar
const getUrl = new URLSearchParams(window.location.search);
const date = getUrl.get('date');

// Hacemos fetch con el dato de la fecha obtenida
const api = `https://api.nasa.gov/planetary/apod?api_key=G0LRTNHSzg0Ny6U4qulMbOYIG2JB5MWbPfieYSRK&date=${date}`

fetch(api)
  .then(response => response.json())
  .then(data => {
    const dateLong = formatDate(data.date);
    document.querySelector('title').innerHTML = `${data.title}`;
    document.querySelector('#title').innerHTML = `${data.title}`;
    document.querySelector('#postDate').innerHTML = `${dateLong} | Por ${data.copyright}`;
    document.querySelector('#postImage').src = `${data.url}`;
    document.querySelector('#postImage').alt = `${data.title}`;
    document.querySelector('#postText').innerHTML = `${data.explanation}`;
    
  })
  .catch(err => {
      console.log(`err ${err}`)
  });
// Creamos una función paa dar formato a la fecha
function formatDate(date){
  const dateObject = new Date(date);
  const months = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre"
  ];
  // Obtenemos los dias meses y años de forma separada
  const day = dateObject.getDate() + 1;
  const month = months[dateObject.getMonth()];
  const year = dateObject.getFullYear();

  // Retornamos en un formato mas legible
  return `Publicado el ${day} de ${month} del ${year}`
}
