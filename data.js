// Seeded menus for restaurants near ASU's Tempe campus that are commonly on
// DoorDash and Grubhub. Neither service has a public menu or nutrition API, so
// every number here is an ESTIMATE:
//   protein: chain items follow the chains' published nutrition for a standard
//            build; local spots are estimated from typical portions.
//   price:   rough delivery-app menu price in USD before fees and tip (apps
//            usually list items above in-store prices, and it varies by store).
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
    id: "cfa", name: "Chick-fil-A", area: "Apache Blvd", color: "#dd0031", emoji: "🐔",
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
    id: "panda", name: "Panda Express", area: "Memorial Union", color: "#d02630", emoji: "🥡",
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
    id: "tacobell", name: "Taco Bell", area: "Apache Blvd", color: "#702082", emoji: "🌮",
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
    id: "starbucks", name: "Starbucks", area: "Mill Ave · campus", color: "#00704a", emoji: "☕",
    items: [
      { id: "sb-eggbites", name: "Bacon & Gruyère Egg Bites", desc: "2 pieces", protein: 19, price: 6.5, tags: ["breakfast"] },
      { id: "sb-proteinbox", name: "Eggs & Cheddar Protein Box", desc: "Eggs, cheese, fruit", protein: 22, price: 7.2, tags: ["breakfast"] },
      { id: "sb-tbsandwich", name: "Turkey Bacon Egg White Sandwich", desc: "Breakfast", protein: 17, price: 6.1, tags: ["breakfast", "lean"] },
      { id: "sb-latte", name: "Grande latte", desc: "2% milk", protein: 13, price: 6.2, tags: ["drink"] },
    ],
  },
];
