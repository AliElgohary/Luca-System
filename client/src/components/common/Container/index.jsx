import clsx from "clsx";

const Container = ({ children, className }) => {
  return (
    <div className={clsx("mx-auto max-w-screen-lg px-4 lg:px-0", className)}>
      {children}
    </div>
  );
};

export default Container;
