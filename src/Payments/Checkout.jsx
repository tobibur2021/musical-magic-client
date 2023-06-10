import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';

const Checkout = ({ price }) => {
	const stripe = useStripe();
	const elements = useElements();
	const { user } = useAuth();
	const [axiosSecure] = useAxiosSecure();
	const [cardError, setCardError] = useState();
	const [clientSecret, setClientSecret] = useState('');
	const [processing, setProcessing] = useState(false);

	useEffect(() => {
		console.log('from checkout', price);
		if (price > 0) {
			axiosSecure
				.post('/payment-intent-method', { price })
				.then((res) => {
					console.log(res.data.clientSecret);
					setClientSecret(res.data.clientSecret);
				});
		}
	}, [price]);

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		const card = elements.getElement(CardElement);

		if (card === null) {
			return;
		}
		// console.log('card', card);

		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card,
		});

		if (error) {
			console.log('error', error);
			setCardError(error.message);
		} else {
			// console.log('payment method', paymentMethod);
			setCardError('');
		}

		setProcessing(true);

		const { paymentIntent, error: confirmError } =
			await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: card,
					billing_details: {
						email: user?.email || 'anonymous user',
						name: user?.displayName || 'anonymous user',
					},
				},
			});

		if (confirmError) {
			console.log(confirmError);
		}
		console.log(paymentIntent);

		if (paymentIntent.status === 'succeeded') {
			const transactionId = paymentIntent.id;
		}
	};

	return (
		<div className="w-full">
			<form onSubmit={handleSubmit} className="mx-auto ">
				<CardElement
					className="border p-3 rounded"
					options={{
						style: {
							base: {
								fontSize: '16px',
								color: '#424770',
								'::placeholder': {
									color: '#aab7c4',
								},
							},
							invalid: {
								color: '#9e2146',
							},
						},
					}}
				/>
				<button
					className="btn btn-primary mt-4 btn-sm"
					type="submit"
					disabled={!stripe || !clientSecret}
				>
					Pay
				</button>
			</form>
			{cardError && <p className="text-red-700">{cardError}</p>}
		</div>
	);
};

export default Checkout;
