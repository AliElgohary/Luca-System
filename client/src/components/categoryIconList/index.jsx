import { useEffect, useState } from "react";
import { formatIconName } from "../../utils/formattedIconName";
import Spinner from "../common/Spinner";

const CategoryIconList = ({ setIcon }) => {
  const [selectedIcon, setSelectedIcon] = useState("");
  const [icons, setIcons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(null);
  const getAllIcons = async () => {
    setLoading(true);
    // const fcIcons = await import(`react-icons/fc`);
    // const aiIcons = await import(`react-icons/ai`);
    // const ciIcons = await import(`react-icons/ci`);
    const giIcons = await import(`react-icons/gi`);
    const riIcons = await import(`react-icons/ri`);
    setIcons(Object.assign({}, giIcons, riIcons));
    setLoading(false);
  };

  useEffect(() => {
    getAllIcons();
  }, []);
  //   TODO: add search icons

  const handleSelectIcon = (iconName) => {
    setSelectedIcon(iconName);
    setIcon(iconName);
  };
  const filteredIcons = Object.keys(icons).filter((icon) => {
    if (!search) return true;
    return icon.toLowerCase().includes(search.toLowerCase());
  });
  return (
    <div className="relative">
      {loading && <Spinner className="mx-auto" />}
      <div className="fixed p-3 w-3/4 bg-primary-4 rounded-lg shadow-lg">
        <input
          onChange={(e) => setSearch(e.target.value)}
          placeholder="search icons"
          className="bg-primary-5 p-3 text-lg focus:border-secondary-2 text-white outline-none"
        />
      </div>
      <div className="grid pt-20 grid-cols-3 md:grid-cols-5 gap-4 p-7 lg:grid-cols-7">
        {filteredIcons.map((key, i) => (
          <span
            className={`text-xl text-white mx-auto text-center p-2 rounded-lg transition-colors duration-300
            ${selectedIcon === key ? "bg-secondary-3 hover:bg-secondary-3" : ""}
            cursor-pointer items-center flex flex-col gap-2 hover:bg-primary-4
             `}
            key={i}
            onClick={() => handleSelectIcon(key)}
          >
            <span className="bg-gray-900 p-4 rounded-lg">{icons[key]()}</span>
            <span className="text-xs md:text-sm font-semibold">
              {formatIconName(key)}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default CategoryIconList;
