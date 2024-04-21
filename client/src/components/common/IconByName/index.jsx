import { useState, useEffect } from "react";
import { DEFAULT_ICON_COLOR } from "../../../constants/ui";
import Spinner from "../Spinner";
const IconByName = ({
  name,
  size = 30,
  color = DEFAULT_ICON_COLOR,
  customStyles,
  className,
}) => {
  const [Icon, setIcon] = useState(null);
  const getIconByName = async (name) => {
    // TODO: fix this performance issue
    // each time an icon rendered , the whole icons is loaded 
    const icons = await import("react-icons/all");
    const Icon = icons[name];
    setIcon(Icon);
  };
  useEffect(() => {
    getIconByName(name);
  }, [name]);
  
  return Icon ? (
    <span
      style={{ fontSize: size, color: color, ...customStyles }}
      className={className}
    >
      {Icon}
    </span>
  ) : (
    <Spinner />
  );
};

export default IconByName;
