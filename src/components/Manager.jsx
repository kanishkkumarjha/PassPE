import React, { useRef, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, []);

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    };

    const showPassword = () => {
        passwordRef.current.type = "text"
        console.log(ref.current.src)
        if (ref.current.src.includes('icons/eyecross.png')) {
            ref.current.src = 'icons/eye.png'
            passwordRef.current.type = 'password'
        } 
        else {
            passwordRef.current.type = "text"
            ref.current.src = 'icons/eyecross.png'
        }
    }

    const savePassword = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]));
            console.log([...passwordArray, form])
            setForm({ site: "", username: "", password: "" });
            toast('Password saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            })
        } 
        else {
            toast('Error: Password not saved!') 
        } 
    }

    const deletePassword = (id) => {
        console.log("Deleting password with id", id)
        let c = confirm("Are you sure you want to delete password?")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            toast('Password Deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'dark',
                progress: undefined
            });
        }
    }

    const updatePassword = (id) => {
        console.log("Editing password with id", id)
        setForm(passwordArray.filter(i => i.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light'
                transition="Bounce" />
            <ToastContainer />

            <div className="absolute top-0 z-[-2] h-screen w-screen bg-slate-100 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
            <div className="p-2 pt-3 md:p-0 md:mycontainer min-h-[89vh]">
                <h1 className="text-4xl text font-bold text-center">
                    <span>Pass</span>
                    <span className="text-slate-600">PE</span>
                </h1>
                <p className="text-black text-lg text-center">Manage with PassPE</p>

                <div className="flex flex-col p-4 text-black gap-8 items-center">
                    <input value={form.site} onChange={handleChange} placeholder='Website' className='rounded-full border border-blue-900 w-full p-4 py-1' type="text" name="site" id='site' />

                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                        <input value={form.username} onChange={handleChange} placeholder='Username' className='rounded-full border border-blue-900 w-full p-4 py-1' type="text" name="username" id='username' />

                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Password' className='rounded-full border border-blue-900 w-full p-4 py-1' type="password" name="password" id='password' />

                            <span className="absolute right-[1px] top-1 cursor-pointer" onClick={showPassword}>
                                <img ref={ref} className='p-1' width={25} src="icons/eye.png" alt="icons/eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className="text-black flex justify-center items-center gap-2 bg-slate-500 hover:bg-slate-700 rounded-full px-4 py-2 w-fit border border-blue-900">
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Save Password
                    </button>
                </div>
                <div className="passwords">
                    <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
                    {passwordArray.length === 0 && <div> No passwords to show </div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md 
                    overflow-hidden mb-10">
                            <thead className="bg-blue-900 text-white">
                                <tr>
                                    <th className="py-2">Site</th>
                                    <th className="py-2">Username</th>
                                    <th className="py-2">Password</th>
                                    <th className="py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-slate-300">
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className="py-2 border border-white text-center w-1/4 p-2">
                                            <div className="flex items-center justify-center">
                                                <a href={item.site} target='_blank'>{item.site}</a>
                                                <div className='size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                    <img
                                                        style={{ "width": "20px", "height": "20px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="icons/copy.svg"
                                                        alt="Copy"
                                                        width={20}
                                                        trigger='hover' />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-2 border border-white text-center w-1/4 p-2">
                                            <div className="flex items-center justify-center">
                                                <span>{item.username}</span>
                                                <div className="size-7 cursor-pointer flex items-center justify-center gap-2" onClick={() => { copyText(item.username) }}>
                                                    <img
                                                        style={{ "width": "20px", "height": "20px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="icons/copy.svg"
                                                        alt="Copy"
                                                        width={20}
                                                        trigger='hover' />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-2 border border-white text-center w-1/4 p-2">
                                            <div className="flex items-center justify-center">
                                                <span>{item.password}</span>
                                                <div className="size-7 cursor-pointer flex items-center justify-center gap-2" onClick={() => { copyText(item.password) }}>
                                                    <img
                                                        style={{ "width": "20px", "height": "20px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="icons/copy.svg"
                                                        alt="Copy"
                                                        width={20}
                                                        trigger='hover' />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-2 border border-white text-center w-1/4 ">
                                            <div className="flex justify-center items-center space-x-2 ">
                                                <span className="cursor-pointer flex items-center" onClick={() => { updatePassword(item.id) }}>
                                                    <img
                                                        style={{ width: "20px", height: "20px" }}
                                                        src="icons/edit-button.png"
                                                        alt="Edit"
                                                        width={20}
                                                    />
                                                </span>
                                                <span className="cursor-pointer flex items-center w-6" onClick={() => { deletePassword(item.id) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/wpyrrmcq.json"
                                                        trigger="hover"
                                                    ></lord-icon>
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    );
};

export default Manager;
