import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import './index.css';
import router from './routes.tsx';

const theme = createTheme({
	primaryColor: 'violet',
});

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<MantineProvider defaultColorScheme="dark" theme={theme}>
			<RouterProvider router={router} />
		</MantineProvider>
	</StrictMode>,
);
