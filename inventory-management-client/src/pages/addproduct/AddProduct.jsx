import { useEffect, useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import axios from "axios";
import { IoImageOutline } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import FindUser from "../../hooks/FindUser";
import Loading from "../../components/Loading";
import { FaSpinner } from "react-icons/fa";

const AddProduct = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState([]);
  const [findUser, setFindUser] = useState(null);
  const [productAddLoading, setProductAddLoading] = useState(false);
  const dispatch = useDispatch();
  const { email, isLoading: load } = useSelector((state) => state.auth);

  const GetData = async () => {
    const userData = await FindUser({ email });
    setFindUser(userData);
  };
  useEffect(() => {
    GetData();
  }, [email, dispatch]);

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

    if (droppedFiles.length === 0) {
      toast.error("Image is required");
    }

    if (imageUrl.length + droppedFiles.length > 3) {
      toast.error("You can only upload 3 images.");
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
    if (imageUrl.length + files.length > 3) {
      toast.error("You can only upload 3 images.");
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

  const handleGetFromData = async (e) => {
    e.preventDefault();
    setProductAddLoading(true);
    const name = e.target.name.value;
    const category = e.target.category.value;
    const quantity = e.target.qunatity.value;
    const price = e.target.price.value;
    const description = e.target.description.value;
    const images = imageUrl;

    const user = await findUser?._id;

    if (images.length === 0) {
      toast.error("At least one image is required.");
      return;
    }

    if (findUser && findUser?._id) {
      const data = {
        user,
        name,
        category,
        price,
        quantity,
        description,
        images,
      };

      try {
        const response = await axios.post(
          "https://inventory-management-server-beta.vercel.app/api/v1/products/addProduct",
          data
        );
        if (
          response.data.statusCode === 200 &&
          response.data.success === true
        ) {
          toast.success("Product Added Successfully");
          setImageUrl("");
          e.target.reset();
          setProductAddLoading(false);
        }
      } catch (error) {
        toast.error(error.message);
        setProductAddLoading(false);
      }
    } else {
      console.log("user id needed");
      GetData();
    }
  };

  const handleRemoveImage = (index) => {
    setImageUrl((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };

  return (
    <>
      {load ? (
        <Loading />
      ) : (
        <div className="mx-10">
          <Toaster />
          <div>
            <form
              onSubmit={handleGetFromData}
              className="p-5 border-2 rounded-lg"
            >
              <h1 className="text-[#374151] text-xl font-semibold pb-6">
                Add Product
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
                  {imageUrl.length !== 0 ? (
                    <div className="flex flex-wrap items-center pt-6 gap-2 w-[400px] relative">
                      {imageUrl.map((link, index) => (
                        <div key={Math.random()}>
                          <img className="w-32 rounded-lg" src={link} alt="" />
                          <span
                            className="text-xl left-3 rounded-full w-2 h-2 absolute top-7 cursor-pointer"
                            onClick={() => handleRemoveImage(index)}
                          >
                            <p>&times;</p>
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
                      placeholder="Product Name*"
                      required
                    />
                    <select
                      className="w-64 h-12 px-3 bg-white  border border-blue-500 outline-none rounded-lg"
                      name="category"
                      defaultValue=""
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
                      placeholder="Quantity*"
                      required
                    />
                    <input
                      className="w-64 h-12 bg-white  border border-blue-500 outline-none rounded-lg px-3"
                      type="number"
                      name="price"
                      placeholder="Price*"
                      required
                    />
                  </div>
                  <textarea
                    className="h-64 w-full border border-blue-500 outline-none mt-6 rounded-lg resize-none px-3 py-3"
                    name="description"
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
                  "Submit"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProduct;
