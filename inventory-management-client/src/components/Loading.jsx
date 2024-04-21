import { FaArrowsSpin } from "react-icons/fa6";

const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <FaArrowsSpin className="animate-spin" fontSize="5rem" />
    </div>
  );
};

export default Loading;
