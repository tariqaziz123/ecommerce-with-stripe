import StripeCheckout from 'react-stripe-checkout';

const STRIPE_PUBLISHABLE = 	'pk_test_51L0KTrSFAidt6wO40HhSSviOv7Z6xfsCOZDOuYFrvPi8qTYUZKCRVKjkUYRTh9YDT365RuVQ20ZR8enII2nJrObN00vehoo1Tb';

const onToken  = (user, checkout) => token => checkout(user, token.id);

const Checkout = ({ amount, user, checkout }) =>
    <StripeCheckout
        amount={amount*100}
        token = {onToken(user, checkout)}
        currency = 'INR'
        stripeKey={STRIPE_PUBLISHABLE}
    />

export default Checkout;