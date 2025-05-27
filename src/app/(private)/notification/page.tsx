import Container from '@/components/shared/Container';
import React from 'react';
import NotificationContainer from './_components/NotificationContainer';

const NotificationPage = () => {
    return (
        <Container className='md:pt-10 md:pb-16 pt-5 pb-8'>
            <NotificationContainer/>
        </Container>
    );
};

export default NotificationPage;