import { Button, Dialog, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

import { BookFormDataType } from "../types";

export interface BookFormProps {
  onClose: () => void;
  initialData: BookFormDataType | null;
  onHandleSubmit: (data: BookFormDataType) => void;
}
const BookSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Name is Required"),
  author: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Author is Required"),
  description: Yup.string()
    .min(2, "Too Short!")
    .required("Description is Required"),
});

export const BookForm = ({
  onClose,
  initialData,
  onHandleSubmit,
}: BookFormProps) => {
  const { handleSubmit, values, errors, touched, handleChange } = useFormik({
    initialValues: {
      name: initialData?.name || "",
      author: initialData?.author || "",
      description: initialData?.description || "",
    } as BookFormDataType,
    validationSchema: BookSchema,
    onSubmit: async (values) => {
      const payload = values;
      if (initialData?.id) {
        payload.id = initialData?.id;
      }
      onHandleSubmit(payload);
      onClose();
    },
  });

  return (
    <Dialog onClose={onClose} open={true}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} p={4}>
          <Grid item xs={12}>
            <TextField
              error={!!(errors.name && touched.name)}
              helperText={errors.name && touched.name ? errors.name : ""}
              label="Book Name"
              id="name"
              name="name"
              type="text"
              onChange={handleChange}
              value={values.name}
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={!!(errors.author && touched.author)}
              helperText={errors.author && touched.author ? errors.author : ""}
              id="author"
              name="author"
              label="Author"
              type="text"
              onChange={handleChange}
              value={values.author}
              fullWidth={true}
            />
          </Grid>{" "}
          <Grid item xs={12}>
            <TextField
              error={!!(errors.description && touched.description)}
              helperText={
                errors.description && touched.description
                  ? errors.description
                  : ""
              }
              id="description"
              name="description"
              label="Description"
              type="text"
              onChange={handleChange}
              value={values.description}
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
};
