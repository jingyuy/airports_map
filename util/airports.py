import pandas as pd


def read_airports_df():
    # Path to the CSV file
    csv_file_path = "./data/us-airports.csv"

    # Read the CSV file into a Pandas DataFrame
    try:
        df = pd.read_csv(csv_file_path)
        df = df[df["type"].isin(["small_airport", "medium_airport", "large_airport"])]
        return df[["id", "ident", "name", "latitude_deg", "longitude_deg"]]
    except FileNotFoundError:
        print(f"Error: File '{csv_file_path}' not found.")
    except Exception as e:
        print(f"An error occurred: {str(e)}")


airports_df = read_airports_df()


def convert_records(records):
    return [
        {
            "position": {"lat": record["latitude_deg"], "lng": record["longitude_deg"]},
            "title": record["name"],
            "id": record["ident"],
        }
        for record in records
    ]


def find_airports(swlat, swlng, nelat, nelng):
    global airports_df
    filtered_airports_df = airports_df[
        (airports_df["latitude_deg"] > swlat)
        & (airports_df["latitude_deg"] < nelat)
        & (airports_df["longitude_deg"] > swlng)
        & (airports_df["longitude_deg"] < nelng)
    ]
    filtered_airports_selected_columns = filtered_airports_df[
        ["ident", "name", "latitude_deg", "longitude_deg"]
    ]
    return convert_records(filtered_airports_selected_columns.to_dict("records"))
