import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useGetAllUsersQuery } from "@/redux/features/user/user.api";
import type { TUser } from "@/type";
import AdminActions from "@/components/modules/admin/AdminActions";
import { FadeLoader } from "react-spinners";

const ManageUsers = () => {
  const { data, isLoading } = useGetAllUsersQuery({});
  const users: TUser[] = data?.data || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <FadeLoader color="blue" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    user.role === "SUPER_ADMIN"
                      ? "destructive"
                      : user.role === "ADMIN"
                      ? "secondary"
                      : "outline"
                  }
                >
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    user.isActive === "ACTIVE" ? "default" : "destructive"
                  }
                >
                  {user.isActive}
                </Badge>
              </TableCell>
              <TableCell>
                <AdminActions user={user} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageUsers;
