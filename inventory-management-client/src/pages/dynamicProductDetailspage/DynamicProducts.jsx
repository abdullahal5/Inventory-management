import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { useLoaderData } from "react-router-dom";

const DynamicProducts = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const loader = useLoaderData();

  useEffect(() => {
    const getdata = () => {
      setData(loader?.data);
      setLoading(false);
    };
    getdata();
  }, [loader]);

  return (
    <>
      {loading ? (
        <div className="h-screen flex items-center justify-center">
          <FaSpinner fontSize="5rem" className="animate-spin" />
        </div>
      ) : (
        <div>
            {
                data._id
            }
        </div>
      )}
    </>
  );
};

export default DynamicProducts;
