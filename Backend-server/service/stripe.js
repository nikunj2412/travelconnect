
const STRIPE_SECRET_KEY = 'sk_test_51P2daDAfp9Qhk6qqyyMhh558MxFDYDj8YvCvh68eCidYdfb1akCfqyKC7yxXq4xEUF0e2A7B5s4qCYkc8FICjRK800W98alirN'

const stripe = require('stripe')(STRIPE_SECRET_KEY)

const createCustomer = async(body)=>{
    try {
        const {name, email} = body

        const customer = await stripe.customers.create({
            name: name,
            email: email,
        });

        return customer;

    } catch (err) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Payment Service Failed');
    }

}

const addNewCard = async (body) => {
    try {

        const {token, customer_id} = body;

        const card = await stripe.customers.createSource(customer_id, {
            source: token
        });

        return card;
    } catch (error) {
        console.error('Error adding new card:', error.message);
        throw new ApiError(httpStatus.BAD_REQUEST, 'Card is not added');
    }
}

const createCharges = async(body)=>{

    try {
        const {amount, card_id, customer_id} = body

        const createCharge = await stripe.charges.create({
            receipt_email: 'tester@gmail.com',
            amount: parseInt(amount)*100,
            currency:'CAD',
            card: card_id,
            customer: customer_id
        });

        return createCharge

    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Charge is not created');
    }

}

const createSession = async(body) => {
    try{
    console.log("body====", body)
    const { packages } = body;


    const lineItems = packages.map((package)=>({
        price_data:{
            currency:"cad",
            unit_amount:package.price * 100,
            product_data: {
                name: package.name,
            }
        },
        quantity: package.person
    }));


    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:"https://example.com/success",
        cancel_url:"https://example.com/cancel",
    });

    if(!session) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Session is not created');
    }

    return session;
    }
    catch(error){
        throw new ApiError(httpStatus.BAD_REQUEST, 'Error in Session creation');
    }
}


module.exports = {
    createCustomer,
    addNewCard,
    createCharges,
    createSession
}