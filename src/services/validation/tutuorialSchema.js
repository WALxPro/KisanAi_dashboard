import * as yup from "yup";

export const TutorialSchema = yup.object().shape({
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

  video: yup
    .string()
    .nullable()
    .url("Enter a valid video URL"),

  image: yup.mixed().when("video", {
    is: (video) => !video, // agar video nahi hai
    then: (schema) =>
      schema.required("Thumbnail is required if no video link"),
    otherwise: (schema) => schema.nullable(),
  }),

  status: yup
    .string()
    .oneOf(["Published", "Draft"])
    .required("Status is required"),
});