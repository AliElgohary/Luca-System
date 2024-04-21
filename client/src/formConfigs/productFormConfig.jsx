import * as yup from "yup";
import { useEffect, useState } from "react";
import { getAll } from "./../services/crudServices";

const schema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  price: yup
    .number()
    .required()
    .min(5)
    .transform((v) => (isNaN(v) ? 0 : v)),
  category : yup.string().required()
});

export const productFormConfig = (onSubmit) => ({
  schema,
  fields: [
    {
      type: "text",
      label: "name",
      placeholder: "product name",
    },
    {
      type: "textarea",
      label: "description",
    },
    {
      type: "number",
      label: "price",
    },
    {
      type: "custom",
      label: "category",
      Component: CategorySelector,
    },
  ],
  onSubmit,
});

export const CategorySelector = ({ setValue , currentValue}) => {
  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    const cats = await getAll("category");
    setCategories(cats);
  };
  useEffect(() => {
    if(categories.length === 0) getCategories();
  }, []);
  const handleSelect = (e) => {
    setValue(e.target.value);
  };
  return (
    <select
      onChange={handleSelect}
      id="countries"
      className="bg-primary-5 p-4 text-white rounded-lg"
    >
        <option className="text-primary-1" selected value={""}>select category</option>
      {categories.map((cat, i) => (
        <option
        selected={cat._id === currentValue}
        className="text-white" key={i} value={cat._id}>
          {cat.label}
        </option>
      ))}
    </select>
  );
};
