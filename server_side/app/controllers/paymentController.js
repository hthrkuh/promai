const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { logPayment } = require("./crmController"); // Import the CRM logging function

const processPayment = async (req, res) => {
    const { gif } = req.body;

    const userId = req.user?.id;

    if (
        !gif ||
        !gif.title ||
        !gif.images ||
        !gif.images.fixed_height ||
        !gif.images.fixed_height.url
    ) {
        return res.status(400).json({ error: "Invalid GIF data provided" });
    }

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: gif.title,
                            images: [gif.images.fixed_height.url]
                        },
                        unit_amount: 500 // price in cents
                    },
                    quantity: 1
                }
            ],
            mode: "payment",
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/TrendingGIFs`
        });

        // After the payment session is created, log the payment in the CRM
        logPayment({
            userId,
            gifId: gif.id,
            amount: 500, // Amount in cents
            currency: "usd",
            paymentStatus: "Pending", // This can be updated once payment is confirmed
            paymentDate: new Date(),
            errorMessage: null
        });

        res.json({ id: session.id });
    } catch (error) {
        // Log the payment failure in CRM with the error message
        logPayment({
            userId,
            gifId: gif.id,
            amount: 500, // Amount in cents
            currency: "usd",
            paymentStatus: "Failed",
            paymentDate: new Date(),
            errorMessage: error.message
        });

        res.status(500).json({ error: error.message });
    }
};

module.exports = { processPayment };
