import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@/themes/theme';
import './assets/styles/index.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProvider } from './context/AppContext';
import { Provider } from 'react-redux';
import store from './redux/store';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
	<ChakraProvider theme={theme}>
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<Provider store={store}>
					<AppProvider>
						<App />
					</AppProvider>
				</Provider>
			</QueryClientProvider>
		</BrowserRouter>
	</ChakraProvider>,
);
