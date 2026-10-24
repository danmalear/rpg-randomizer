import { useEffect } from 'react';
import { Outlet, useMatch, useNavigate } from 'react-router';

const App: React.FC = () => {
	const navigate = useNavigate();
	const topLevelMatch = useMatch('/');

	useEffect(() => {
		if (topLevelMatch) {
			navigate('/campaign');
		}
	});

	return (
		<>
			<Outlet />
		</>
	);
};

export default App;
