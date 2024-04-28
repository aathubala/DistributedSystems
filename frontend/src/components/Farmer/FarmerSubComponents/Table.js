import React, { useEffect, useState } from "react";
import axios from "axios";



const Table = () => {
    const [users, setUsers] = useState([])
    
  const [data, setData] = useState([]);
  

  useEffect(()=> {
    axios.get('http://localhost:8070/api/auth/')
    .then(users => {
      console.log(users);
      let buyers = users.data?.filter((user) => user.type == 'Buyer')
      setUsers(buyers)
    })
    .catch(err => console.log(err))
  }, [])




    return (
        <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
        <div className="w-50">
        <table className="table">
          <thead>
            <tr>
              <th>
                Name
              </th>
              <th>
                Email
              </th>
              <th>
                Type
              </th>
            </tr>
          </thead>
          <tbody>
            {
              users.map(user => {
                return <tr>
                  <td> {user.username} </td>
                  <td> {user.email} </td>
                  <td> {user.type} </td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
      </div>
    );
  };

export default Table;