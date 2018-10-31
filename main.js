var app = new Vue({
    el: "#main",
    data: {
        input: "",
        allInfo: [],
        cityName: "",
        currentTemperature: "",
        seen: false,
        today: [],
    },
    methods: {
        getData: function (city) {
            var fetchConfig =
                fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=e7fc92144c2d422e07ccacb12e19d605", {
                    method: "GET",
                }).then(function (response) {
                    if (response.ok) {
                        return response.json();
                    }
                    if (response.status === 404) {
                        alert("Bad Request");
                    }
                }).then(function (json) {
                    var data = json;
                    app.allInfo = data;
                    console.log(app.allInfo)
                    app.seen = true;
                    app.cityName = app.allInfo.city.name;
                    app.currentTemperature = Math.round(app.allInfo.list[0].main.temp - 273);
                    app.mainWeather = app.allInfo.list[0].weather[0].main;
                    app.calculateTodayArray();

                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        calculateTodayArray() {
            for (var i = 0; i < app.allInfo.list.length; i++) {
                if (i < 6) {
                    app.today.push(app.allInfo.list[i])
                } else {
                    break;
                }
            } return app.today;

        }, 
    }
})
