import { getAll } from "../../services/crudServices";
import { useState, useEffect } from "react";
import Card from "./../../components/categoryCard/index";
import useLocale from "./../../contexts/LocaleContext";

export const CategoryCards = () => {
  const { t } = useLocale();

  const [data, setData] = useState([]);
  const getAllCategories = async () => {
    const cats = await getAll("category");
    setData(cats);
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <div className="grid grid-cols-4 gap-4">
      {data.map((cat) => (
        <Card
          key={cat._id}
          itemsCount={cat.productsCount} // TODO: move the details of the report to a context
          title={t(cat.label)}
          iconName={cat.icon}
        />
      ))}
    </div>
  );
};
