import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store.ts';
import { ApolloProvider } from '@apollo/client';
import client from './client/client';

import { MantineProvider } from '@mantine/core';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <ApolloProvider client={client}>
            <MantineProvider defaultColorScheme="auto" withCssVariables>
                <App />
            </MantineProvider>
        </ApolloProvider>
    </Provider>,
);
