const themeButton = document.querySelector('#theme');
let dark = true;
themeButton.onclick = () => {
    themeButton.firstElementChild.setAttribute('class', dark ? "bi bi-moon-fill text-info" : "bi bi-brightness-high-fill text-warning");
    document.body.setAttribute('class', dark ? "bg-light text-dark" : "bg-dark text-light");
    dark = !dark;
    themeButton.setAttribute('class', dark ? "btn btn-dark p-3 m-3 text-center border-1 border-secondary" : "btn btn-light p-3 m-3 text-center border-1 border-secondary");
}
const searchButton = document.querySelector('#search')
searchButton.onclick = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            window.location.href = `${position.coords.longitude}&${position.coords.latitude}`;
        }, err => {
            console.log(err);
        });
    } else {
        alert('Geolocation is either blocked or not supported by this browser.');
    }
}
