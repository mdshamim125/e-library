import { Button } from "@/components/ui/button";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useUpdateUserMutation } from "@/redux/features/user/user.api";
import type { TUser } from "@/type";

type Props = {
  user: TUser;
};

const AdminActions = ({ user }: Props) => {
  const [updateUser, { isLoading }] = useUpdateUserMutation({});
  const { data: userInfo } = useUserInfoQuery(undefined);

  const isOwnAccount = userInfo?.data?.role === user?.role;

  const handleStatusChange = async (status: "ACTIVE" | "BLOCKED") => {
    await updateUser({ id: user._id, isActive: status });
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        disabled={isOwnAccount || user.isActive === "ACTIVE" || isLoading}
        onClick={() => handleStatusChange("ACTIVE")}
      >
        Active
      </Button>
      <Button
        variant="destructive"
        size="sm"
        disabled={isOwnAccount || user.isActive === "BLOCKED" || isLoading}
        onClick={() => handleStatusChange("BLOCKED")}
      >
        Block
      </Button>
    </div>
  );
};

export default AdminActions;
