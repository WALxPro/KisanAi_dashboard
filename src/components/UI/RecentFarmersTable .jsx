import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from "./Table";

const RecentFarmersTable = ({ data }) => {
  console.log(data.createdAt);
  console.log(data, "recent farmers");
  return (
    <Table>
      <TableHead>
        <TableHeaderCell>Farmer</TableHeaderCell>
        <TableHeaderCell>City</TableHeaderCell>
        <TableHeaderCell>Status</TableHeaderCell>
        <TableHeaderCell>Joined</TableHeaderCell>
      </TableHead>

      <TableBody>
        {data.map((farmer) => (
          <TableRow key={farmer.email}>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl overflow-hidden">
                  {farmer?.profilePicture ? (
                    <img
                      src={farmer.profilePicture}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {farmer.fullname}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {farmer.email}
                  </p>
                </div>
              </div>
            </TableCell>

            <TableCell>{farmer.city}</TableCell>

            <TableCell>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                  farmer.isBlocked
                    ? "bg-destructive/10 text-destructive"
                    : "bg-success/10 text-success"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    farmer.isBlocked ? "bg-destructive" : "bg-success"
                  }`}
                />

                {farmer.isBlocked ? "Blocked" : "Active"}
              </span>
            </TableCell>

            <TableCell>{farmer.createdAt?.split("T")[0]}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RecentFarmersTable;
