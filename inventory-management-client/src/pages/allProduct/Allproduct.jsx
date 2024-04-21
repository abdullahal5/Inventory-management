import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import Swal from "sweetalert2";

const Allproduct = () => {
  const axiosPublic = useAxiosPublic();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(6);
  const [update, setUpdate] = useState(Date.now());

  const getData = async () => {
    const response = await axiosPublic.get(
      `/api/v1/products/getAllproduct?page=${currentPage}&limit=${itemPerPage}`
    );
    setData(response.data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [currentPage, update]);

  const handleSortPrice = (e) => {
    if (e.target.value === "low-to-high") {
      const sortedData = [...data].sort((a, b) => a?.price - b?.price);
      setData(sortedData);
    } else if (e.target.value === "high-to-low") {
      const sortedData = [...data].sort((a, b) => b?.price - a?.price);
      setData(sortedData);
    }
  };

  const handleDaySort = (e) => {
    if (e.target.value === "today") {
      const today = new Date();
      const startOfToday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );
      const endOfToday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 1
      );

      const filteredData = data?.filter((item) => {
        const createdAt = new Date(item.createdAt);
        return createdAt >= startOfToday && createdAt < endOfToday;
      });

      const sortedData = filteredData.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      setData(sortedData);
    } else if (e.target.value === "week") {
      const today = new Date();
      const startOfWeek = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - today.getDay()
      );
      const endOfWeek = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - today.getDay() + 7
      );

      console.log(startOfWeek - endOfWeek);

      const filteredData = data.filter((item) => {
        const createdAt = new Date(item.createdAt);
        return createdAt >= startOfWeek && createdAt < endOfWeek;
      });

      const sortedData = filteredData.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      setData(sortedData);
    } else if (e.target.value === "all") {
      getData();
    }
  };

  const handleDeleteProduct = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deleteProduct = await axiosPublic.delete(
          `/api/v1/products/deleteProduct/${id}`
        );
        if (
          deleteProduct.data.statusCode === 200 &&
          deleteProduct.data.success === true
        ) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          setUpdate(Date.now());
        }
      }
    });
  };

  return (
    <div className="mx-10">
      <div className="flex items-center justify-between">
        <h1 className="text-[#374151] text-3xl font-semibold">All Products</h1>
        <div className="flex items-center gap-5">
          <select
            className="w-44 py-2 px-3 bg-white  border border-blue-500 outline-none rounded-lg shadow-md text-sm"
            name="category"
            onChange={handleSortPrice}
            defaultValue=""
          >
            <option value="" disabled>
              Sort By Amount
            </option>
            <option value="low-to-high">price - Low to High</option>
            <option value="high-to-low">price - High to Low</option>
          </select>
          <select
            className="w-44 py-2 px-3 bg-white  border border-blue-500 outline-none rounded-lg shadow-md text-sm"
            name="category"
            onChange={handleDaySort}
            defaultValue=""
          >
            <option value="" disabled>
              Sort By Day
            </option>
            <option value="all">All</option>
            <option value="today">Today</option>
            <option value="week">This week</option>
            <option value="month">This month</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="h-screen flex items-center justify-center">
          <FaSpinner fontSize="5rem" className="animate-spin" />
        </div>
      ) : (
        <div className="relative overflow-x-auto sm:rounded-lg mt-10">
          {data.length > 0 ? (
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-t border-l border-r">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    S. No.
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Details
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, idx) => (
                  <tr
                    key={item?._id}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {idx + 1}
                    </th>
                    <td className="px-6 py-4">{item?.name}</td>
                    <td className="px-6 py-4">{item?.category}</td>
                    <td className="px-6 py-4">${item?.price}</td>
                    <td className="px-6 py-4">{item?.quantity}</td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/dashboard/allProduct/itemDetails/${item?._id}`}
                      >
                        <button className="text-[#eef2ff] bg-[#4f46e5] hover:bg-[#4338ca] px-2 py-1 rounded-lg">
                          See Details
                        </button>
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/dashboard/allProduct/updateContent/${item?._id}`}
                        >
                          <button className="text-sm bg-green-500 p-2 text-white rounded-lg hover:bg-green-600">
                            <RiEdit2Fill />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDeleteProduct(item?._id)}
                          className="text-sm bg-red-500 p-2 text-white rounded-lg hover:bg-red-600"
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-[#374151] text-3xl font-semibold text-center overflow-y-hidden border h-96 items-center flex justify-center">
              No Product Available !!!
            </p>
          )}
        </div>
      )}
      {data && (
        <div className="flex justify-between items-center text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b px-4 border-r border-l py-2">
          <p>
            Showing 11 to 20 of{" "}
            <strong className="font-extrabold">{data?.length}</strong> results
          </p>
          <div className="flex items-center gap-3 justify-center">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 hover:bg-[#4338ca] hover:text-white rounded-md disabled:bg-gray-50 disabled:text-black disabled:cursor-not-allowed font-semibold duration-300 ease-in-out transition-all flex items-center"
            >
              <FaAngleLeft /> Previous
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={data.length < itemPerPage}
              className="px-4 py-2 hover:bg-[#4338ca] hover:text-white rounded-md disabled:bg-gray-50 disabled:text-black disabled:cursor-not-allowed font-semibold duration-300 ease-in-out transition-all flex items-center"
            >
              Next <FaAngleRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Allproduct;
