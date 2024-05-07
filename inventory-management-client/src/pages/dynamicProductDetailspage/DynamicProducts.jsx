import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { useLoaderData } from "react-router-dom";

const DynamicProducts = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
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
        <div className="mx-10 h-auto rounded-xl">
          <div className="flex items-start gap-7">
            <div className="w-2/5 ">
              {data?.images.length > 0 && (
                <div className="mb-2 bg-white" key={data.images[0]}>
                  <img
                    className="rounded-xl border w-full h-60 object-cover"
                    src={data.images[0]}
                    alt=""
                  />
                </div>
              )}
              <div className="flex justify-start gap-2 bg-white">
                {data?.images.slice(1).map((item, index) => (
                  <div className="w-1/2" key={index}>
                    <img
                      className="border rounded-xl h-full object-cover"
                      src={item}
                      alt=""
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-semibold">{data?.name}</h1>
              <div>
                <div className="flex items-center gap-5 my-3">
                  <p className="text-xl py-2 px-5 bg-white border rounded-lg text-[#757575]">
                    Price: <span>${data?.price}</span>
                  </p>
                  <p className="text-xl py-2 px-3 bg-white border rounded-lg text-[#757575]">
                    Category: <span>{data?.category}</span>
                  </p>
                </div>
                <div className="flex items-start gap-5 flex-col">
                  <p className="text-xl py-2 px-3 bg-white border rounded-lg text-[#757575]">
                    Quantity: <span>{data?.quantity}</span>
                  </p>
                  {data?.description === "" ? (
                    ""
                  ) : (
                    <p className="text-xl py-2 px-3 bg-white border rounded-lg text-[#757575]">
                      Description: <span>{data?.description}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DynamicProducts;
