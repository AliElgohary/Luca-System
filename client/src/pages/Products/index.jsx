import MainLayout from "../../layouts/main-layout";
import Crud from "./../../components/common/Crud/index";
import { productFormConfig } from "../../formConfigs/productFormConfig";
import requireAuth from "../../components/requireAuth";

const ProductsPage = () => {
  return (
    <MainLayout>
      <Crud
        name="product"
        fields={[
          {
            name: "name",
            type: "text",
          },
          {
            name: "price",
            type: "text",
          },
          {
            name: "category.label",
            type: "relation",
          },
          {
            name: "createdAt",
            type: "date",
          },
          {
            name: "updatedAt",
            type: "date",
          },
        ]}
        formConfig={productFormConfig}
      />
    </MainLayout>
  );
};

export default requireAuth(ProductsPage);
