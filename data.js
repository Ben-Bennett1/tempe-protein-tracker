// Seeded menu data for restaurants near ASU's Tempe campus that are commonly
// available on DoorDash and Grubhub. Neither service has a public menu API, so
// protein grams are ESTIMATES: chain items are based on the chains' published
// nutrition info for standard builds; local spots are estimated from typical
// portions. Customizations change the real number.
window.RESTAURANTS = [
  {
    name: "Chipotle",
    area: "Mill Ave / University Dr",
    items: [
      { name: "Chicken burrito bowl (rice, black beans, cheese, salsa)", protein: 50 },
      { name: "Double chicken burrito bowl", protein: 82 },
      { name: "Chicken burrito (rice, beans, cheese, salsa)", protein: 58 },
      { name: "Steak burrito bowl (rice, black beans, cheese, salsa)", protein: 39 },
      { name: "Barbacoa burrito bowl (rice, black beans, cheese, salsa)", protein: 42 },
      { name: "Sofritas burrito bowl (rice, black beans, salsa)", protein: 20 },
      { name: "Chicken salad (lettuce, fajita veg, salsa)", protein: 35 },
    ],
  },
  {
    name: "Raising Cane's",
    area: "University Dr",
    items: [
      { name: "The Box Combo (4 fingers, fries, toast, slaw)", protein: 49 },
      { name: "3 Finger Combo", protein: 37 },
      { name: "The Caniac Combo (6 fingers)", protein: 74 },
      { name: "Sandwich Combo", protein: 39 },
      { name: "Chicken finger (each)", protein: 12 },
    ],
  },
  {
    name: "Chick-fil-A",
    area: "Memorial Union / Apache Blvd",
    items: [
      { name: "Chick-fil-A Chicken Sandwich", protein: 29 },
      { name: "Spicy Chicken Sandwich", protein: 28 },
      { name: "Grilled Chicken Sandwich", protein: 28 },
      { name: "Nuggets, 8 ct", protein: 27 },
      { name: "Nuggets, 12 ct", protein: 40 },
      { name: "Grilled Nuggets, 8 ct", protein: 25 },
      { name: "Grilled Nuggets, 12 ct", protein: 38 },
      { name: "Cobb Salad with nuggets", protein: 40 },
      { name: "Market Salad with grilled chicken", protein: 28 },
    ],
  },
  {
    name: "Panda Express",
    area: "Memorial Union / Mill Ave",
    items: [
      { name: "Grilled Teriyaki Chicken (entree)", protein: 36 },
      { name: "Orange Chicken (entree)", protein: 25 },
      { name: "Kung Pao Chicken (entree)", protein: 19 },
      { name: "Broccoli Beef (entree)", protein: 9 },
      { name: "Bowl: Teriyaki Chicken + Chow Mein", protein: 45 },
      { name: "Bowl: Orange Chicken + Fried Rice", protein: 36 },
      { name: "Plate: Teriyaki + Kung Pao + Chow Mein", protein: 64 },
    ],
  },
  {
    name: "CAVA",
    area: "Mill Ave",
    items: [
      { name: "Harissa Honey Chicken bowl", protein: 40 },
      { name: "Chicken + Rice bowl", protein: 45 },
      { name: "Steak + Harissa Avocado bowl", protein: 34 },
      { name: "Greens + Grains bowl with grilled chicken", protein: 38 },
      { name: "Grilled chicken pita", protein: 35 },
    ],
  },
  {
    name: "Jersey Mike's",
    area: "University Dr",
    items: [
      { name: "#17 Mike's Famous Philly (regular)", protein: 46 },
      { name: "Chipotle Chicken Cheese Steak (regular)", protein: 48 },
      { name: "#7 Turkey and Provolone (regular)", protein: 36 },
      { name: "#13 The Original Italian (regular)", protein: 33 },
      { name: "#17 Mike's Famous Philly (giant)", protein: 92 },
    ],
  },
  {
    name: "Jimmy John's",
    area: "Mill Ave",
    items: [
      { name: "#4 Turkey Tom (8\")", protein: 24 },
      { name: "#9 Italian Night Club (8\")", protein: 40 },
      { name: "#5 Vito (8\")", protein: 30 },
      { name: "#12 Beach Club (8\")", protein: 32 },
    ],
  },
  {
    name: "Five Guys",
    area: "Mill Ave",
    items: [
      { name: "Cheeseburger", protein: 47 },
      { name: "Bacon Cheeseburger", protein: 51 },
      { name: "Little Cheeseburger", protein: 27 },
      { name: "Fries (regular)", protein: 8 },
    ],
  },
  {
    name: "In-N-Out Burger",
    area: "Tempe Marketplace",
    items: [
      { name: "Double-Double", protein: 37 },
      { name: "Double-Double, Protein Style", protein: 33 },
      { name: "Cheeseburger", protein: 22 },
      { name: "Hamburger", protein: 16 },
    ],
  },
  {
    name: "Wingstop",
    area: "Apache Blvd",
    items: [
      { name: "Classic wings, 6 pc", protein: 46 },
      { name: "Classic wings, 10 pc", protein: 76 },
      { name: "Boneless wings, 8 pc", protein: 40 },
      { name: "Chicken sandwich", protein: 30 },
    ],
  },
  {
    name: "Taco Bell",
    area: "Apache Blvd",
    items: [
      { name: "Cantina Chicken Bowl", protein: 25 },
      { name: "Chicken Quesadilla", protein: 27 },
      { name: "Crunchwrap Supreme", protein: 16 },
      { name: "Beefy 5-Layer Burrito", protein: 18 },
    ],
  },
  {
    name: "Pita Jungle",
    area: "Mill Ave (local)",
    items: [
      { name: "Chicken shawarma plate", protein: 45 },
      { name: "Grilled chicken pita wrap", protein: 35 },
      { name: "Chicken kabob plate", protein: 42 },
      { name: "Hummus with pita", protein: 15 },
    ],
  },
  {
    name: "Original ChopShop",
    area: "Tempe (local)",
    items: [
      { name: "Chicken and rice bowl", protein: 45 },
      { name: "Steak bowl", protein: 40 },
      { name: "Egg white breakfast burrito", protein: 32 },
      { name: "Protein smoothie", protein: 25 },
    ],
  },
  {
    name: "Cornish Pasty Co.",
    area: "University Dr (local)",
    items: [
      { name: "The Oggie (steak pasty)", protein: 40 },
      { name: "Chicken pot pie pasty", protein: 35 },
      { name: "Shepherd's pie pasty", protein: 30 },
    ],
  },
  {
    name: "Starbucks",
    area: "Mill Ave / campus",
    items: [
      { name: "Bacon & Gruyere Egg Bites", protein: 19 },
      { name: "Eggs & Cheddar Protein Box", protein: 22 },
      { name: "Turkey Bacon, Cheddar & Egg White Sandwich", protein: 17 },
      { name: "Grande latte (2% milk)", protein: 13 },
    ],
  },
];
