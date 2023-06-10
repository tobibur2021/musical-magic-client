import React from 'react';
import SectionTitle from '../components/SectionTitle';
import { Elements } from '@stripe/react-stripe-js';
import Checkout from './Checkout';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_payment_getway_pk);

const Payments = () => {
	const [selectedClasses, setSelectedClasses] = useState([]);

	const total = selectedClasses?.reduce((sum, item) => item.price + sum, 0);
	const price = parseFloat(total.toFixed(2));

	useEffect(() => {
		fetch('http://localhost:5000/class')
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setSelectedClasses(data);
			});
	}, []);

	return (
		<div className="w-3/4">
			<div>
				<SectionTitle
					subHeading="Process"
					heading="Payment"
				></SectionTitle>

				<Elements stripe={stripePromise}>
					<Checkout price={price}></Checkout>
				</Elements>
			</div>
		</div>
	);
};

export default Payments;