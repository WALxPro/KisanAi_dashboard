import React from "react";
import {
  FileText,
  Pencil,
  Trash2,
} from "lucide-react";
const BlogCard = ({ blogs, openEdit, setDeleteConfirm }) => {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {blogs.map((blog) => (
        <div
          key={blog._id}
          className="cursor-pointer group rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
        >
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-sm">
            <FileText className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-bold text-foreground">{blog.title}</h3>
            <button
              className={`shrink-0 ml-2 rounded-full px-3 py-1 text-xs font-semibold cursor-pointer transition-colors ${blog.status === "Published" ? "bg-success/10 text-success hover:bg-success/20" : "bg-warning/10 text-warning hover:bg-warning/20"}`}
            >
              {blog.status}
            </button>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
            {blog.description}
          </p>
          <div className="flex items-center justify-between border-t border-border pt-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{blog.author}</span>
              <span className="text-xs text-muted-foreground">
                • {blog.created_at}
              </span>
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => openEdit(blog)}
                className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-info/10 hover:text-info transition-colors"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                onClick={() => setDeleteConfirm({ open: true, id: blog._id })}
                className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogCard;
