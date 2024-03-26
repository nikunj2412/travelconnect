import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import {app} from '../firebase'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { toast } from 'react-toastify';


const validationSchema = Yup.object({
  packageName: Yup.string().required("packageName is required"),
  packageDescription: Yup.string().required("Package Description is required"),
  packagePrice: Yup.string().required("Enter Price"),
  location: Yup.string().required("Enter Location"),
  packageDays: Yup.number().required("required"),
  packageNights: Yup.number().required("required"),
  packageActivity: Yup.string().required("Please Enter Activity Details"),
  inclusion: Yup.string().required("Included Services required"),
  exclusion: Yup.string().required("Excluded Services required"),
});

const AddPackage = () => {
  const [images, setImages] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageUploadPercent, setImageUploadPercent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const formik = useFormik({
    initialValues: {
      packageName: "",
      packageDescription: "",
      packagePrice: "",
      location: "",
      packageDays: "",
      packageNights: "",
      packageActivity: "",
      inclusion: "",
      exclusion: "",
      packageImages: []
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log("Values===", values);
      try {
        const response = await axios.post(
            "http://localhost:3333/v1/admin/create",
          values,
          {
            headers: {
              "content-type": "application/x-www-form-urlencoded",
            },
          }
        );
        toast.success("Package Added Successfully")
        resetForm();
      } catch (error) {
        toast.error("Error during API request:", error);
      }
    },
  });

    const storeImage = async (file) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name.replace(/\s/g, "");
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

    const handleImageSubmit = async () => {
        if (images.length === 0) {
          return;
        }
      
        try {
          setUploading(true);
          setImageUploadError(false);
      
          const urls = await Promise.all(
            Array.from(images).map(async (image) => {
              try {
                return await storeImage(image);
              } catch (error) {
                console.error("Image upload failed:", error);
                throw new Error("Image upload failed (2mb max per image)");
              }
            })
          );
      
          urls.forEach((url) => {
            formik.setFieldValue('packageImages', [
              ...formik.values.packageImages,
              url
            ]);
          });
      
          setImageUploadError(false);
          setUploading(false);
        } catch (error) {
          console.error("Image upload error:", error);
          setImageUploadError(error.message);
          setUploading(false);
        }
      };
      

  return (
    <div className="grid min-h-screen place-items-center">
      <div className="w-11/12 p-12 bg-white sm:w-8/12 md:w-2/3 lg:w-5/12">
        <h1 className="text-xl font-semibold">Add Tour Package</h1>
        <form
          className="flex flex-col pt-3 md:pt-8"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex flex-col pt-4">
            <div className="flex relative flex-col">
              <label htmlFor="packageName">Package Name</label>
              <input
                type="text"
                name="packageName"
                value={formik.values.packageName}
                onChange={formik.handleChange}
                className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                placeholder="Package Name"
              />
              {formik.touched.packageName && formik.errors.packageName && (
                <div className="text-red-500">{formik.errors.packageName}</div>
              )}
            </div>
          </div>

          <div className="flex flex-col pt-4">
            <div className="flex relative flex-col">
              <label htmlFor="packageDescription">Package Description</label>
              <textarea
                id="packageDescription"
                name="packageDescription"
                value={formik.values.packageDescription}
                onChange={formik.handleChange}
                className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                placeholder="Package Description"
              />
              {formik.touched.packageDescription &&
                formik.errors.packageDescription && (
                  <div className="text-red-500">
                    {formik.errors.packageDescription}
                  </div>
                )}
            </div>
          </div>

          <div className="flex flex-col pt-4">
            <div className="flex relative flex-col">
              <label htmlFor="packagePrice">Package Price</label>
              <input
                type="number"
                name="packagePrice"
                value={formik.values.packagePrice}
                onChange={formik.handleChange}
                className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                placeholder="Package Price"
              />
              {formik.touched.packagePrice && formik.errors.packagePrice && (
                <div className="text-red-500">{formik.errors.packagePrice}</div>
              )}
            </div>
          </div>

          <div className="flex flex-col pt-4">
            <div className="flex relative flex-col">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                name="location"
                value={formik.values.location}
                onChange={formik.handleChange}
                className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                placeholder="Package Name"
              />
              {formik.touched.location && formik.errors.location && (
                <div className="text-red-500">{formik.errors.location}</div>
              )}
            </div>
          </div>

          <div className="flex flex-col pt-4">
            <div className="flex relative flex-col">
              <label htmlFor="packageDays">Days</label>
              <input
                type="number"
                name="packageDays"
                value={formik.values.packageDays}
                onChange={formik.handleChange}
                className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                placeholder="Package Days"
              />
              {formik.touched.packageDays && formik.errors.packageDays && (
                <div className="text-red-500">{formik.errors.packageDays}</div>
              )}
            </div>
          </div>

          <div className="flex flex-col pt-4">
            <div className="flex relative flex-col">
              <label htmlFor="packageNights">Nights</label>
              <input
                type="number"
                name="packageNights"
                value={formik.values.packageNights}
                onChange={formik.handleChange}
                className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                placeholder="Package Nights"
              />
              {formik.touched.packageNights && formik.errors.packageNights && (
                <div className="text-red-500">
                  {formik.errors.packageNights}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col pt-4">
            <div className="flex relative flex-col">
              <label htmlFor="packageActivity">Activities</label>
              <textarea
                name="packageActivity"
                value={formik.values.packageActivity}
                onChange={formik.handleChange}
                className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                placeholder="Activities"
              />
              {formik.touched.packageActivity &&
                formik.errors.packageActivity && (
                  <div className="text-red-500">
                    {formik.errors.packageActivity}
                  </div>
                )}
            </div>
          </div>

          <div className="flex flex-col pt-4">
            <div className="flex relative flex-col">
              <label htmlFor="inclusion">Included Services</label>
              <textarea
                name="inclusion"
                value={formik.values.inclusion}
                onChange={formik.handleChange}
                className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
              />
              {formik.touched.inclusion && formik.errors.inclusion && (
                <div className="text-red-500">{formik.errors.inclusion}</div>
              )}
            </div>
          </div>

          <div className="flex flex-col pt-4">
            <div className="flex relative flex-col">
              <label htmlFor="exclusion">Excluded Services</label>
              <textarea
                name="exclusion"
                value={formik.values.exclusion}
                onChange={formik.handleChange}
                className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
              />
              {formik.touched.exclusion && formik.errors.exclusion && (
                <div className="text-red-500">{formik.errors.exclusion}</div>
              )}
            </div>
          </div>

          <div className="flex flex-col pt-4">
            <div className="flex relative flex-col">
              <label htmlFor="packageImages">Images</label>
              <input
                type="file"
                name="packageImages"
                multiple
                className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                placeholder="Upload Images"
                onChange={(e) => setImages(e.target.files)}
              />
            </div>
          </div>

          {imageUploadError ||
            (error && (
              <span className="text-red-600 w-full">
                {imageUploadError || error}
              </span>
            ))}
          <button
            hidden={images.length === 0}
            disabled={uploading || loading}
            className="bg-green-700 p-3 rounded text-white hover:opacity-95 disabled:opacity-80 w-full"
            type="button"
            onClick={handleImageSubmit}
          >
            {uploading
              ? `Uploading...(${imageUploadPercent}%)`
              : loading
              ? "Loading..."
              : "Upload Images"}
          </button>

          <button
            disabled={uploading || loading}
            type="submit"
            className="w-full px-4 mt-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-orange-600 shadow-md focus:ring-2"
          >
            {uploading
              ? "Uploading..."
              : loading
              ? "Loading..."
              : "Add Package"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPackage;
