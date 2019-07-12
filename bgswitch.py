#!/usr/bin/env python3

import requests, random, pathlib, os, sys

# set header so reddit doesn't throw a 429 at us
header = {"user-agent": "Zach\'s Test Script"}

# set reddit url (can swap "wallpapers" for another subreddit & change limit as desired
url = "https://www.reddit.com/r/wallpapers.json?limit=100"

# fire get to nab the json list of posts
response = requests.get(url, headers=header)

# handle error, in case reddit doesn't come back with a 200
if response.ok:
    print("uh-oh, meteors!")
    sys.exit()

# grab list of actual posts
array_of_posts = response.json()["data"]["children"]

# set a random number between 0 & post count
random_number = random.randint(0, len(array_of_posts)-1)

# grab post at random number in array
random_post = array_of_posts[random_number]

# nab url of chosen random post
image_url = random_post["data"]["url"]

# sniff out file extension of image
ext = pathlib.Path(image_url).suffix

# fire get to nab the actual image
image = requests.get(image_url, headers = header)

# set our location to save the image
file_location = "/home/pi/Pictures/background" + ext

# open image file for writing (mode has 'b' for binary data & 'w' for writing)
output_filehandle = open(file_location, mode="bw")

# write image file
output_filehandle.write(image.content)

# set file as background image
os.system("pcmanfm --set-wallpaper '" + file_location + "'")
