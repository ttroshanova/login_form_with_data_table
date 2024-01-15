import React, { useContext } from 'react'
import UserContext from './UserContext'

const Table = () => {
    const {columnsData} = useContext(UserContext);

  return (
    <table>
        <thead>
            <tr>
            {columnsData.headers.map((header, index) => (
                <th key={index}>{header}</th>
            ))}
            </tr>
        </thead>
        <tbody>
            {columnsData.body.map((columnData, id) => (
            <tr key={id}>{Object.values(columnData).map((value, valueId) => (
                <td key={valueId}>{value}</td>
            ))}</tr>
            ))}
        </tbody>
  </table>
  )
}

export default Table