import * as yup from "yup";

export const blogSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(5, "Title must be at least 5 characters")
    .max(120, "Title cannot exceed 120 characters"),

  description: yup
    .string()
    .required("Description is required")
    .min(20, "Description must be at least 20 characters"),
    

  category: yup.string().required("Category is required"),
  image: yup.mixed().required("Banner image is required"),

  status: yup
    .string()
    .oneOf(["Published", "Draft"])
    .required("Status is required"),
});
