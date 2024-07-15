const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
const stripe = Stripe(process.env.VITE_STRIPE_PUBLIC_KEY); 
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY); 

app.use(cors());
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  const { cartItems } = req.body;

  const lineItems = cartItems.map((item) => ({
    price_data: {
      currency: 'eur',
      product_data: {
        name: item.title,
      },
      unit_amount: item.price * 100,
    },
    quantity: 1,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: 'http://localhost:8080/ordine-completato',
    cancel_url: 'http://localhost:8080/ordine-fallito',
  });

  res.json({ id: session.id });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
