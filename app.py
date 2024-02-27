#!flask/bin/python
from flask import Flask, jsonify, request
from util.airports import find_airports
from flask import render_template

app = Flask(__name__)
app.config.from_pyfile("settings.py")

airports = [
    {
        "position": {"lat": 37.46375183, "lng": -122.1176523},
        "title": "Airport PAO",
    },
]


@app.route("/")
def index():
    print(app.config)
    return render_template("index.html", google_api_key=app.config["GOOGLE_API_KEY"])


@app.route("/airports", methods=["GET"])
def get_airports():
    swlat = request.args.get("swlat")
    swlng = request.args.get("swlng")
    nelat = request.args.get("nelat")
    nelng = request.args.get("nelng")
    print("swlat and swlng: %s, %s" % (swlat, swlng))
    return jsonify(
        {
            "airports": find_airports(
                float(swlat), float(swlng), float(nelat), float(nelng)
            )
        }
    )


if __name__ == "__main__":
    app.run(debug=True)
