import * as yup from "yup";
import IconSelector from "../components/formBuilderCustomInputs/iconSelector";

const schema = yup.object({
  label: yup.string().required(),
  icon: yup.string(),
});

export const categoryFormConfig = (onSubmit) => ({
  schema,
  fields: [
    {
      type: "text",
      label: "label",
      // defaultValue: "",
      placeholder: "category label",
    },
    {
      type: "custom",
      Component: IconSelector,
      label: "icon",
    },
  ],
  onSubmit,
});
