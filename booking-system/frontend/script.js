const FOOD_API = "http://localhost:5001";

const MOVIE_API = "http://localhost:5002";

const BUS_API = "http://localhost:5003";


// -------------------------
// FOOD
// -------------------------

async function loadFoodMenu() {

    try {

        const response =
            await fetch(`${FOOD_API}/menu`);

        const menu =
            await response.json();

        const container =
            document.getElementById("menu");

        container.innerHTML = "";

        menu.forEach(item => {

            container.innerHTML += `

                <div class="item">

                    <h3>${item.name}</h3>

                    <p>Item ID: ${item.id}</p>

                    <p>₹${item.price}</p>

                </div>

            `;

        });

    } catch (error) {

        document.getElementById("menu").innerHTML =
            "Unable to connect to Food Service";

    }
}


async function placeFoodOrder() {

    const customer =
        document.getElementById("foodCustomer").value;

    const item_id =
        Number(document.getElementById("foodItem").value);

    const quantity =
        Number(document.getElementById("foodQuantity").value);


    const response = await fetch(
        `${FOOD_API}/order`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                customer,
                item_id,
                quantity
            })
        }
    );


    const data = await response.json();


    document.getElementById("foodResult").innerText =
        data.message || data.error;
}


// -------------------------
// MOVIE
// -------------------------

async function loadMovies() {

    try {

        const response =
            await fetch(`${MOVIE_API}/movies`);

        const movies =
            await response.json();

        const container =
            document.getElementById("movies");

        container.innerHTML = "";

        movies.forEach(movie => {

            container.innerHTML += `

                <div class="item">

                    <h3>${movie.name}</h3>

                    <p>Movie ID: ${movie.id}</p>

                    <p>
                        Available Seats:
                        ${movie.available_seats}
                    </p>

                </div>

            `;

        });

    } catch (error) {

        document.getElementById("movies").innerHTML =
            "Unable to connect to Movie Service";

    }
}


async function bookMovie() {

    const customer =
        document.getElementById("movieCustomer").value;

    const movie_id =
        Number(document.getElementById("movieId").value);

    const seats =
        Number(document.getElementById("movieSeats").value);


    const response = await fetch(
        `${MOVIE_API}/book`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                customer,
                movie_id,
                seats
            })
        }
    );


    const data = await response.json();


    document.getElementById("movieResult").innerText =
        data.message || data.error;

}


// -------------------------
// BUS
// -------------------------

async function loadBuses() {

    try {

        const response =
            await fetch(`${BUS_API}/buses`);

        const buses =
            await response.json();

        const container =
            document.getElementById("buses");

        container.innerHTML = "";


        buses.forEach(bus => {

            container.innerHTML += `

                <div class="item">

                    <h3>${bus.bus_name}</h3>

                    <p>Bus ID: ${bus.id}</p>

                    <p>
                        ${bus.from}
                        →
                        ${bus.to}
                    </p>

                    <p>
                        Available Seats:
                        ${bus.available_seats}
                    </p>

                </div>

            `;

        });

    } catch (error) {

        document.getElementById("buses").innerHTML =
            "Unable to connect to Bus Service";

    }
}


async function bookBus() {

    const customer =
        document.getElementById("busCustomer").value;

    const bus_id =
        Number(document.getElementById("busId").value);

    const seats =
        Number(document.getElementById("busSeats").value);


    const response = await fetch(
        `${BUS_API}/book`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                customer,
                bus_id,
                seats
            })
        }
    );


    const data = await response.json();


    document.getElementById("busResult").innerText =
        data.message || data.error;

}
