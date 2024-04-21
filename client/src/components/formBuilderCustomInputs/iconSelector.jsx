import CategoryIconList from "./../categoryIconList/index";

const IconSelector = ({ setValue }) => {
  return (
    <div className="h-80 overflow-y-auto bg-primary-5">
      <CategoryIconList setIcon={setValue} />
    </div>
  );
};

export default IconSelector;
