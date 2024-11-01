import React, { useState, useEffect } from 'react';
import './home.css';
import Navbar from '../../components/user/auth/navbar';
import { useDispatch, useSelector } from 'react-redux';
import { addImage, profileEdit } from "../../redux/userRedux/userThunk";
import { ToastContainer, toast } from 'react-toastify';

function Home() {
  const [image, setImage] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({});
  const [mobile, setMobile] = useState('');

  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.data);

  useEffect(() => {
    if (user) {
      setUserDetails(user);
      setFormData(user);
    }
  }, [user]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSaveDetails() {
    if (formData.name.trim() === '' || formData.mobile.trim() === '') {
      toast.error('All Fields Are Required', { hideProgressBar: true, className: 'custom-toast-error', autoClose: 2000 });
    } else if (formData.mobile.length < 10) {
      toast.error('Invalid Mobile Number', { hideProgressBar: true, className: 'custom-toast-error', autoClose: 2000 });
    } else {
      dispatch(profileEdit({ formData, userId: user._id }));
      setEdit(false);
    }
  }

  useEffect(() => {
    if (image) {
      dispatch(addImage({ image, userId: user._id }));
    }
  }, [image]);

  let anonymous = "http://localhost:5001/images/ava.png"

  return (
    <>
      <Navbar />
      <div className="home">
        <div className="card">
          <ToastContainer />
          <div className="face face1">
            <div className="content">  
              <div className="icon">
                {userDetails.image ? (
                  <img
                    id="profileImage"
                    src={userDetails.image ? `http://localhost:5001/images/${userDetails.image}` : anonymous }
                    alt="Profile"
                  />
                ) : (
                  <div className="unknown-profile">
                    <i className="fas fa-user-edit"></i>
                    <p>Add Profile Picture</p>
                  </div>
                )}
                {edit && (
                  <button
                    className="pic-btn"
                    onClick={() => document.getElementById("fileInput").click()}
                  >
                    Edit
                  </button>
                )}
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
            </div>
          </div>
          <div className="face face2">
            <div className="content">
              {edit ? (
                <div className="user-details">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="user-input"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="user-input"
                  />
                  <input
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="user-input"
                  />
                  <button
                    className="save-button"
                    onClick={handleSaveDetails}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="user-details">
                  <h2>User Details</h2>
                  <p>Name: {userDetails.name}</p>
                  <p>Email: {userDetails.email}</p>
                  <p>Phone: {userDetails.mobile}</p>
                  <button
                    className="edit-button"
                    onClick={() => setEdit(!edit)}
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
