# Tempe Protein Tracker

A small web app that tells you how much more protein you need today when you're eating DoorDash and Grubhub food from restaurants near ASU's Tempe campus.

- Set a daily target from your body weight (0.7, 0.8 or 1.0 g per lb) or type grams directly.
- Log meals from a seeded list of popular Tempe/ASU-area restaurants (Chipotle, Raising Cane's, Chick-fil-A, Panda Express, CAVA, Pita Jungle, Original ChopShop and more), or add anything custom.
- See grams remaining today, picks that would close the gap, and the last 7 days.

Everything is stored in your browser's localStorage. No account, no server.

## About the numbers

DoorDash and Grubhub don't offer a public menu or nutrition API, so protein values are **estimates**: chain items follow the chains' published nutrition for standard builds, and local spots are estimated from typical portions. Edit `data.js` to correct or add items.

## Run it

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

## Host it on GitHub Pages

Settings → Pages → Build and deployment → Source: **Deploy from a branch**, Branch: `main`, folder `/ (root)`. The app will be at `https://<user>.github.io/tempe-protein-tracker/`.
