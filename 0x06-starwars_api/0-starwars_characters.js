import requests
import sys

def get_movie_characters(movie_id):
    url = f"https://swapi.dev/api/films/{movie_id}/"
    response = requests.get(url)
    if response.status_code == 200:
        movie_data = response.json()
        character_urls = movie_data['characters']
        for character_url in character_urls:
            character_response = requests.get(character_url)
            if character_response.status_code == 200:
                character_data = character_response.json()
                character_name = character_data['name']
                print(character_name)
            else:
                print(f"Failed to retrieve character: {character_url}")
    else:
        print(f"Failed to retrieve movie: {url}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python script.py [movie_id]")
    else:
        movie_id = sys.argv[1]
        get_movie_characters(movie_id)

