const UserDetailsLoading = () => {
  return (
    <div className="card card-bordered mx-auto flex w-full max-w-screen-sm flex-col border-gray-700 bg-base-100">
      <div className="card-body space-y-2">
        <div className="skeleton mx-auto h-40 w-40 rounded-full"></div>
        <div className="skeleton mx-auto h-8 w-64"></div>
        <div className="card-actions justify-center">
          <button className="btn btn-primary max-w-sm grow">
            <span className="loading loading-spinner"></span>
          </button>
          <button className="btn btn-neutral border-none">
            <span className="loading loading-spinner"></span>
          </button>
        </div>
        <UserDetail />
        <UserDetail />
        <UserDetail />
      </div>
    </div>
  );
};

const UserDetail = () => {
  return (
    <div className="space-y-2">
      <div className="skeleton h-5 w-48"></div>
      <div className="skeleton h-5 w-full"></div>
      <div className="divider"></div>
    </div>
  );
};

export default UserDetailsLoading;
