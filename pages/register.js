import Head from "next/head";
import Layout from '../layout/layout';
import Link from 'next/link';
import styles from '../styles/Form.module.css';
import { HiEyeOff, HiEye } from "react-icons/hi";
import { useFormik } from "formik";
import {register_validate} from "../lib/validate";
import { useState } from "react";
import { useRouter } from "next/router";
export default function Register() {
    const [show,setShow] = useState({password:false,cpassword:false})
    const router=useRouter()
    const formik = useFormik({
        initialValues:{
            email:'',
            username:'',
            password:'',
            cpassword:''
        },
        validate:register_validate,
        onSubmit
    })
    async function onSubmit(values){
        console.log(values)
        const option={
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(values)
        }
        await fetch('http://localhost:3000/api/auth/signup',options)
        .then(res=>res.json())
        .then((data)=>{
            if(data.ok) router.push("http://localhost:3000")
        })
    }
    const toggle = () => {
        setShow(!show);
    }
    return (
        <Layout>
            <Head>
                <title>Register</title>
            </Head>

            <section className="w-3/4 flex flex-col gap-10">
                <div className="title">
                    <h1 className="text-4xl">Welcome !</h1>
                    <h1 className="text-4xl font-bold py-4 pt-9">Sign up to</h1>
                    <p className="w-3/4">Lorem Ipsum is simply</p>
                </div>
                <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
                    <div className={styles.input_group}>
                        <label>Email</label><br />
                        <input type="email" name="email" placeholder="Enter your email" className="border-2 border-black rounded-md w-full h-12 px-6" {...formik.getFieldProps('email')}/>
                        {formik.errors.password && formik.touched.password ? <span>{formik.errors.email}</span>:<></>}

                    </div>
                    <div className={styles.input_group}>
                        <label>User name</label><br />
                        <input type="text" name="username" placeholder="Enter your user name" className="border-2 border-black rounded-md w-full h-12 px-6" {...formik.getFieldProps('username')}/>
                        {/* {formik.errors.username && formik.touched.username ? <span>{formik.errors.username}</span>:<></>} */}

                    </div>
                    <div className="relative">
                        <div className={styles.input_group}>
                            <label>Password</label><br />
                            <input type={(show===false)?'text':'password'} name="password" placeholder="Enter your Password" className="border-2 border-black rounded-md w-full h-12 px-6" {...formik.getFieldProps('password')}/>
                        </div>
                        <div className="icon flex justify-between items-center px-4 absolute top-9 right-1">
                        {
                            (show===false)?<HiEye size={25} onClick={toggle} />:<HiEyeOff size={25} onClick={toggle}/>
                         }
                        </div>
                        {formik.errors.password && formik.touched.password ? <span>{formik.errors.password}</span>:<></>}

                    </div>
                    <div className="relative">
                        <div className={styles.input_group}>
                            <label>Confirm Password</label><br />
                            <input type={(show===false)?'text':'password'} name="cpassword" placeholder="Confirm your password" className="border-2 border-black rounded-md w-full h-12 px-6 " {...formik.getFieldProps('cpassword')}/>
                        </div>
                        <div className="icon flex justify-between items-center px-4 absolute top-9 right-1">
                            {
                            (show===false)?<HiEye size={25} onClick={toggle} />:<HiEyeOff size={25} onClick={toggle}/>
                            }
                            
                        </div>
                        {formik.errors.cpassword && formik.touched.cpassword ? <span>{formik.errors.cpassword}</span>:<></>}
                    </div>

                    <div>
                        <button type="submit" className="input-button w-full bg-black rounded-md h-12 text-gray-50 text-lg text-center py-3">Register</button>
                    </div>
                </form>
                <p className="text-gray-400 text-center">Already have an Account ?<Link legacyBehavior href={'/login'}><a className="text-black font-bold">  Login</a></Link></p>
            </section>
        </Layout>
    )
}