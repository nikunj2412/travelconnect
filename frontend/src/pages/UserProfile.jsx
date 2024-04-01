import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
  } from "firebase/storage";
  import { app } from "../firebase";
import { logOutStart, logOutSuccess, updateUserSuccess } from "../redux/user/userSlice";
import { toast } from 'react-toastify';

const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const { loggedUser } = useSelector((state) => state.user);
  const [profilePhoto, setProfilePhoto] = useState(undefined);
  const [photoPercentage, setPhotoPercentage] = useState(0);
  const [profileData, setProfileData] = useState({
    firstName: loggedUser.firstName || "",
  lastName: loggedUser.lastName || "",
  email: loggedUser.email || "",
  profileImg: loggedUser.profileImg || "",
  });

  const handleChange = (e) => {
    setProfileData({
        ...profileData,
        [e.target.id]: e.target.value
    })
  }
  console.log("profile Data",profileData)
  
  const updateUserProfile = async () => {
    try {
      const res = await fetch(
        `http://localhost:3333/v1/user/update/${loggedUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profileData),
        }
      );
      const data = await res.json();
      if(data?.status === "Success"){
        alert("User updated successfully")
        dispatch(updateUserSuccess(data?.data));
      }
      console.log("user data", data);
    } catch (error) {
      console.log(error);
    }
  };
  
  
  const handleProfilePhoto = async () => {
    try {
      const storage = getStorage(app);
      const photoname = new Date().getTime() + profilePhoto.name.replace(/\s/g, "");
      const storageRef = ref(storage, `profile-photos/${photoname}`);
      const uploadTask = uploadBytesResumable(storageRef, profilePhoto);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.floor(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setPhotoPercentage(progress);
        },
        (error) => {
          console.log(error);
        },
        async () => {
          try {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
            setProfileData(prevData => ({
              ...prevData,
              profileImg: downloadUrl
            }));
            console.log(profileData)
          } catch (error) {
            console.log(error);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleLogout = async () => {
    try {
      dispatch(logOutStart()); 
      const res = await fetch("http://localhost:3333/v1/user/logout", {
        method: "POST"
      });
      const data = await res.json();
      dispatch(logOutSuccess()); // Dispatch the action to indicate successful logout (optional)
      toast.success("You Logout Successfully")
      navigate("/signin"); // Redirect to the signin page or any other appropriate route
       // Display a success message or handle errors
    } catch (error) {
      console.log(error);
      // Handle errors, such as network issues or server errors
    }
  };
  
  

  return (
    <>
    <div className="flex justify-end px-16">
      <Link to={`/user-booking/${loggedUser.id}`}>
    <button className="px-4 mt-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-green-700 shadow-md focus:ring-2" >Bookings</button>
    </Link>
    </div>
      
      <div className="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5">
        <img
          className="w-32 h-32 rounded-full mx-auto"
          src={
            (profilePhoto && URL.createObjectURL(profilePhoto)) ||
            profileData.profileImg
          }
          alt="Profile picture"
          onClick={() => fileRef.current.click()}
        />
        <input
                  type="file"
                  name="profileImg"
                  id="profileImg"
                  hidden
                  ref={fileRef}
                  accept="image/*"
                  onChange={(e) => setProfilePhoto(e.target.files[0])}
                />
                {profilePhoto && (
                <div className="flex w-full justify-between gap-1">
                  <button
                    onClick={handleProfilePhoto}
                    className="bg-green-700 p-2 text-white mt-3 flex-1 hover:opacity-90"
                  >
                    Upload
                  </button>
                </div>
              )}
        <h2 className="text-center text-2xl font-semibold mt-3">User Profile</h2>
        <div className="mb-5">
          <label
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Firstname
          </label>
          <input
            value={profileData.firstName}
            name="firstName"
            id="firstName"
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-500 outline-none focus:border-orange-500 focus:shadow-md"
          />
        </div>
        <div className="mb-5">
          <label
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Lastname
          </label>
          <input
            value={profileData.lastName}
            name="lastName"
            id="lastName"
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-500 outline-none focus:border-orange-500 focus:shadow-md"
          />
        </div>
        <div className="mb-5">
          <label
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Email
          </label>
          <input
            value={profileData.email}
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-500 outline-none focus:border-orange-500 focus:shadow-md"
          />
        </div>
        <div>
          <button 
           onClick={updateUserProfile}
          className="w-full px-4 mt-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-orange-600 shadow-md focus:ring-2">
            Update
          </button>
        </div>
        <div>
          <button 
           onClick={handleLogout}
          className="w-full px-4 mt-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-orange-600 shadow-md focus:ring-2">
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
