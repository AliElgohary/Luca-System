import MainLayout from "../../layouts/main-layout";
import Crud from "../../components/common/Crud";
import { categoryFormConfig } from "../../formConfigs/categoryFormConfig";
import requireAuth from "../../components/requireAuth";

const CategoriesPage = () => {
  return (
    <div>
      <MainLayout>
        <Crud
          name="category"
          fields={[
            {
              name: "icon",
              type: "icon",
            },
            {
              name: "label",
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
          formConfig={categoryFormConfig}
        />
      </MainLayout>
    </div>
  );
};

export default requireAuth(CategoriesPage);
