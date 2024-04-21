import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required(),
  phone: yup.string().required(),
});

export const customerFormConfig = (onSubmit) => ({
  schema,
  fields: [
    {
      type: "text",
      label: "name",
    },
    {
      type: "text",
      label: "phone",
    },
  ],
  onSubmit,
});
