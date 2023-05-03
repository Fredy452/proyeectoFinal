//Obtenemos la fecha a consultar
const getUrl = new URLSearchParams(window.location.search);
const date = getUrl.get('date');

// Hacemos fetch con el dato de la fecha obtenida
const api = `https://api.nasa.gov/planetary/apod?api_key=G0LRTNHSzg0Ny6U4qulMbOYIG2JB5MWbPfieYSRK&date=${date}`

    fetch(api)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          document.querySelector('#title').innerHTML = `${data.title}`;
          document.querySelector('#postDate').innerHTML = `${data.date}`;
          document.querySelector('#postImage').src = `${data.url}`;
          document.querySelector('#postText').innerHTML = `${data.explanation}`;
         
        })
        .catch(err => {
            console.log(`err ${err}`)
        });
