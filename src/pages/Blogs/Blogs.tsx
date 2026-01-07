import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Stack,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";

const dummyBlogs = [
  {
    id: "B001",
    title: "How to Protect Wheat from Disease",
    status: "Published",
    date: "12 Sep 2025",
  },
  {
    id: "B002",
    title: "Best Fertilizers for Rice Crop",
    status: "Draft",
    date: "15 Sep 2025",
  },
];

const Blogs: React.FC = () => {
  const [blogs] = useState(dummyBlogs);

  return (
    <Box>
      {/* PAGE TITLE */}
      <Typography variant="h5" fontWeight={600} mb={3}>
        Blogs Management
      </Typography>

      {/* ADD BLOG FORM */}
      <Card sx={{ mb: 4, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600} mb={2}>
            Add New Blog (Mobile App)
          </Typography>

          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Blog Title"
                placeholder="Enter blog title"
              />
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Blog Content"
                placeholder="Write blog content here..."
              />
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
                label="Cover Image URL"
                placeholder="Image URL (optional)"
              />
            </Grid>

            <Grid size={12}>
              <Stack direction="row" spacing={2}>
                <Button variant="contained" color="primary">
                  Publish Blog
                </Button>
                <Button variant="outlined">Save as Draft</Button>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* BLOGS LIST */}
      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600} mb={2}>
            Existing Blogs
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {blogs.map((blog) => (
                <TableRow key={blog.id} hover>
                  <TableCell>{blog.id}</TableCell>
                  <TableCell>{blog.title}</TableCell>
                  <TableCell>{blog.date}</TableCell>
                  <TableCell>
                    <Chip
                      label={blog.status}
                      color={
                        blog.status === "Published"
                          ? "success"
                          : "warning"
                      }
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Blogs;
