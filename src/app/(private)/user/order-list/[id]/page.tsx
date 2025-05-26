import React from 'react';
import ProductTable from './_components/ProductTable';
import Container from '@/components/shared/Container';
import DetailsAddress from './_components/DetailsAddress/DetailsAddress';
import OrderProgress from './_components/OrderProgress';

const OrderListPage = () => {
    return (
        <Container className='space-y-8'>
            <DetailsAddress/>
            <OrderProgress/>
            <ProductTable/>
        </Container>
    );
};

export default OrderListPage;