import { Link } from 'react-router-dom';

export default function NotFound() {
	return (
		<div className="text-center">
            <h2>Not Found</h2>
			<p>
				<Link to='/'>Go to the home page</Link>
			</p>
		</div>
	);
}