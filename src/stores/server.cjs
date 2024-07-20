const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const supabaseAdmin = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_SERVICE_KEY
); // Utilizzare la chiave di servizio

app.use(cors());
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  const { cartItems } = req.body;

  const lineItems = cartItems.map((item) => ({
    price_data: {
      currency: "eur",
      product_data: {
        name: item.title,
      },
      unit_amount: item.price * 100,
    },
    quantity: 1,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:8080/ordine-completato",
      cancel_url: "http://localhost:8080/ordine-fallito",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating Stripe checkout session:", error);
    res
      .status(500)
      .json({
        error: "An error occurred while creating the checkout session.",
      });
  }
});

app.get("/api/users", async (req, res) => {
  const { data, error } = await supabaseAdmin.auth.admin.listUsers();
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.status(200).json(data.users);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
