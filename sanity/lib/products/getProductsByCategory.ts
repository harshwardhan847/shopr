import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductsByCategory = async (slug: string) => {
  const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`
        *[
            _type=="product" && references(*[_type=="category" && slug.current == $slug]._id)
        ] | order(name asc)
        `);

  try {
    const products = await sanityFetch({
      query: PRODUCTS_BY_CATEGORY_QUERY,
      params: { slug },
    });
    return products.data || [];
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return [];
  }
};