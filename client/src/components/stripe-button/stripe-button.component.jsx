import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  // publishable key can be found on stripe dashboard
  const publishableKey = 'pk_test_51IRJDWEVNCKy6KQhqqny9Z6MX08wTymmRuLrj6e8A95ZVp5bugkFtTjNnJrrL8Rm8WQ0Dtpo9NL7ok6BhYqxK41800UyOljzlD';
  // const onToken = (token) => {
  //   console.log(token);
  //   alert('Payment Successful');
  // };

  const onToken = token => {
    axios({
      url: 'payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token: token
      }
    })
      .then(response => {
        alert('succesful payment');
        response.status(200);
      })
      .catch(error => {
        console.log('Payment Error: ', error);
        alert(
          'There was an issue with your payment! Please make sure you use the provided credit card.'
        );
      });
  };


  return (
    <StripeCheckout
      label='Pay Now'
      name='Clothing App'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
