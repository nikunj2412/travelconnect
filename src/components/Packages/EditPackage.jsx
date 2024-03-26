import React, { useEffect, useState } from "react";
import axios from "axios";
import {app} from '../../firebase'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";



const EditPackage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageUploadPercent, setImageUploadPercent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
      packageName: "",
      packageDescription: "",
      packagePrice: "",
      location: "",
      packageDays: "",
      packageNights: "",
      packageActivity: "",
      inclusion: "",
      exclusion: "",
    })
    const getPackageData = async () => {
        try {
          const res = await fetch(`http://localhost:3333/v1/admin/post/${params?.id}`);
          const {data} = await res.json();
          console.log("data",data)
          if (data) {
            setFormData({
                packageName: data?.packageName,
                packageDescription: data?.packageDescription,
                packagePrice: data?.packagePrice,
                location: data?.location,
              packageDays: data?.packageDays,
              packageNights: data?.packageNights,
              packageActivity: data?.packageActivity,
              inclusion: data?.inclusion,
              exclusion: data?.exclusion,
            });
          } else {
            alert(data?.message || "Something went wrong!");
          }
        } catch (error) {
          console.log(error);
        }
      };

      useEffect(() => {
        if (params.id) getPackageData();
      }, [params.id]);
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
      };
    
      const handleImageSubmit = () => {
        if (
          images.length > 0 &&
          images.length + formData.packageImages.length < 6
        ) {
          setUploading(true);
          setImageUploadError(false);
          const promises = [];
    
          for (let i = 0; i < images.length; i++) {
            promises.push(storeImage(images[i]));
          }
          Promise.all(promises)
            .then((urls) => {
              setFormData({
                ...formData,
                packageImages: formData.packageImages.concat(urls),
              });
              setImageUploadError(false);
              setUploading(false);
            })
            .catch((err) => {
              setImageUploadError("Image upload failed (2mb max per image)");
              setUploading(false);
            });
        } else {
          setImageUploadError("You can only upload 5 images per package");
          setUploading(false);
        }
      };
    
      const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
          const storage = getStorage(app);
          const fileName = new Date().getTime() + file.name;
          const storageRef = ref(storage, fileName);
          const uploadTask = uploadBytesResumable(storageRef, file);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setImageUploadPercent(Math.floor(progress));
            },
            (error) => {
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL);
              });
            }
          );
        });
      };
    
      const handleDeleteImage = (index) => {
        setFormData({
          ...formData,
          packageImages: formData.packageImages.filter((_, i) => i !== index),
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (
          formData.packageName === "" ||
          formData.packageDescription === "" ||
          formData.packagePrice === "" ||
          formData.location === "" ||
          formData.packageDays === "" ||
          formData.packageNights === "" ||
          formData.packageActivity === "" ||
          formData.inclusion === "" ||
          formData.exclusion === ""
        ) {
          alert("All fields are required!");
          return;
        }
        
        try {
          setLoading(true);
          setError(false);
    
          const res = await fetch(`http://localhost:3333/v1/admin/update/${params?.id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
          const data = await res.json();
          if (data?.success === false) {
            setError(data?.message);
            setLoading(false);
          }
          setLoading(false);
          setError(false);
          alert(data?.message);
          // getPackageData();
          // setImages([]);
          navigate(`/package/${params?.id}`);
        } catch (err) {
          console.log(err);
        }
      };

  return (
    <div className="grid min-h-screen place-items-center">
      <div className="w-11/12 p-12 bg-white sm:w-8/12 md:w-2/3 lg:w-5/12">
        <h1 className="text-xl font-semibold">Add Tour Package</h1>
        <form
          className="flex flex-col pt-3 md:pt-8"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col pt-4">
            <div className="flex relative flex-col">
              <label htmlFor="packageName">Package Name</label>
              <input
                type="text"
                name="packageName"
                id="packageName"
              value={formData?.packageName}
              onChange={handleChange}
                className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                placeholder="Package Name"
              />
              
            </div>
          </div>

          <div className="flex flex-col pt-4">
            <div className="flex relative flex-col">
              <label htmlFor="packageDescription">Package Description</label>
              <textarea
                id="packageDescription"
                name="packageDescription"
              value={formData?.packageDescription}
              onChange={handleChange}
                className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                placeholder="Package Description"
              />
              
            </div>
          </div>

          <div className="flex flex-col pt-4">
            <div className="flex relative flex-col">
              <label htmlFor="packagePrice">Package Price</label>
              <input
                type="number"
                name="packagePrice"
                id="packagePrice"
              value={formData?.packagePrice}
              onChange={handleChange}
                className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                placeholder="Package Price"
              />
              
            </div>
          </div>

          <div className="flex flex-col pt-4">
            <div className="flex relative flex-col">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                name="location"
                id="location"
                value={formData?.location}
                onChange={handleChange}
                className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                placeholder="Package Name"
              />
              
            </div>
          </div>

          <div className="flex flex-col pt-4">
            <div className="flex relative flex-col">
              <label htmlFor="packageDays">Days</label>
              <input
                type="number"
                name="packageDays"
                id="packageDays"
                value={formData?.packageDays}
                onChange={handleChange}
                className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                placeholder="Package Days"
              />
              
            </div>
          </div>

          <div className="flex flex-col pt-4">
            <div className="flex relative flex-col">
              <label htmlFor="packageNights">Nights</label>
              <input
                type="number"
                name="packageNights"
                id="packageNights"
                value={formData?.packageNights}
                onChange={handleChange}
                className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                placeholder="Package Nights"
              />
              
            </div>
          </div>

          <div className="flex flex-col pt-4">
            <div className="flex relative flex-col">
              <label htmlFor="packageActivity">Activities</label>
              <textarea
                name="packageActivity"
                id="packageActivity"
                value={formData?.packageActivity}
                onChange={handleChange}
                className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                placeholder="Activities"
              />
              
            </div>
          </div>

          <div className="flex flex-col pt-4">
            <div className="flex relative flex-col">
              <label htmlFor="inclusion">Included Services</label>
              <textarea
                name="inclusion"
                id="inclusion"
                value={formData?.inclusion}
                onChange={handleChange}
                className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
              />
              
            </div>
          </div>

          <div className="flex flex-col pt-4">
            <div className="flex relative flex-col">
              <label htmlFor="exclusion">Excluded Services</label>
              <textarea
                name="exclusion"
                id="exclusion"
                value={formData?.exclusion}
                onChange={handleChange}
                className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
              />
              
            </div>
          </div>

          <button
            disabled={uploading || loading}
            type="submit"
            className="w-full px-4 mt-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-orange-600 shadow-md focus:ring-2"
          >
            {uploading
              ? "Uploading..."
              : loading
              ? "Loading..."
              : "Update Package"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPackage;
