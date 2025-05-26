import { ProgressBar } from '@/components/ui/steps-progress';
import React from 'react';

const OrderProgress = () => {
    return (
        <div className='md:pt-24 md:pb-12 pt-16 pb-6 rounded-lg border xl:px-14 lg:px-6 px-3'>
              <ProgressBar
          stages={["Order Placed", "Shipped", "In Progress", "On The Way","Delivered"]}
          percent={1}
          currentStage={1}
        /> 
        </div>
    );
};

export default OrderProgress;