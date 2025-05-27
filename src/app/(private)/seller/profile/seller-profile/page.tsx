import Container from '@/components/shared/Container';
import React from 'react';
import ProfileInfo from './_components/ProfileInfo';
import SellerUploadedProducts from './_components/SellerUploadedProducts';

const SellerProfilePage = () => {
    return (
        <Container>
            <ProfileInfo/>
            <SellerUploadedProducts/>
        </Container>
    );
};

export default SellerProfilePage;