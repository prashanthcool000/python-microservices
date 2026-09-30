from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

CORS(app)


buses = [

    {
        "id": 1,
        "bus_name": "Express Travels",
        "from": "Visakhapatnam",
        "to": "Hyderabad",
        "available_seats": 40
    },

    {
        "id": 2,
        "bus_name": "Orange Travels",
        "from": "Vijayawada",
        "to": "Bangalore",
        "available_seats": 35
    },

    {
        "id": 3,
        "bus_name": "Morning Star",
        "from": "Hyderabad",
        "to": "Chennai",
        "available_seats": 50
    },

    {
        "id": 4,
        "bus_name": "VRL Travels",
        "from": "Chennai",
        "to": "Bangalore",
        "available_seats": 45
    }

]


bookings = []


@app.route("/")
def home():

    return jsonify({

        "service":
            "Bus Booking Service",

        "status":
            "running"

    })


@app.route("/buses")
def get_buses():

    return jsonify(buses)


@app.route("/book", methods=["POST"])
def book_bus():

    data = request.json

    customer = data.get("customer")
    bus_id = data.get("bus_id")
    seats = data.get("seats")


    bus = next(

        (
            bus
            for bus in buses
            if bus["id"] == bus_id
        ),

        None
    )


    if bus is None:

        return jsonify({

            "error":
                "Bus not found"

        }), 404


    if seats <= 0:

        return jsonify({

            "error":
                "Invalid seat count"

        }), 400


    if bus["available_seats"] < seats:

        return jsonify({

            "error":
                "Not enough seats"

        }), 400


    bus["available_seats"] -= seats


    booking = {

        "booking_id":
            len(bookings) + 1,

        "customer":
            customer,

        "bus":
            bus["bus_name"],

        "route":
            f'{bus["from"]} → {bus["to"]}',

        "seats":
            seats

    }


    bookings.append(booking)


    return jsonify({

        "message":
            "Bus booked successfully",

        "booking":
            booking

    }), 201


@app.route("/bookings")
def get_bookings():

    return jsonify(bookings)


if __name__ == "__main__":

    app.run(

        host="0.0.0.0",

        port=5003

    )
