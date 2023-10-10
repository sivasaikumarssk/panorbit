const ProfilePage = () => {
  return (
    <div className="flex justify-around">
      <div className="border-2 border-indigo-500/100 w-[20%] h-[80vh] mt-[5%] rounded-3xl"></div>
      <div className="border-2 border-red-500/100 w-[70%] h-[80vh] mt-[5%] rounded-3xl">
        <div className=" m-7 h-[10vh] w-[90%] rounded-3xl"></div>
        <div
          style={{
            border: "1px solid lightgrey",
            width: "90%",
            margin: "auto",
          }}
        ></div>
        <div className="flex justify-around">
          <div className="border-0 border-none-500/100 h-[55vh] w-[40%] rounded-3xl"></div>

          <div className=" h-[55vh] w-[70%] border-l-2 border-l-lightgrey-500 mt-5"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
