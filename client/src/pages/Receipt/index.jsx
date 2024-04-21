import MainLayout from "../../layouts/main-layout";
import Crud from "./../../components/common/Crud/index";
import { receiptFormConfig } from "../../formConfigs/receiptFormConfig";
import requireAuth from "../../components/requireAuth";

const ReceiptPage = () => {
  return (
    <MainLayout>
      <Crud
        name="receipt"
        fields={[
          {
            name: "number",
            type: "text",
          },
          {
            name: "customer.name",
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
          {
            header: "product details",
            name: "products:product.name,size,itemsNumber",
            type: "combo",
          },
          {
            header: "total price",
            name: "price",
            type: "text",
          },
        ]}
        formConfig={receiptFormConfig}
      />
    </MainLayout>
  );
};

export default requireAuth(ReceiptPage);
