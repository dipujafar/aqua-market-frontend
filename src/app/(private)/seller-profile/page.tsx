import Container from '@/components/shared/Container';
import React from 'react';
import ProfileInfo from './_components/ProfileInfo';
import SellerUploadedProducts from './_components/SellerUploadedProducts';

const SellerProfilePage = () => {
    return (
        <Container className='md:pt-10 md:pb-16 pt-5 pb-8'>
            <ProfileInfo/>
            <SellerUploadedProducts/>
        </Container>
    );
};

export default SellerProfilePage;