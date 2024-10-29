const UserListLoading = () => {
  return (
    <div className="flex w-full flex-col items-center space-y-5">
      {[1, 2, 3, 4, 5, 6, 7].map((_, index) => (
        <div
          className="skeleton h-[79px] w-full max-w-screen-sm"
          key={index}
        ></div>
      ))}
    </div>
  );
};

export default UserListLoading;
