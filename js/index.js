
let plot = (data) => {
    const ctx = document.getElementById('myChart')

    const dataset = {
        labels: data.hourly.time,
        datasets: [{
            label: 'Temperatura semanal',
            data: data.hourly.temperature_2m,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    const config = {
        type: 'line',
        data: dataset,
    };

    const chart = new Chart(ctx, config)
}

let bar = (data) =>{
    const ctx = document.getElementById('myChart2')

    const dataset = {
        labels: data.daily.time,

        datasets: [{
            label: 'Temperatura semanal',
            data: data.daily.uv_index_max,
            fill: false,
            backgroundColor: [
                'rgba(54, 162, 235, 2)',
                'rgba(255, 99, 132, 2)',
                'rgba(255, 99, 132, 2)',
                'rgba(255, 99, 132, 2)',
                'rgba(54, 162, 235, 2)',
                'rgba(75, 192, 192, 2)',
                'rgba(75, 192, 192, 2)'

            ],
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    const config = {
        type: 'bar',
        data: dataset,
    };

    const chart = new Chart(ctx, config)
}


let load = (data) => {
    document.getElementById('timeZone').innerHTML = data['timezone']
    document.getElementById('elevation').innerHTML = data['elevation'] + '%'
    document.getElementById('latitude').innerHTML = data['latitude']
    plot(data)
    bar(data)
}

let loadlnocar = () =>{
    let URL_proxy = 'https://cors-anywhere.herokuapp.com/' 
    let URL = URL_proxy + 'https://www.inocar.mil.ec/mareas/consultan.php';

    fetch(URL)
           .then(response => response.text())
          .then(data => {
             const parser = new DOMParser();
             const xml = parser.parseFromString(data, "text/html");
             let contenedorMareas = xml.getElementsByTagName('div')[0];
             let contenedorHTML = document.getElementById('table-container');
             contenedorHTML.innerHTML = contenedorMareas.innerHTML;
             console.log(xml);
          })
          .catch(console.error);

}
    (
        function () {
            let meteo = localStorage.getItem('meteo');
            if(meteo == null) {
                let URL = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&daily=uv_index_max&timezone=auto';
                    
                fetch(URL)
                .then(response => response.json())
                .then(data => {
                    load(data)
            
                    /* GUARDAR DATA EN LA MEMORIA */
                    localStorage.setItem("meteo", JSON.stringify(data))
                })
                .catch(console.error);
            
              } else {
            
                  /* CARGAR DATA DESDE LA MEMORIA */
                  load(JSON.parse(meteo));
                  loadlnocar();
              }
        }
    )();