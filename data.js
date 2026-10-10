// Seeded menus for restaurants near ASU's Tempe campus that are commonly on
// DoorDash and Grubhub. Neither service has a public menu or nutrition API, so
// every number here is an ESTIMATE:
//   protein: chain items follow the chains' published nutrition for a standard
//            build; local spots are estimated from typical portions.
//   price:   rough delivery-app menu price in USD before fees and tip (apps
//            usually list items above in-store prices, and it varies by store).
// campus: true marks ASU dining locations (ordered through Grubhub on campus).
// apps lists where the restaurant has been seen for delivery or pickup.
// Edit freely; ids must stay unique because logs and favorites reference them.
window.RESTAURANTS = [
  {
    id: "chipotle", name: "Chipotle", area: "Mill Ave", color: "#a81612", emoji: "🌯",
    items: [
      { id: "chip-chx-bowl", name: "Chicken burrito bowl", desc: "Rice, black beans, cheese, salsa", protein: 50, price: 12.5, tags: ["bowl", "chicken"] },
      { id: "chip-dbl-chx-bowl", name: "Double chicken bowl", desc: "Rice, black beans, cheese, salsa", protein: 82, price: 16.75, tags: ["bowl", "chicken"] },
      { id: "chip-chx-burrito", name: "Chicken burrito", desc: "Rice, beans, cheese, salsa", protein: 58, price: 12.5, tags: ["chicken"] },
      { id: "chip-steak-bowl", name: "Steak burrito bowl", desc: "Rice, black beans, cheese, salsa", protein: 39, price: 14.25, tags: ["bowl", "beef"] },
      { id: "chip-barb-bowl", name: "Barbacoa burrito bowl", desc: "Rice, black beans, cheese, salsa", protein: 42, price: 14.25, tags: ["bowl", "beef"] },
      { id: "chip-sofritas-bowl", name: "Sofritas bowl", desc: "Rice, black beans, salsa", protein: 20, price: 12.5, tags: ["bowl", "veg"] },
      { id: "chip-chx-salad", name: "Chicken salad", desc: "Romaine, fajita veggies, salsa", protein: 35, price: 12.5, tags: ["salad", "chicken"] },
    ],
  },
  {
    id: "canes", name: "Raising Cane's", area: "University Dr", color: "#c8102e", emoji: "🍗",
    items: [
      { id: "canes-box", name: "The Box Combo", desc: "4 fingers, fries, toast, slaw", protein: 49, price: 14.5, tags: ["chicken"] },
      { id: "canes-3", name: "3 Finger Combo", desc: "Fries, toast, drink", protein: 37, price: 12.25, tags: ["chicken"] },
      { id: "canes-caniac", name: "The Caniac Combo", desc: "6 fingers, fries, toast, slaw", protein: 74, price: 20.5, tags: ["chicken"] },
      { id: "canes-sandwich", name: "Sandwich Combo", desc: "3 fingers on a bun, fries", protein: 39, price: 12.75, tags: ["chicken", "sandwich"] },
      { id: "canes-finger", name: "Extra chicken finger", desc: "One finger", protein: 12, price: 2.25, tags: ["chicken"] },
    ],
  },
  {
    id: "cfa", name: "Chick-fil-A", area: "Memorial Union", campus: true, apps: ["Grubhub"], color: "#dd0031", emoji: "🐔",
    items: [
      { id: "cfa-sandwich", name: "Chicken Sandwich", desc: "Classic, pickles", protein: 29, price: 6.5, tags: ["chicken", "sandwich"] },
      { id: "cfa-spicy", name: "Spicy Chicken Sandwich", desc: "Pepper jack optional", protein: 28, price: 6.9, tags: ["chicken", "sandwich"] },
      { id: "cfa-grilled-sand", name: "Grilled Chicken Sandwich", desc: "Multigrain bun", protein: 28, price: 8.4, tags: ["chicken", "sandwich", "lean"] },
      { id: "cfa-nug8", name: "Nuggets, 8 ct", desc: "Breaded", protein: 27, price: 6.6, tags: ["chicken"] },
      { id: "cfa-nug12", name: "Nuggets, 12 ct", desc: "Breaded", protein: 40, price: 9.4, tags: ["chicken"] },
      { id: "cfa-gnug8", name: "Grilled Nuggets, 8 ct", desc: "Grilled", protein: 25, price: 7.6, tags: ["chicken", "lean"] },
      { id: "cfa-gnug12", name: "Grilled Nuggets, 12 ct", desc: "Grilled", protein: 38, price: 11.2, tags: ["chicken", "lean"] },
      { id: "cfa-cobb", name: "Cobb Salad", desc: "With nuggets", protein: 40, price: 11.9, tags: ["salad", "chicken"] },
    ],
  },
  {
    id: "panda", name: "Panda Express", area: "Memorial Union", campus: true, color: "#d02630", emoji: "🥡",
    items: [
      { id: "panda-teri-bowl", name: "Bowl: Teriyaki Chicken", desc: "With chow mein", protein: 45, price: 11.4, tags: ["bowl", "chicken"] },
      { id: "panda-orange-bowl", name: "Bowl: Orange Chicken", desc: "With fried rice", protein: 36, price: 11.4, tags: ["bowl", "chicken"] },
      { id: "panda-plate", name: "Plate: Teriyaki + Kung Pao", desc: "With chow mein", protein: 64, price: 13.4, tags: ["chicken"] },
      { id: "panda-teri", name: "Grilled Teriyaki Chicken", desc: "Entree only", protein: 36, price: 7.9, tags: ["chicken", "lean"] },
      { id: "panda-broc-beef", name: "Broccoli Beef", desc: "Entree only", protein: 9, price: 6.9, tags: ["beef"] },
    ],
  },
  {
    id: "cava", name: "CAVA", area: "Mill Ave", color: "#2f4f3a", emoji: "🥙",
    items: [
      { id: "cava-hh", name: "Harissa Honey Chicken bowl", desc: "Grains, greens, toppings", protein: 40, price: 15.2, tags: ["bowl", "chicken"] },
      { id: "cava-chx-rice", name: "Chicken + Rice bowl", desc: "Saffron rice, chicken", protein: 45, price: 15.2, tags: ["bowl", "chicken"] },
      { id: "cava-steak", name: "Steak + Harissa Avocado", desc: "Bowl", protein: 34, price: 17.5, tags: ["bowl", "beef"] },
      { id: "cava-pita", name: "Grilled chicken pita", desc: "Hummus, veggies", protein: 35, price: 14.1, tags: ["chicken", "sandwich"] },
    ],
  },
  {
    id: "jerseymikes", name: "Jersey Mike's", area: "University Dr", color: "#00426a", emoji: "🥖",
    items: [
      { id: "jm-philly", name: "#17 Famous Philly", desc: "Regular", protein: 46, price: 13.5, tags: ["beef", "sandwich"] },
      { id: "jm-chipchx", name: "Chipotle Chicken Cheesesteak", desc: "Regular", protein: 48, price: 13.5, tags: ["chicken", "sandwich"] },
      { id: "jm-turkey", name: "#7 Turkey & Provolone", desc: "Regular, Mike's Way", protein: 36, price: 12.4, tags: ["sandwich", "lean"] },
      { id: "jm-italian", name: "#13 Original Italian", desc: "Regular, Mike's Way", protein: 33, price: 12.4, tags: ["sandwich"] },
      { id: "jm-philly-giant", name: "#17 Famous Philly", desc: "Giant", protein: 92, price: 22.5, tags: ["beef", "sandwich"] },
    ],
  },
  {
    id: "jimmyjohns", name: "Jimmy John's", area: "Mill Ave", color: "#111111", emoji: "🥪",
    items: [
      { id: "jj-turkeytom", name: "#4 Turkey Tom", desc: "8 inch", protein: 24, price: 9.6, tags: ["sandwich", "lean"] },
      { id: "jj-inc", name: "#9 Italian Night Club", desc: "8 inch", protein: 40, price: 11.4, tags: ["sandwich"] },
      { id: "jj-beachclub", name: "#12 Beach Club", desc: "8 inch", protein: 32, price: 11.0, tags: ["sandwich"] },
    ],
  },
  {
    id: "fiveguys", name: "Five Guys", area: "Mill Ave", color: "#c8102e", emoji: "🍔",
    items: [
      { id: "fg-cheese", name: "Cheeseburger", desc: "Two patties", protein: 47, price: 13.9, tags: ["beef", "burger"] },
      { id: "fg-bacon", name: "Bacon Cheeseburger", desc: "Two patties", protein: 51, price: 15.4, tags: ["beef", "burger"] },
      { id: "fg-little", name: "Little Cheeseburger", desc: "One patty", protein: 27, price: 10.4, tags: ["beef", "burger"] },
    ],
  },
  {
    id: "innout", name: "In-N-Out Burger", area: "Tempe Marketplace", color: "#e41f26", emoji: "🍟",
    items: [
      { id: "ino-dd", name: "Double-Double", desc: "Classic", protein: 37, price: 7.2, tags: ["beef", "burger"] },
      { id: "ino-dd-ps", name: "Double-Double, Protein Style", desc: "Lettuce wrap", protein: 33, price: 7.2, tags: ["beef", "burger", "lean"] },
      { id: "ino-cheese", name: "Cheeseburger", desc: "Single", protein: 22, price: 5.1, tags: ["beef", "burger"] },
    ],
  },
  {
    id: "wingstop", name: "Wingstop", area: "Apache Blvd", color: "#0a5c36", emoji: "🔥",
    items: [
      { id: "ws-6", name: "Classic wings, 6 pc", desc: "Bone-in", protein: 46, price: 11.9, tags: ["chicken"] },
      { id: "ws-10", name: "Classic wings, 10 pc", desc: "Bone-in", protein: 76, price: 18.5, tags: ["chicken"] },
      { id: "ws-boneless8", name: "Boneless wings, 8 pc", desc: "Breaded", protein: 40, price: 11.5, tags: ["chicken"] },
    ],
  },
  {
    id: "tacobell", name: "Taco Bell", area: "0.2 mi from Rural Rd", apps: ["DoorDash"], color: "#702082", emoji: "🌮",
    items: [
      { id: "tb-cantina", name: "Cantina Chicken Bowl", desc: "Chicken, rice, beans", protein: 25, price: 8.9, tags: ["bowl", "chicken"] },
      { id: "tb-quesadilla", name: "Chicken Quesadilla", desc: "Three cheese", protein: 27, price: 6.9, tags: ["chicken"] },
      { id: "tb-crunchwrap", name: "Crunchwrap Supreme", desc: "Beef", protein: 16, price: 6.4, tags: ["beef"] },
    ],
  },
  {
    id: "pitajungle", name: "Pita Jungle", area: "Mill Ave · local", color: "#5b8c2a", emoji: "🧆",
    items: [
      { id: "pj-shawarma", name: "Chicken shawarma plate", desc: "Rice, salad, hummus", protein: 45, price: 18.5, tags: ["chicken"] },
      { id: "pj-wrap", name: "Grilled chicken pita wrap", desc: "Veggies, garlic sauce", protein: 35, price: 15.5, tags: ["chicken", "sandwich", "lean"] },
      { id: "pj-kabob", name: "Chicken kabob plate", desc: "Rice, salad", protein: 42, price: 19.5, tags: ["chicken"] },
      { id: "pj-hummus", name: "Hummus with pita", desc: "Starter", protein: 15, price: 10.5, tags: ["veg"] },
    ],
  },
  {
    id: "chopshop", name: "Original ChopShop", area: "Tempe · local", color: "#1b1b1b", emoji: "🥗",
    items: [
      { id: "ocs-chx-bowl", name: "Chicken and rice bowl", desc: "Grilled chicken, veggies", protein: 45, price: 15.0, tags: ["bowl", "chicken", "lean"] },
      { id: "ocs-steak-bowl", name: "Steak bowl", desc: "Steak, rice, veggies", protein: 40, price: 17.0, tags: ["bowl", "beef"] },
      { id: "ocs-burrito", name: "Egg white breakfast burrito", desc: "Breakfast", protein: 32, price: 11.5, tags: ["breakfast", "lean"] },
      { id: "ocs-smoothie", name: "Protein smoothie", desc: "With whey", protein: 25, price: 9.5, tags: ["drink"] },
    ],
  },
  {
    id: "cornish", name: "Cornish Pasty Co.", area: "University Dr · local", color: "#7a3b12", emoji: "🥧",
    items: [
      { id: "cp-oggie", name: "The Oggie", desc: "Steak pasty", protein: 40, price: 16.0, tags: ["beef"] },
      { id: "cp-potpie", name: "Chicken pot pie pasty", desc: "Pasty", protein: 35, price: 16.0, tags: ["chicken"] },
      { id: "cp-shepherd", name: "Shepherd's pie pasty", desc: "Pasty", protein: 30, price: 16.0, tags: ["beef"] },
    ],
  },
  {
    id: "starbucks", name: "Starbucks", area: "Palo Verde", campus: true, apps: ["Grubhub"], color: "#00704a", emoji: "☕",
    items: [
      { id: "sb-eggbites", name: "Bacon & Gruyère Egg Bites", desc: "2 pieces", protein: 19, price: 6.5, tags: ["breakfast"] },
      { id: "sb-proteinbox", name: "Eggs & Cheddar Protein Box", desc: "Eggs, cheese, fruit", protein: 22, price: 7.2, tags: ["breakfast"] },
      { id: "sb-tbsandwich", name: "Turkey Bacon Egg White Sandwich", desc: "Breakfast", protein: 17, price: 6.1, tags: ["breakfast", "lean"] },
      { id: "sb-latte", name: "Grande latte", desc: "2% milk", protein: 13, price: 6.2, tags: ["drink"] },
    ],
  },
  // ---- ASU Tempe campus dining (Grubhub) ----
  {
    id: "qdoba", name: "Qdoba", area: "Memorial Union", campus: true, apps: ["Grubhub"], color: "#7a2531", emoji: "🌯",
    items: [
      { id: "qd-chx-bowl", name: "Chicken burrito bowl", desc: "Rice, black beans, cheese, salsa", protein: 42, price: 11.5, tags: ["bowl", "chicken"] },
      { id: "qd-dbl-chx-bowl", name: "Double chicken bowl", desc: "Rice, black beans, cheese, salsa", protein: 68, price: 15.0, tags: ["bowl", "chicken"] },
      { id: "qd-steak-burrito", name: "Steak burrito", desc: "Rice, beans, cheese, salsa", protein: 45, price: 13.0, tags: ["beef"] },
      { id: "qd-chx-tacos", name: "3 chicken tacos", desc: "Corn or flour", protein: 30, price: 10.5, tags: ["chicken"] },
    ],
  },
  {
    id: "choolaah", name: "Choolaah", area: "Memorial Union", campus: true, apps: ["Grubhub"], color: "#e2a400", emoji: "🍛",
    items: [
      { id: "ch-tikka-bowl", name: "Chicken tikka bowl", desc: "Basmati, chickpeas, sauce", protein: 40, price: 13.5, tags: ["bowl", "chicken"] },
      { id: "ch-salmon-bowl", name: "Salmon tikka bowl", desc: "Basmati, veggies", protein: 34, price: 15.5, tags: ["bowl", "lean"] },
      { id: "ch-paneer-bowl", name: "Paneer tikka bowl", desc: "Basmati, chickpeas", protein: 26, price: 12.5, tags: ["bowl", "veg"] },
      { id: "ch-naan-wrap", name: "Chicken naan wrap", desc: "Naan, chicken tikka", protein: 32, price: 11.5, tags: ["chicken", "sandwich"] },
    ],
  },
  {
    id: "tlc", name: "Tenders, Love & Chicken", area: "Tooker House", campus: true, apps: ["Grubhub"], color: "#d4571b", emoji: "🍗",
    items: [
      { id: "tlc-3", name: "3 tender meal", desc: "Fries, sauce", protein: 36, price: 11.0, tags: ["chicken"] },
      { id: "tlc-5", name: "5 tender meal", desc: "Fries, sauce", protein: 58, price: 14.5, tags: ["chicken"] },
      { id: "tlc-sandwich", name: "Chicken tender sandwich", desc: "Pickles, sauce", protein: 32, price: 10.5, tags: ["chicken", "sandwich"] },
    ],
  },
  {
    id: "subway-hassy", name: "Subway", area: "Hassayampa", campus: true, apps: ["Grubhub"], color: "#008938", emoji: "🥪",
    items: [
      { id: "sw-rot-ft", name: "Rotisserie-style chicken footlong", desc: "Footlong", protein: 46, price: 12.5, tags: ["chicken", "sandwich"] },
      { id: "sw-steak-ft", name: "Steak & cheese footlong", desc: "Footlong", protein: 46, price: 13.0, tags: ["beef", "sandwich"] },
      { id: "sw-turkey-6", name: "Oven roasted turkey, 6 inch", desc: "6 inch", protein: 20, price: 7.5, tags: ["sandwich", "lean"] },
      { id: "sw-chx-bowl", name: "Chicken protein bowl", desc: "No bread, double chicken", protein: 45, price: 11.5, tags: ["bowl", "chicken", "lean"] },
    ],
  },
  {
    id: "einstein", name: "Einstein Bros. Bagels", area: "Memorial Union", campus: true, apps: ["Grubhub"], color: "#5a2d0c", emoji: "🥯",
    items: [
      { id: "eb-bec", name: "Bacon, egg & cheese bagel", desc: "Breakfast", protein: 27, price: 8.0, tags: ["breakfast"] },
      { id: "eb-turkey-sausage", name: "Turkey sausage egg white sandwich", desc: "Thintastic bagel", protein: 28, price: 8.5, tags: ["breakfast", "lean"] },
      { id: "eb-bagel-cc", name: "Plain bagel with cream cheese", desc: "Bagel", protein: 12, price: 4.5, tags: ["breakfast"] },
    ],
  },
  {
    id: "burningb", name: "Burning B Café", area: "Barrett", campus: true, apps: ["Grubhub"], color: "#8c1d40", emoji: "☕",
    items: [
      { id: "bb-burrito", name: "Breakfast burrito", desc: "Egg, cheese, potato, meat", protein: 22, price: 8.0, tags: ["breakfast"] },
      { id: "bb-latte", name: "Latte", desc: "16 oz, 2% milk", protein: 12, price: 5.5, tags: ["drink"] },
    ],
  },
  {
    id: "rosies", name: "Rosie's Bakery", area: "Memorial Union", campus: true, apps: ["Grubhub"], color: "#c06c84", emoji: "🍞",
    items: [
      { id: "rb-egg-sandwich", name: "Egg & cheese croissant", desc: "Breakfast", protein: 15, price: 6.5, tags: ["breakfast"] },
      { id: "rb-banana-bread", name: "Chocolate chip banana bread", desc: "One slice", protein: 5, price: 4.0, tags: ["breakfast"] },
    ],
  },

  // ---- Seen on DoorDash near Rural Rd ----
  {
    id: "mcdonalds", name: "McDonald's", area: "2.4 mi", apps: ["DoorDash"], color: "#da291c", emoji: "🍔",
    items: [
      { id: "mc-dqp", name: "Double Quarter Pounder with Cheese", desc: "Sandwich", protein: 48, price: 10.5, tags: ["beef", "burger"] },
      { id: "mc-qp", name: "Quarter Pounder with Cheese", desc: "Sandwich", protein: 30, price: 8.0, tags: ["beef", "burger"] },
      { id: "mc-mcdouble", name: "McDouble", desc: "Sandwich", protein: 22, price: 4.5, tags: ["beef", "burger"] },
      { id: "mc-nug10", name: "Chicken McNuggets, 10 pc", desc: "Nuggets", protein: 23, price: 7.5, tags: ["chicken"] },
      { id: "mc-mcmuffin", name: "Egg McMuffin", desc: "Breakfast", protein: 17, price: 5.5, tags: ["breakfast"] },
    ],
  },
  {
    id: "burgerking", name: "Burger King", area: "4.1 mi", apps: ["DoorDash"], color: "#d62300", emoji: "👑",
    items: [
      { id: "bk-dbl-whopper", name: "Double Whopper", desc: "Sandwich", protein: 48, price: 11.0, tags: ["beef", "burger"] },
      { id: "bk-whopper", name: "Whopper", desc: "Sandwich", protein: 31, price: 8.5, tags: ["beef", "burger"] },
      { id: "bk-chx", name: "Original Chicken Sandwich", desc: "Sandwich", protein: 28, price: 7.5, tags: ["chicken", "sandwich"] },
    ],
  },
  {
    id: "jackinthebox", name: "Jack in the Box", area: "0.4 mi", apps: ["DoorDash"], color: "#e31837", emoji: "🍟",
    items: [
      { id: "jb-ultimate", name: "Ultimate Cheeseburger", desc: "Two patties", protein: 48, price: 9.5, tags: ["beef", "burger"] },
      { id: "jb-sourdough", name: "Sourdough Jack", desc: "Sandwich", protein: 33, price: 8.5, tags: ["beef", "burger"] },
      { id: "jb-teriyaki", name: "Chicken Teriyaki Bowl", desc: "Rice, veggies", protein: 26, price: 8.0, tags: ["bowl", "chicken"] },
      { id: "jb-tacos", name: "2 tacos", desc: "Classic", protein: 12, price: 3.0, tags: ["beef"] },
    ],
  },

  // ---- Seen on Uber Eats near Rural Rd ----
  {
    id: "burgerden", name: "The Burger Den", area: "27 min", apps: ["Uber Eats"], color: "#6b3e1e", emoji: "🍔",
    items: [
      { id: "bd-double", name: "Double cheeseburger", desc: "Two patties", protein: 45, price: 13.0, tags: ["beef", "burger"] },
      { id: "bd-single", name: "Cheeseburger", desc: "One patty", protein: 28, price: 10.0, tags: ["beef", "burger"] },
    ],
  },
  {
    id: "deltaco", name: "Del Taco", area: "19 min", apps: ["Uber Eats"], color: "#00863f", emoji: "🌮",
    items: [
      { id: "dt-epic-chx", name: "Grilled chicken burrito", desc: "Burrito", protein: 24, price: 7.5, tags: ["chicken"] },
      { id: "dt-quesadilla", name: "Chicken quesadilla", desc: "Cheese, chicken", protein: 28, price: 7.0, tags: ["chicken"] },
      { id: "dt-macho", name: "Macho beef burrito", desc: "Large burrito", protein: 40, price: 9.0, tags: ["beef"] },
    ],
  },
  {
    id: "obregon", name: "Taqueria Obregon", area: "Mesa · 49 min", apps: ["Uber Eats"], color: "#b5121b", emoji: "🌮",
    items: [
      { id: "to-asada-burrito", name: "Carne asada burrito", desc: "Asada, beans, cheese", protein: 40, price: 13.0, tags: ["beef"] },
      { id: "to-asada-tacos", name: "3 carne asada tacos", desc: "Corn tortillas", protein: 30, price: 11.0, tags: ["beef"] },
      { id: "to-asada-plate", name: "Carne asada plate", desc: "Rice, beans, tortillas", protein: 50, price: 16.0, tags: ["beef"] },
    ],
  },
  {
    id: "ricks", name: "Rick's Fish & Chips", area: "49 min", apps: ["Uber Eats"], color: "#1f5aa6", emoji: "🐟",
    items: [
      { id: "rf-3pc", name: "Fish & chips, 3 pc", desc: "Fries", protein: 40, price: 16.0, tags: [] },
      { id: "rf-2pc", name: "Fish & chips, 2 pc", desc: "Fries", protein: 28, price: 12.5, tags: [] },
    ],
  },
];
