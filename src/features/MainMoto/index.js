import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from '../../components';
import {
    HomePage,
    SearchPage,
    AboutPage,
    BlogPage,
    ContactPage,
    PolicyPage,
    PricePage,
    OrderPage,
    ResultPage,
    BillPage,
    BillEditPage,
} from './pages';

function MainMoto() {
    return (
        <>
            <Header />

            <Routes>
                <Route index element={<HomePage />} />
                <Route path='search' element={<SearchPage />} />
                <Route path='price' element={<PricePage />} />
                <Route path='policy' element={<PolicyPage />} />
                <Route path='about' element={<AboutPage />} />
                <Route path='contact' element={<ContactPage />} />
                <Route path='blog' element={<BlogPage />} />
                <Route path='order' element={<OrderPage />} />
                <Route path='result' element={<ResultPage />} />
                <Route path='bill' element={<BillPage />} />
                <Route path='bill/edit/:id' element={<BillEditPage />} />
                <Route
                    path='*'
                    element={
                        <main style={{ padding: '1rem' }}>
                            <p>There's nothing here!</p>
                        </main>
                    }
                />
            </Routes>
        </>
    );
}

export default MainMoto;

/*  */
