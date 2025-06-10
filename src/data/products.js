let products = [];


    const defaultProducts = [
      {
        id: 1,
        name: "Premium Wireless Headphones",
        category: "electronics",
        price: 199.99,
        rating: 4.8,
        description: "Experience crystal-clear sound with our premium wireless headphones featuring noise cancellation and 30-hour battery life.",
        features: [
          "Active Noise Cancellation",
          "30-hour battery life",
          "Bluetooth 5.0",
          "Built-in microphone",
          "Foldable design"
        ],
        image: "/assets/images/wirlessheadphone.jpg",
        stock: 15,
        featured: true
      },
      {
        id: 2,
        name: "Smart Watch Pro",
        category: "electronics",
        price: 249.99,
        rating: 4.6,
        description: "Stay connected with our advanced smartwatch featuring health monitoring, GPS, and customizable watch faces.",
        features: [
          "Heart rate monitor",
          "GPS tracking",
          "Water resistant",
          "7-day battery life",
          "OLED touchscreen"
        ],
        image: "/assets/images/smartwatch.jpeg",
        stock: 8,
        featured: true
      },
      {
        id: 3,
        name: "Leather Wallet",
        category: "accessories",
        price: 49.99,
        rating: 4.5,
        description: "Handcrafted genuine leather wallet with multiple card slots and RFID protection.",
        features: [
          "Genuine leather",
          "RFID blocking",
          "6 card slots",
          "2 bill compartments",
          "Slim design"
        ],
        image: "/assets/images/wallet.jpeg",
        stock: 22,
        featured: false
      },
      {
        id: 4,
        name: "Stainless Steel Water Bottle",
        category: "accessories",
        price: 29.99,
        rating: 4.7,
        description: "Eco-friendly stainless steel water bottle that keeps your drinks cold for 24 hours or hot for 12 hours.",
        features: [
          "Double-walled insulation",
          "Leak-proof lid",
          "BPA-free",
          "500ml capacity",
          "Durable construction"
        ],
        image: "/assets/images/bottle.jpg",
        stock: 30,
        featured: false
      },
      {
        id: 5,
        name: "4K Ultra HD Smart TV",
        category: "electronics",
        price: 899.99,
        rating: 4.9,
        description: "Immerse yourself in stunning 4K resolution with our smart TV featuring HDR and built-in streaming apps.",
        features: [
          "55-inch 4K display",
          "HDR10+ support",
          "Smart platform with apps",
          "Voice remote",
          "Multiple HDMI ports"
        ],
        image: "/assets/images/tv.jpeg",
        stock: 5,
        featured: true
      },
      {
        id: 6,
        name: "Wireless Charging Pad",
        category: "accessories",
        price: 24.99,
        rating: 4.3,
        description: "Convenient wireless charging pad compatible with all Qi-enabled devices with fast charging capability.",
        features: [
          "Qi-certified",
          "Fast charging",
          "LED indicator",
          "Non-slip surface",
          "Compact design"
        ],
        image: "/assets/images/charging.jpeg",
        stock: 18,
        featured: false
      },
      {
        id: 7,
        name: "Bluetooth Speaker",
        category: "electronics",
        price: 79.99,
        rating: 4.4,
        description: "Portable Bluetooth speaker with 20-hour battery life and waterproof design.",
        features: [
          "20-hour battery",
          "IPX7 waterproof",
          "360° sound",
          "Bluetooth 5.0",
          "Built-in mic"
        ],
        image: "/assets/images/bluspeaker.jpeg",
        stock: 12,
        featured: false
      },
      {
        id: 8,
        name: "Wireless Earbuds",
        category: "electronics",
        price: 129.99,
        rating: 4.5,
        description: "True wireless earbuds with active noise cancellation and 6-hour battery life.",
        features: [
          "Active noise cancellation",
          "6-hour playtime",
          "Wireless charging case",
          "Bluetooth 5.2",
          "Touch controls"
        ],
        image: "/assets/images/earbuds.jpg",
        stock: 10,
        featured: false
      },
      {
        id: 9,
        name: "Gaming Keyboard",
        category: "electronics",
        price: 99.99,
        rating: 4.6,
        description: "Mechanical RGB gaming keyboard with customizable lighting and tactile feedback.",
        features: [
          "Mechanical switches",
          "RGB backlighting",
          "Programmable keys",
          "Ergonomic design",
          "Anti-ghosting"
        ],
        image: "/assets/images/keybord.jpeg",
        stock: 14,
        featured: false
      },
      {
        id: 10,
        name: "Noise Cancelling Earphones",
        category: "electronics",
        price: 89.99,
        rating: 4.4,
        description: "Compact earphones with hybrid noise cancelling and powerful bass.",
        features: [
          "Hybrid ANC",
          "Powerful bass",
          "In-line controls",
          "Comfortable fit",
          "Tangle-free cable"
        ],
        image: "/assets/images/noise.jpeg",
        stock: 20,
        featured: false
      },
      {
        id: 11,
        name: "Slim Laptop Backpack",
        category: "accessories",
        price: 59.99,
        rating: 4.5,
        description: "Durable and water-resistant backpack with padded laptop compartment.",
        features: [
          "Water-resistant fabric",
          "Laptop compartment (15.6\")",
          "USB charging port",
          "Anti-theft pocket",
          "Ergonomic straps"
        ],
        image: "/assets/images/laptopbag.jpeg",
        stock: 25,
        featured: false
      },
      {
        id: 12,
        name: "Fitness Tracker Band",
        category: "electronics",
        price: 39.99,
        rating: 4.2,
        description: "Track your fitness goals with heart rate monitoring and step counting.",
        features: [
          "Heart rate monitoring",
          "Step and calorie tracking",
          "Sleep tracking",
          "OLED display",
          "Water resistant"
        ],
        image: "/assets/images/fitband.jpeg",
        stock: 17,
        featured: false
      },
      {
        id: 13,
        name: "Portable Laptop Stand",
        category: "accessories",
        price: 34.99,
        rating: 4.3,
        description: "Adjustable aluminum laptop stand for improved posture and cooling.",
        features: [
          "Adjustable height",
          "Aluminum build",
          "Foldable design",
          "Improves airflow",
          "Supports 10\"17\" laptops"
        ],
        image: "/assets/images/laptopstand.jpeg",
        stock: 11,
        featured: false
      },
      {
        id: 14,
        name: "Smart LED Desk Lamp",
        category: "electronics",
        price: 45.99,
        rating: 4.4,
        description: "Smart LED desk lamp with touch control, brightness levels, and USB port.",
        features: [
          "Touch-sensitive control",
          "Adjustable brightness",
          "Eye-care light",
          "USB charging port",
          "Modern design"
        ],
        image: "/assets/images/desklamp.jpeg",
        stock: 13,
        featured: false
      }
    ];
 const saveProducts = () => {
  localStorage.setItem("products", JSON.stringify(products));
};

const loadProducts = () => {
  const storedProducts = JSON.parse(localStorage.getItem("products")) || [];

  const merged = [...defaultProducts];
  for (const p of storedProducts) {
    if (!merged.some((item) => item.id === p.id)) {
      merged.push(p);
    }
  }

  products = merged;
  saveProducts();
};

loadProducts();

export const getProducts = () => [...products];

export const getProductById = (id) =>
  products.find((product) => product.id === parseInt(id));

export const getProductsByCategory = (category) =>
  category === "all"
    ? [...products]
    : products.filter((product) => product.category === category);

export const getFeaturedProducts = () =>
  products.filter((product) => product.featured);

export const searchProducts = (query) => {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery)
  );
};

export const addProduct = (product) => {
  const newId =
    products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
  const newProduct = {
    ...product,
    id: newId,
    discount: product.discount || 0,
    onSale: product.onSale || false
  };
  products.push(newProduct);
  saveProducts();
  return newProduct;
};

export const updateProduct = (id, updatedProduct) => {
  products = products.map((product) =>
    product.id === id
      ? {
          ...product,
          ...updatedProduct,
          discount: updatedProduct.discount || 0,
          onSale: updatedProduct.onSale || false
        }
      : product
  );
  saveProducts();
  return getProductById(id);
};

export const deleteProduct = (id) => {
  products = products.filter((product) => product.id !== id);
  saveProducts();
};
