const HomeCard = ({ title, content, Icon }) => {
  return (
    <div className="bg-primary-1 py-5 px-5 rounded-2xl shadow-lg">
      <div className="flex items-center gap-7">
        <span className="bg-primary-3 rounded-full p-3">
          <Icon size={35} color="white" />
        </span>
        <div className="flex flex-col gap-1">
          <span className="font-bold text-2xl text-primary-3">{title}</span>
          <span className="text-2xl font-semibold">{content}</span>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
