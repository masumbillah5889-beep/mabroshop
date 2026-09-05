import { getCategories, getProductsByCategory, getAddons } from "@/lib/data";
import CategoryShowcase from "@/components/home/CategoryShowcase";

export default async function CategoryShowcaseList() {
  const [categories, addons] = await Promise.all([getCategories(), getAddons()]);
  const productLists = await Promise.all(categories.map((c) => getProductsByCategory(c.id)));
  const lowStockThreshold = addons.instant_sales_booster.enabled
    ? addons.instant_sales_booster.low_stock_threshold
    : undefined;

  return (
    <div>
      {categories.map((category, i) => (
        <CategoryShowcase
          key={category.id}
          category={category}
          products={productLists[i]}
          lowStockThreshold={lowStockThreshold}
        />
      ))}
    </div>
  );
}
