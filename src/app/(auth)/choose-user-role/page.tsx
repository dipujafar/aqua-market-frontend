import PageTopSection from '@/components/shared/PageTopSection';
import React from 'react';
import ChooseUserRoleContainer from './components/ChooseUserRoleContainer';



const ChooseUserRole = () => {
    return (
        <div className="lg:space-y-12 space-y-7">
        <PageTopSection title="Choose Your User Role"></PageTopSection>
         <ChooseUserRoleContainer></ChooseUserRoleContainer>
      </div>
    );
};

export default ChooseUserRole;