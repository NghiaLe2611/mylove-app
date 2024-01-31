import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import './assets/styles/index.scss';
import { theme } from '@/themes/theme';

ReactDOM.createRoot(document.getElementById('root')).render(
	<ChakraProvider theme={theme}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</ChakraProvider>
);
