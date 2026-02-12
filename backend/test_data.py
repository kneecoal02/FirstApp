import requests
import time
import random


while True:
    url = "http://127.0.0.1:5000/receive-data"
    new_num = random.randrange(0, 10000)
    payload = {"distance": new_num}
    response = requests.post(url, json=payload)
    data = response.json()
    print(data)
    time.sleep(3)
