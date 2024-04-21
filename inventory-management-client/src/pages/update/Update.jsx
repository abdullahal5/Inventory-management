import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaSpinner } from "react-icons/fa6";
import { IoImageOutline } from "react-icons/io5";
import axios from "axios";
import { IoMdCloudUpload } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

const Update = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const axiosPublic = useAxiosPublic();
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState([]);
  const [productAddLoading, setProductAddLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const response = await axiosPublic.get(`/api/v1/products/getAllproduct`);
      setData(response?.data.find((item) => item?._id === params?.id));
      setLoading(false);
    };
    getData();
  }, [axiosPublic, params]);

  const uploadFileToImgBB = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await axios.post(
        "https://api.imgbb.com/1/upload?key=32759f60f432e8e5c388e20a2da70600",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
      return res.data.data.display_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(event.dataTransfer.files);

    if (droppedFiles?.length === 0) {
      toast.error("Image is required");
    }

    if (imageUrl?.length + droppedFiles?.length > 3) {
      toast.error("Please Remove Previous Images Before Adding New Image");
      return;
    }

    setIsLoading(true);

    const uploadedUrls = [];

    for (const file of droppedFiles) {
      const url = await uploadFileToImgBB(file);
      if (url) {
        uploadedUrls.push(url);
      }
    }

    setImageUrl((prevUrls) => [...prevUrls, ...uploadedUrls]);
    setIsLoading(false);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInputChange = async (files) => {
    if (imageUrl?.length + files?.length > 3) {
      toast.error("Please Remove Previous Images Before Adding New Image");
      return;
    }

    const images = [];
    setIsLoading(true);

    for (const file of files) {
      const url = await uploadFileToImgBB(file);

      if (url) {
        images.push(url);
      }
    }
    setImageUrl((prevUrls) => [...prevUrls, ...images]);
    setIsLoading(false);
  };

  useEffect(() => {
    if (data && data.images) {
      setImageUrl(data.images);
    }
  }, [data]);

  const handleRemoveImage = (urlToRemove) => {
    setImageUrl((prevUrls) => prevUrls.filter((url) => url !== urlToRemove));
  };

  const handleGetFromData = async (e) => {
    e.preventDefault();
    setProductAddLoading(true);
    const name = e.target.name.value;
    const category = e.target.category.value;
    const quantity = e.target.qunatity.value;
    const price = e.target.price.value;
    const description = e.target.description.value;
    const images = imageUrl;

    if (images?.length === 0) {
      toast.error("At least one image is required.");
      return;
    }

    if (data?._id) {
      const updateInfo = {
        name,
        category,
        price,
        quantity,
        description,
        images,
      };
      await axiosPublic
        .patch(`/api/v1/products/updateProduct?id=${data?._id}`, updateInfo)
        .then((res) => {
          if (res.data.statusCode === 200 && res.data.success === true) {
            Swal.fire({
              title: "Good job!",
              text: "You Successfully updated the product!",
              icon: "success",
            });
          }
        });
    }
    setProductAddLoading(false);
  };

  return (
    <div className="mx-10">
      <Toaster />
      {loading ? (
        <div className="h-screen flex items-center justify-center">
          <FaSpinner fontSize="5rem" className="animate-spin" />
        </div>
      ) : (
        <form onSubmit={handleGetFromData} className="p-5 border-2 rounded-lg">
          <h1 className="text-[#374151] text-xl font-semibold pb-6">
            Update Product Information
          </h1>
          <div className="flex gap-6">
            <div>
              <div
                onDrop={handleDrop}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                className={`border-2 h-64 border-dashed w-[400px] px-5 py-5 border-blue-500 rounded-lg flex flex-col items-center justify-center ${
                  isDragging ? "bg-teal-300" : "bg-white"
                } cursor-pointer relative`}
              >
                {isLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75 rounded-lg">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                  </div>
                ) : (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                      name="images"
                      onChange={(e) =>
                        handleFileInputChange(Array.from(e.target.files))
                      }
                      multiple
                    />
                    <label className="w-full h-full flex flex-col items-center justify-center">
                      <IoMdCloudUpload
                        className="text-blue-500"
                        fontSize="5rem"
                      />
                      <h1 className="text-xl font-semibold text-blue-500">
                        Drag & Drop Images Or Browse
                      </h1>
                      <p className="italic">you can add only 3 images</p>
                    </label>
                  </>
                )}
              </div>
              {imageUrl.length > 0 ? (
                <div className="flex flex-wrap items-center pt-6 gap-2 w-[400px] relative">
                  {imageUrl.map((link) => (
                    <div key={link}>
                      <img className="w-32 rounded-lg pt-4" src={link} alt="" />
                      <span
                        className="text-xl right-10 rounded-full w-2 h-2 absolute top-1 cursor-pointer text-blue-500 "
                        onClick={() => handleRemoveImage(link)}
                      >
                        <p>Clear</p>
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-2 justify-center pt-5">
                  <IoImageOutline color="#757575" fontSize="6rem" />
                  <IoImageOutline color="#757575" fontSize="6rem" />
                  <IoImageOutline color="#757575" fontSize="6rem" />
                </div>
              )}
            </div>
            <div>
              <div className="flex gap-6">
                <input
                  className="w-64 h-12 px-3 bg-white  border border-blue-500 outline-none rounded-lg"
                  type="text"
                  name="name"
                  defaultValue={data?.name}
                  placeholder="Product Name*"
                  required
                />
                <select
                  className="w-64 h-12 px-3 bg-white  border border-blue-500 outline-none rounded-lg"
                  name="category"
                  defaultValue={data?.category}
                >
                  <option value="" disabled>
                    Select Category*
                  </option>
                  <option value="mobile">Mobile</option>
                  <option value="electronic">Electronics</option>
                  <option value="laptop">Laptop</option>
                  <option value="computer">Computer</option>
                </select>
              </div>
              <div className="flex gap-6 pt-6">
                <input
                  className="w-64 h-12 bg-white  border border-blue-500 outline-none rounded-lg px-3"
                  type="number"
                  name="qunatity"
                  defaultValue={data?.quantity}
                  placeholder="Quantity*"
                  required
                />
                <input
                  className="w-64 h-12 bg-white  border border-blue-500 outline-none rounded-lg px-3"
                  type="number"
                  defaultValue={data?.price}
                  name="price"
                  placeholder="Price*"
                  required
                />
              </div>
              <textarea
                className="h-64 w-full border border-blue-500 outline-none mt-6 rounded-lg resize-none px-3 py-3"
                name="description"
                defaultValue={data?.description}
                placeholder="Description (optional)"
                id=""
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`${
              isLoading ? "bg-gray-300" : "bg-blue-500"
            } text-white w-full py-3 rounded-lg mt-6 font-semibold`}
          >
            {productAddLoading ? (
              <FaSpinner className="animate-spin mx-auto" />
            ) : (
              "Update"
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default Update;
