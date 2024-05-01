import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserOutlined, EyeOutlined } from '@ant-design/icons'; // Assuming EyeOutlined represents the "view" action

const Table = () => {
    const [users, setUsers] = useState([]);
    const [htmlLearners, setHtmlLearners] = useState(0);
    
    useEffect(() => {
        axios.get('http://localhost:8070/api/auth/')
        .then(users => {
            console.log(users);
            let buyers = users.data?.filter((user) => user.type == 'Buyer');
            setUsers(buyers);

            let htmlLearnersCount = buyers.filter((user) => user.type == 'HTML').length;
            setHtmlLearners(htmlLearnersCount);
        })
        .catch(err => console.log(err))
    }, [])

    return (
        <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
            <div className="w-50">
                <table className="table" style={{ borderCollapse: 'collapse', width: '100%', background: 'yellow', color: 'blue' }}>
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
                            <th style={{ border: '1px solid black', padding: '8px' }}>
                                View
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
                                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center', verticalAlign: 'middle' }}>
                                        <button onClick={() => { /* Handle button click */ }}>
                                            Track Learner
                                        </button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                <hr style={{ margin: '20px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
    <div style={{
        textAlign: 'center',
        border: '1px solid black',
        borderRadius: '5px',
        padding: '10px',
        width: '200px',
        height: '200px',
        margin: '0 10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'blue', // Set text color to white
        background: 'yellow'
    }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <p>HTML</p>
  <p>Number of HTML Learners: {htmlLearners}</p>
</div>

    </div>
    <div style={{
        textAlign: 'center',
        border: '1px solid black',
        borderRadius: '5px',
        padding: '10px',
        width: '200px',
        height: '200px',
        margin: '0 10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'blue', // Set text color to white
        background: 'yellow'
    }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <p>CSS</p>
  <p>Number of CSS Learners: {htmlLearners}</p>
</div>
    </div>
</div>



            </div>
        </div>
    );
};

export default Table;
