from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route("/", methods=["GET"])
def home():
    return render_template("landing.html")


@app.route("/receive-data", methods=["POST"])
def receive_data():
    data_received = request.get_json()
    print(data_received)
    socketio.emit("sensor_update", data_received)

    return {
        "message": "Data had been received"
    }


if __name__ == "__main__":
    socketio.run(app, port=5000)
