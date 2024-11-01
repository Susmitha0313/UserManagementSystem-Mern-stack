import React, { useEffect, useState } from "react";
import "./adminHome.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import {deleteUser, editUser,fetchData} from "../../redux/adminRedux/adminThunk";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { Logout } from "../../redux/adminRedux/adminSlice";



function AdminHome() {
  const userData = useSelector((store) => store.admin.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(null);
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");


  // Filter data based on search input
  useEffect(() => {
    if (search.trim() === "") {
      setData(userData); // If no search input, show all data
    } else {
      const filteredData = userData.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()) ||
          user.mobile.includes(search)
      );
      setData(filteredData);
    }
  }, [search, userData]);



  useEffect(() => {
    if (userData.length > 0) {
      setData(userData);
    }
  }, [userData]);



  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);



  const logout = () => {
    Swal.fire({
      title: 'Are you sure you want to log out?',
      text: "You will need to log in again to access your account.",
    
      showCancelButton: true,
      confirmButtonColor: '#000',
      cancelButtonColor: '#000',
      confirmButtonText: 'Yes, Logout!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Logout',
          confirmButtonColor:'#000'
        }).then((result)=>{
          dispatch(Logout())
          navigate('/admin')
        })
      }
    })
  }




  function handleSave(userId) {
    if (name.trim() === "") {
      toast.error(
        "Enter a valid name. The name must contain at least 3 characters",
        {
          hideProgressBar: true,
          className: "custom-toast-error",
          autoClose: 2000,
        }
      );
    } else {
      dispatch(editUser({ name, userId, toast }));
      setEdit(null);
    }
  }



  function del(userId) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#000",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          confirmButtonColor: "#000",
        }).then(() => {
          dispatch(deleteUser({ userId, toast }));
        });
      }
    });
  }





  
  return (
    <div className="admin-home">
      <ToastContainer />
      <div className="navbar">
        <div className="navbar-brand">Admin Dashboard</div>
        <a onClick={logout}>Logout</a>
        <p>Users's count : {userData.length}</p>
      </div>
      <div className="admincard">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="clearBtn" onClick={() => setSearch("")}>
            Clear
          </button>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) &&
                data.map((user, index) => (
                  <tr key={index}>
                    {edit === user._id ? (
                      <>
                        <td>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input"
                          />
                        </td>
                        <td>{user.email}</td>
                        <td>{user.mobile}</td>
                        <td>{user.is_blocked ? "Blocked" : "UnBlocked"}</td>
                        <td>
                          <button
                            className="button button-save"
                            onClick={() => handleSave(user._id)}
                          >
                            Save
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.mobile}</td>
                        <td>{user.is_blocked ? "Blocked" : "UnBlocked"}</td>
                        <td>
                          <button
                            className="button button-edit"
                            onClick={() => {
                              setEdit(user._id);
                              setName(user.name);
                            }}
                          >
                            Edit
                          </button>
                        </td>
                        <td>
                          <button
                            className="button button-delete"
                            onClick={() => del(user._id)}
                          >
                            Block
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
