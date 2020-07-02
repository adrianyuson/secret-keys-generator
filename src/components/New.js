import React from 'react';
import '../App.css';

const TableHeader = () => {
    return (
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Expiry Timestamp</th>
          <th>Secret</th>
        </tr>
      </thead>
    )
}

const TableBody = (props) => {
    const { secretKey } = props;
    return (
        <tbody>
            <tr>
                <td>{secretKey[0]}</td>
                <td>{secretKey[1]}</td>
                {   secretKey[2].date != null
                    ?    <td>{secretKey[2].date}</td>
                    :    <td>---</td>
                }
                <td>{secretKey[3]}</td>
            </tr>
        </tbody>
    )
}

const New = (props) => {
    return (
        <div>
            <h2>Generated Secret Key Information</h2>
            <table>
                <TableHeader />
                <TableBody secretKey={ props.secretKey }/>
            </table>
        </div>
    )
}

export default New