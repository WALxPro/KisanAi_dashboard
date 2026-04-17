import { Pencil, Trash2 } from "lucide-react";

const BlogTable = ({ blogs, openEdit, setDeleteConfirm }) => {
  console.log(blogs, "table");

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Title
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Author
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Status
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Created
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr
                  key={blog._id}
                  className="border-b border-border/50 last:border-0 hover:bg-secondary/30 transition-colors"
                >
                  <td className="px-5 py-3.5 text-sm font-semibold text-foreground">
                    {blog.title}
                  </td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-foreground">
                    {blog.author}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${blog.status === "Active" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${blog.status === "Active" ? "bg-success" : "bg-muted-foreground"}`}
                      />
                      {blog.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-muted-foreground">
                    {blog.created_at}
                  </td>
                  

                  <td className="px-5 py-3.5">
                    <div className="flex gap-1">
                      <button
                        onClick={() => openEdit(blog)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-info/10 hover:text-info transition-colors"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() =>
                          setDeleteConfirm({ open: true, id: blog._id })
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default BlogTable;
