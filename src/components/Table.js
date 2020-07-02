import React from 'react';

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
    const rows = props.secretKeys.map((row) => {
        return (
            <tr key={row[0]}>
                <td>{row[1]}</td>
                <td>{row[2]}</td>
                <td>{row[3].date}</td>
                <td>{row[4]}</td>
            </tr>
        )
            })
    return <tbody>{rows}</tbody>
}

const Table = (props) => { // functional component version
    return (
        <div>
            <h2>Existing Secret Keys</h2>
            <table>
                <TableHeader />
                <TableBody secretKeys={ props.secretKeys }/>
            </table>
        </div>
    )
}

export default Table