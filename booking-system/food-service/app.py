from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

CORS(app)


menu = [

    {
        "id": 1,
        "name": "Pizza",
        "price": 250
    },

    {
        "id": 2,
        "name": "Burger",
        "price": 150
    },

    {
        "id": 3,
        "name": "Biryani",
        "price": 220
    },

    {
        "id": 4,
        "name": "Fried Rice",
        "price": 180
    }

]


orders = []


@app.route("/")
def home():

    return jsonify({
        "service": "Food Ordering Service",
        "status": "running"
    })


@app.route("/menu")
def get_menu():

    return jsonify(menu)


@app.route("/order", methods=["POST"])
def create_order():

    data = request.json

    customer = data.get("customer")
    item_id = data.get("item_id")
    quantity = data.get("quantity")


    item = next(
        (
            item
            for item in menu
            if item["id"] == item_id
        ),
        None
    )


    if item is None:

        return jsonify({
            "error": "Food item not found"
        }), 404


    order = {

        "order_id":
            len(orders) + 1,

        "customer":
            customer,

        "item":
            item["name"],

        "quantity":
            quantity,

        "total":
            item["price"] * quantity

    }


    orders.append(order)


    return jsonify({

        "message":
            "Food order created successfully",

        "order":
            order

    }), 201


@app.route("/orders")
def get_orders():

    return jsonify(orders)


if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5001
    )
