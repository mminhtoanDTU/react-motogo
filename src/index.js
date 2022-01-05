import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ConfigProvider } from 'antd';
// import 'antd/dist/antd.css';
import 'antd/dist/antd.variable.min.css';
import './assets/sass/index.scss';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';

ConfigProvider.config({
    theme: {
        primaryColor: '#ffc107',
    },
});

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <Suspense fallback={<div>Loading...</div>}>
                    <App />
                </Suspense>
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
