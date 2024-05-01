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
        <table className="table" style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '8px' }}>
                Name
              </th>
              <th style={{ border: '1px solid black', padding: '8px' }}>
                Email
              </th>
              <th style={{ border: '1px solid black', padding: '8px' }}>
                Type
              </th>
              <th style={{ border: '1px solid black', padding: '8px' }}>
                Courses
              </th>
            </tr>
          </thead>
          <tbody>
            {
              users.map(user => {
                return <tr key={user._id}>
                  <td style={{ border: '1px solid black', padding: '8px' }}> {user.username} </td>
                  <td style={{ border: '1px solid black', padding: '8px' }}> {user.email} </td>
                  <td style={{ border: '1px solid black', padding: '8px' }}> {user.type} </td>
                  <td style={{ border: '1px solid black', padding: '8px' }}> {"HTML, CSS"} </td>
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