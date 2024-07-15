import { useState } from 'react';
import { FaSquarePlus } from "react-icons/fa6";
import { RxCross1, RxPencil1 } from "react-icons/rx"; // Import edit icon

export default function Home() {
  const [rows, setRows] = useState([]);
  const [inputText, setInputText] = useState("");
  const [checkedRows, setCheckedRows] = useState([]);
  const [editRowId, setEditRowId] = useState(null);

  const addRow = (text) => {
    if (rows.length < 5) {
      const newRow = { id: rows.length + 1, text: text };
      setRows([...rows, newRow]);
    }
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleAddRow = () => {
    if (inputText.trim() !== '') {
      if (editRowId !== null) {
        const updatedRows = rows.map((row) => 
          row.id === editRowId ? { ...row, text: inputText } : row
        );
        setRows(updatedRows);
        setEditRowId(null); // Reset edit state
      } else {
        // Add new row
        addRow(inputText);
      }
      setInputText('');
    }
  };

  const handleDelete = (index, e) => {
    const filteredRows = rows.filter((row) => row.id !== index);
    setRows(filteredRows);
    setCheckedRows(checkedRows.filter((id) => id !== index));
  };

  const handleCheck = (index) => {
    if (checkedRows.includes(index)) {
      setCheckedRows(checkedRows.filter((id) => id !== index));
    } else {
      setCheckedRows([...checkedRows, index]);
    }
  };

  const handleRemoveChecked = () => {
    const filteredRows = rows.filter((row) => !checkedRows.includes(row.id));
    setRows(filteredRows);
    setCheckedRows([]);
  };

  const handleEdit = (row) => {
    setInputText(row.text);
    setEditRowId(row.id);
  };

  return (
    <>
      <div className='justify-center text-center mt-20 mx-36'>
        <h1 className='font-bold text-2xl'>TO DO LIST</h1>
        
        <div className='flex justify-center'>
          <input className='border-2 w-[300px] border-cyan-600' type="text" value={inputText} onChange={handleInputChange} placeholder="What's need to be done?"
          />
          <FaSquarePlus className='h-10 w-10 rounded-none ml-2' onClick={handleAddRow} />
          
        </div>
        <h3 className='font-semibold text-2xl mt-3 text-cyan-800'>You can enter five to do tasks</h3>
        <table className='flex justify-center mt-10'>
          <div className='flex'>
            <tbody>
              {rows.map((row) => (
                <tr className='border-y-gray-400 border-2' key={row.id} style={{ width: '400px', height: '40px' }}>
                  <td style={{ width: '300px', height: '100%' }}>
                    <input type="checkbox" className='mr-8' checked={checkedRows.includes(row.id)} onChange={() => handleCheck(row.id)}
                    />
                    {row.text}
                  </td>
                  <button onClick={() => handleEdit(row)}> <RxPencil1 className='ml-2 mt-3 flex' /></button>
                  <button onClick={(e) => handleDelete(row.id, e)}><RxCross1 className='ml-2 mt-3 flex' /></button>
                </tr>
              ))}
            </tbody>
          </div>
        </table>
        <div className='flex justify-center ml-[200px]'>
          <button type='button' className='text-white text-xl bg-cyan-500 flex mt-5 mb-1  p-2' onClick={handleRemoveChecked}>
            Removed Checked<RxCross1 className='ml-4 mt-1 mb-1' />
          </button>
        </div>
      </div>
    </>
  );
}
