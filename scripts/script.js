const button = document.querySelector("#button-addon2");
button.addEventListener('click', mostrarImg);

function mostrarImg () {
    const fecha = document.querySelector("#buscar").value;
    const api = `https://api.nasa.gov/planetary/apod?api_key=G0LRTNHSzg0Ny6U4qulMbOYIG2JB5MWbPfieYSRK&date=${fecha}`

        fetch(api)
        .then(response => response.json())
        .then(data => {
          cardSearch(data);
        
        })
        .catch(err => {
            console.log(`err ${err}`)
        });
   
}

function cardSearch(data){
  const row = document.getElementById('rowSearch');
  const card =  `
      <div class="col">
      <div class="card mb-3 text-center">
        <img src="${data.url}" id="cardSearch" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title" id="searchTitle">${data.title}</h5>
          <p class="card-text" id="searchText">${data.explanation}</p>
          <a class="btn btn-primary" href="post.html?date=${data.date}" id="btn-card">Ver más...</a>
          <p class="card-text"><small id="searchDate" class="text-muted">Publicado en el ${data.date}</small></p>
        </div>
      </div>
    </div>
    `
    row.innerHTML = card;
}


const apiCount = `https://api.nasa.gov/planetary/apod?api_key=G0LRTNHSzg0Ny6U4qulMbOYIG2JB5MWbPfieYSRK&start_date=2023-04-27&end_date=2023-05-02`
fetch(apiCount)
  .then(response => response.json())
  .then(data => {
    iterateData(data)
  })
  .catch(err => {
    console.log(`err ${err}`)
  });

  function iterateData(data){
    const row = document.getElementById('rowCard');
    const cards = data.map(item => {
    const dateFormated = formatDate(item.date);
      return `
      <div class="col">
          <div class="card shadow p-3 mb-5 bg-body rounded">
          <img src="${item.url}" class="card-img-top" alt="${item.title}">
          <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
              <p class="card-text">${item.explanation}</p>
              </div>
              <a class="btn btn-primary" href="post.html?date=${item.date}" id = "btn-card">Ver más...</a>
              <div class="card-footer">
                <small class="text-body-secondary">${dateFormated}</small>
              </div>
          </div>
      </div>
    `
    });

  row.innerHTML = cards.join("");
  }
//Funcion para mostrar fecha de publicaciones
 function formatDate(date) {
    const days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    const currentDate = new Date(); //obtenemos la fecha de hoy
    const itemDate = new Date(date) //lo convertimos en objeto
    const diffDates = currentDate.getTime() - itemDate.getTime();//calcular la diferencia en milisiegundos
    const diffDays = Math.floor(diffDates / (1000 * 60 * 60 * 24));
    console.log(days[itemDate.getDay()])
    console.log(diffDays)

    if (diffDays === 0) {
      return "Publicado hoy"
    } else if (diffDays >= 1 && diffDays <= 6){
      // console.log(days[itemDate.getDay()])
      // console.log(`Pubblicado el dia ${days[itemDate.getDay()]}`)
      return `Pubblicado el dia ${days[itemDate.getDay()]}`
    }
  };

  // cargar galeria 
  const countUrl = "https://api.nasa.gov/planetary/apod?api_key=G0LRTNHSzg0Ny6U4qulMbOYIG2JB5MWbPfieYSRK&count=6"
 
fetch(countUrl)
    .then(response => response.json())
    .then(data => {
      iterateGallery(data)
    })
    .catch(err => {
      console.log(`err ${err}`)
    });
    
    function iterateGallery(data){
      const colGalery = document.getElementById('rowGallery');

      let gallery = '';
      for (let i = 0; i < data.length; i += 2) {
        gallery += `
          <div class="col-lg-4 col-md-12 mb-4 mb-lg-0" id = "imgGalley">
            <img src="${data[i].url}" class="w-100 shadow-1-strong rounded mb-4" alt="${data[i].title}">
          </div>
          <div class="col-lg-4 col-md-12 mb-4 mb-lg-0" id = "imgGalley">
            <img src="${data[i+1].url}" class="w-100 shadow-1-strong rounded mb-4" alt="${data[i+1].title}">
          </div>
        `;
      }
      colGalery.innerHTML = gallery;
    }
function dataShow(data){
  const dateShow = document.getElementById('btn-card');
  dateShow.addEventListener('click', (date) => {
    console.log(date.title)
  })
}
