import { defineQuery } from "next-sanity";
import { CouponCode } from "./cuponCodes";
import { sanityFetch } from "../live";

const getActiveSaleByCuponCode = async (couponCode: CouponCode) => {
  const ACTIVE_SALE_BY_COUPON_CODE_QUERY = defineQuery(`
        *[
            _type == "sale" &&
            isActive == true &&
        couponCode == $couponCode
        ] | order(validFrom desc)[0]
        `);

  try {
    const sale = await sanityFetch({
      query: ACTIVE_SALE_BY_COUPON_CODE_QUERY,
      params: { couponCode },
    });
    return sale.data ? sale.data : null;
  } catch (error) {
    console.log("Error Fetching sale by coupon code", error);
    return null;
  }
};

export default getActiveSaleByCuponCode;
