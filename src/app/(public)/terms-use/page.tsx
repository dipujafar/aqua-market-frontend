import Container from '@/components/shared/Container';
import React from 'react';
import TermsUseContainer from './_components/TermsUseContainer';

const TermsUsePage = () => {
    return (
        <Container className='md:pt-10 md:pb-16 pt-5 pb-8'>
            <TermsUseContainer></TermsUseContainer>
        </Container>
    );
};

export default TermsUsePage;