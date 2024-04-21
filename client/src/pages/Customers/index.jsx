import MainLayout from "../../layouts/main-layout";
import Crud from "./../../components/common/Crud/index";
import { customerFormConfig } from "../../formConfigs/customerFormConfig";
import requireAuth from "../../components/requireAuth";

const CustomersPage = () => {
  return (
    <MainLayout>
      <Crud
        name="customer"
        fields={[
          {
            name: "name",
            type: "text",
          },
          {
            name: "phone",
            type: "text",
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
        formConfig={customerFormConfig}
      />
    </MainLayout>
  );
};

export default requireAuth(CustomersPage);
