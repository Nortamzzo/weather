 window.addEventListener('load', () => {
    let lon;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationArea = document.querySelector('.location-area');
    let degreeSection = document.querySelector('.degree-section')
    const degreeSpan = document.querySelector('.degree-section span')

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lon = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=bb803030536d8b72f97a887d0a39f14f&units=imperial`

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const { temp } = data.main;
                const { description } = data.weather[0];
                const { name } = data;
                // Set DOM Elements from the API
                temperatureDegree.textContent = Math.floor(temp);
                locationArea.textContent = name;
                temperatureDescription.textContent = description;
                // Formula for celsius
                let celsius = (temp - 32) * (5 / 9);

                // Change temp f to c
                degreeSection.addEventListener('click', () => {
                    if(degreeSpan.textContent === 'F') {
                        degreeSpan.textContent = 'C';
                        temperatureDegree.textContent = Math.floor(celsius);
                    } else {
                        degreeSpan.textContent = 'F';
                        temperatureDegree.textContent = Math.floor(temp);
                    }
                })
            });
        });
    } 
});