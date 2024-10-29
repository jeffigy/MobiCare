const ProfileDetailsLoading = () => {
  return (
    <div className="card card-compact mx-auto mt-20 w-96 bg-base-100 shadow-xl">
      <div className="relative">
        <div className="skeleton mx-auto -mt-20 h-32 w-32 rounded-full border-8 border-base-300"></div>
        <button className="btn btn-circle btn-primary btn-sm absolute -bottom-3 left-0 right-0 m-auto p-1">
          <span className="loading loading-spinner"></span>
        </button>
      </div>
      <div className="card-body space-y-0">
        <div className="skeleton mx-auto h-7 w-52"></div>
        <div className="skeleton mx-auto h-4 w-72"></div>

        <div className="skeleton mx-auto h-4 w-20"></div>

        <div className="divider m-0"></div>
        <div className="card-actions">
          <button className="btn btn-outline btn-primary btn-sm grow border-none">
            <span className="loading loading-spinner"></span>
          </button>

          <button className="btn btn-outline btn-primary btn-sm grow border-none">
            <span className="loading loading-spinner"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailsLoading;
