import requests
import sys

# Check if the movie ID is passed as an argument
if len(sys.argv) < 2:
    print("Please provide the movie ID as an argument.")
    sys.exit()

# Get the movie ID from the argument
movie_id = sys.argv[1]

# Make a request to the Star Wars API to get the movie details
url = f"https://swapi.dev/api/films/{movie_id}/"
response = requests.get(url)

# Check if the request was successful
if response.status_code != 200:
    print("Failed to retrieve data from the API.")
    sys.exit()

# Get the character URLs from the movie details
movie_details = response.json()
characters = movie_details["characters"]

# Loop through the character URLs and make a request to get the character details
for character_url in characters:
    response = requests.get(character_url)
    if response.status_code != 200:
        print(f"Failed to retrieve character data from {character_url}.")
        continue
      
    # Get the character name from the character details and print it
    character_details = response.json()
    print(character_details["name"])
