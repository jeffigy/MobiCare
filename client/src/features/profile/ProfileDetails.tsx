import useAuth from "@/hooks/useAuth";
import { useFetchUserProfile } from "./profileQueries";
import Alert from "@/components/ui/Alert";
import ProfileDetailsLoading from "./ProfileDetailsLoading";
import UpdateNameModal from "./UpdateNameModal";
import ChangePasswordModal from "./ChangePasswordModal";
import UploadProfilePhotoModal from "./UploadProfilePhotoModal";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ProfileDetails = () => {
  const { email, status } = useAuth();

  const { data: user, isLoading, isError, error } = useFetchUserProfile(email);
  if (isLoading) return <ProfileDetailsLoading />;
  if (isError) return <Alert message={error.message} type="error" />;
  if (!user) return <Alert message={"User not found"} type="error" />;

  return (
    <div className="card card-compact mx-auto mt-20 w-96 bg-base-100 shadow-xl">
      <div className="relative">
        <LazyLoadImage
          className="mx-auto -mt-20 h-32 w-32 rounded-full border-8 border-base-300 bg-base-300"
          alt="profile-avatar"
          src={
            user.imageUrl ??
            "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          }
        />
        <UploadProfilePhotoModal userId={user.id} />
      </div>
      <div className="card-body space-y-0">
        <div className="mt-2 text-center text-3xl font-medium">{user.name}</div>
        <div className="mt-2 text-center text-sm font-light">{user.email}</div>
        <div className="mt-2 text-center text-sm font-light">{status}</div>
        <div className="divider m-0"></div>
        <div className="card-actions">
          <UpdateNameModal user={user} />
          <ChangePasswordModal id={user.id} />
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
