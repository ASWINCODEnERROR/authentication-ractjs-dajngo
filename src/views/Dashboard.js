import React, { useState, useEffect } from 'react';
import useAxios from "../utils/useAxios";
import { jwtDecode } from 'jwt-decode';

function Dashboard() {
  const [res, setRes] = useState("");
  const api = useAxios();
  const token = localStorage.getItem("authTokens");

  let username;
  if (token) {
    const decoded = jwtDecode(token);
    username = decoded.username;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/test/");
        setRes(response.data.response);
      } catch (error) {
        console.log(error);
        setRes("Something went wrong");
      }
    };
    fetchData();
  }, [api]);

  return (
    <div className="container"  style={{ marginTop: "80px" }}>
      <div className="jumbotron text-center bg-primary text-white">
        <h1 className="display-4">Welcome to Your Dashboard</h1>
        <p className="lead">Hello, {username}!</p>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="card text-white bg-success mb-3">
            <div className="card-header">Overview</div>
            <div className="card-body">
              <h5 className="card-title"> title1 </h5>
              <p className="card-text">{res}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-info mb-3">
            <div className="card-header">Details</div>
            <div className="card-body">
              <h5 className="card-title">title2</h5>
              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-warning mb-3">
            <div className="card-header">Notifications</div>
            <div className="card-body">
              <h5 className="card-title"> title2 </h5>
              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="card text-center">
        <div className="card-header">
          Featured
        </div>
        <div className="card-body">
          <h5 className="card-title">Special title treatment</h5>
          <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>
        <div className="card-footer text-muted">
          2 days ago
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
