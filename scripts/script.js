// Prueba tradución yandex
// const yandexUrl = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=pdct.1.1.20230504T144258Z.504a536ae0421e6b.fbc26c77bd54170d14f5e6134e8c159011a597fa&text=hello%20world&lang=en-es';
// const text = 'hello mi name is yandex';
// const lang = 'en-es';

// // creamos el fetch
// fetch(yandexUrl)
//   .then(response => response.json())
//   .then(data => {
//     const traslation = data.text[0];
//     console.log(`Traduccion: ${traslation}`);
//   })
//   .catch(error => console.log(error));

/*Sección Publicaciones Recienes */
// Obtenemos las fechas de inicio y finalización para enviar a la api
const startDate = new Date();
const endDate = new Date();
endDate.setDate(startDate.getDate() - 6);//restamos 6 dias a la fecha actual 
const endDateIso = endDate.toISOString().slice(0, 10);// formateamos a YYYY-MM-DD
const startDateIso = startDate.toISOString().slice(0, 10);// formateamos a YYYY-MM-DD

// Creamos el parametro con las fechas para el fetch
const apiCount = `https://api.nasa.gov/planetary/apod?api_key=G0LRTNHSzg0Ny6U4qulMbOYIG2JB5MWbPfieYSRK&start_date=${endDateIso}&end_date=${startDateIso}`
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
      <div clGaleria de fechasass="col">
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
    // console.log(days[itemDate.getDay()])
    // console.log(diffDays)

    if (diffDays === 1) {
      return "Publicado Ayer"
    } else if (diffDays >= 1 && diffDays <= 6){
      // console.log(days[itemDate.getDay()])
      // console.log(`Pubblicado el dia ${days[itemDate.getDay()]}`)
      return `Pubblicado el dia ${days[itemDate.getDay()]}`
    }
  };
 
  /* Sección Galeria */
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
            <a href="post.html?date=${data[i].date}"> 
            <img src="${data[i].url}" class="w-100 shadow-1-strong rounded mb-4" alt="${data[i].title}">
            </a>
          </div>
          <div class="col-lg-4 col-md-12 mb-4 mb-lg-0" id = "imgGalley">
            <a href="post.html?date=${data[i+1].date}"> 
            <img src="${data[i+1].url}" class="w-100 shadow-1-strong rounded mb-4" alt="${data[i+1].title}">
            </a>
          </div>
        `;
      }
      colGalery.innerHTML = gallery;
    }

/* Sección Busqueda de Imagenes */
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
      <div class="card mb-3 text-center shadow">
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

// Obtenemos la fecha de inicio y el año para el calendario
document.querySelector('#calendarButton').addEventListener('click', ()=>{
  const month = document.getElementById('monthInput').value;
  const year = document.getElementById('yearInput').value;
  
  const startDate = new Date(year, month -1, 1);//Establecemos de inicio, restamos 1 a nuestro mes ya que en js las fechas empiezan el 0
  const endDate = new Date(year, month, 0); // establecer el día 0 del mes siguiente para obtener el último día del mes actual

  //Damos un formato de YYYY-MM-DD, con .slice obtenemos los primeros caracteres de 0 a 10
  const formattedStartDate = startDate.toISOString().slice(0, 10);
  const formattedEndDate = endDate.toISOString().slice(0, 10);

  // Enviamos las fechas para el api
  calendarImage(formattedStartDate, formattedEndDate);

})

function calendarImage(start, end){
  // calendario de imagenes
const apiMonth = `https://api.nasa.gov/planetary/apod?api_key=G0LRTNHSzg0Ny6U4qulMbOYIG2JB5MWbPfieYSRK&start_date=${start}&end_date=${end}`
fetch(apiMonth)
  .then(response => response.json())
  .then(data => {
    iterateData(data)
  })
  .catch(err => {
    console.log(`err ${err}`)
  });

  function iterateData(data){
    const row = document.getElementById('calendarRow');
    const cards = data.map(item => {
    const dateFormated = formatDate(item.date);
      return `
            <div class="col-sm-2">
              <a href="post.html?date=${item.date}">
                <img src="${item.url}" class="img-fluid">
              </a>
            </div>
    `
    });

  row.innerHTML = cards.join("");
  }
}
