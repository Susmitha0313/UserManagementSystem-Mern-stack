
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { deleteUser, editUser, fetchData } from "../../redux/adminRedux/adminThunk";
import { ToastContainer, toast } from "react-toastify";
import Swal from 'sweetalert2';

function AdminHome() {
 
    const userData = useSelector((store) => store.admin.userData);
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [edit, setEdit] = useState(null);
    const [name, setName] = useState(null);
    const [search, setSearch] = useState("");
  
    useEffect(() => {
      
      setData(data);
    }, [search]);
  
    useEffect(() => {
      if (userData.length > 0) {
        setData(userData);
      }
    }, [userData]);
  
    useEffect(() => {
      dispatch(fetchData());
    }, []);
  
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
  
    function del(userId){
      Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          showCancelButton: true,
          confirmButtonColor: '#000',
          cancelButtonColor: '#000',
          confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: 'Deleted!',
              confirmButtonColor:'#000'
            }).then((result)=>{
              dispatch(deleteUser({userId,toast}))
            })
          }
        })
    }
  
    return (
        <div className="admin-home">

       
    
        <ToastContainer />
        <div className="navbar">
          <div className="navbar-brand">Admin Dashboard</div>
          <a href="#" onClick={() => alert('Logout')}>Logout</a>
        </div>
        <div className="admincard">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={() => setSearch('')}>Clear</button>
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
                          <button className="button button-save" onClick={() => handleSave(user._id)}>Save</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.mobile}</td>
                        <td>{user.is_blocked ? "Blocked" : "UnBlocked"}</td>
                        <td>
                          <button className="button button-edit"
                            onClick={() => {
                              setEdit(user._id);
                              setName(user.name);
                            }}
                          >
                            Edit
                          </button>
                        </td>
                        <td>
                          <button className="button button-delete" onClick={() => del(user._id)}>Block</button>
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

export default AdminHome
