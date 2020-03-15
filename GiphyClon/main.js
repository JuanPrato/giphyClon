document.addEventListener("DOMContentLoaded", e => {
    let buscar = document.querySelector('#buscar');
    buscar.addEventListener('click', buscarDatos);
});

function buscarDatos(e) {
    e.preventDefault();
    const busqueda = document.querySelector('#busqueda').value;
    const tipo = document.querySelector('input[type=radio]:checked').id;

    if(busqueda !== ""){
        fetch('http://api.giphy.com/v1/'+ tipo +'/search?q='+ busqueda +'&api_key=b1yMcAQbjJdQIk1bebiFDg1k43vP3amC&limit=5')
        .then(function(informacion) {
            return informacion.json();
        }).then(function(informacion) {
            mostrarResultados(informacion);
    }).catch(function(e) {
        console.log(e);
        console.log("error");
    }); 
    }
}

function mostrarResultados(informacion) {
    let data = informacion.data;
    console.log(data);
    let gifs = document.querySelector('#resultados');
    gifs.innerHTML = '';
    data.forEach(result => {
        
        let resultado = document.createElement('div');

        resultado.innerHTML = 
        `
        <img src="${ result.images.downsized.url }" alt="gif" class="img_gif">
        <h3 class="title">${ result.title }</h3>
        <div class="links_gif">
            <a class="btn bg-success" href="${ result.source }" target="_blank">SOURCE</a>
            <a class="btn bg-danger " href="${ result.url }" target="_blank" rel="noopener noreferrer">GIPHY</a>
        </div>`;

        resultado.classList.add('gif');

        gifs.appendChild(resultado);
    });
}