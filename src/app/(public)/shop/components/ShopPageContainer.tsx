import Categories from '@/components/categories/Categories';
import { collectionTypes } from '@/lib/collectionType';
import { discountData } from '@/lib/discountData';

import AllProducts from './AllProducts';
import { SmallDeviceFilter } from './SmallDeviceFilter';

const ShopPageContainer = () => {
    return (
        <div className=" grid grid-cols-1  lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5	lg:gap-8 gap-4 xl:mt-8 mt-4">
        <div className="2xl:space-y-10 space-y-6 hidden lg:block">
          <Categories title="COLLECTION" data={collectionTypes}></Categories>
          {/* <Categories title="BRANDS" data={brandsData}></Categories> */}
          {/* <PriceCategory></PriceCategory> */}
          {/* <ColorCategory></ColorCategory> */}
          <Categories title="Discount" data={discountData}></Categories>
        </div>

        <div className="2xl:col-span-4 xl:col-span-3 md:col-span-2 ">
          {/* =============================== categories ========================== */}
          <div className="flex justify-between items-center xl:mb-8 mb-4 ">
            <div className="lg:hidden block ">
              <SmallDeviceFilter></SmallDeviceFilter>
            </div>
          </div>
          {/* ========================= all products ========================== */}
          <AllProducts></AllProducts>
        </div>
      </div>
    );
};

export default ShopPageContainer;