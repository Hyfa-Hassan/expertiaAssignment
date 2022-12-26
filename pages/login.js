import Head from "next/head";
import Layout from "../layout/layout";
import Link from 'next/link';
import styles from '../styles/Form.module.css';
import { HiEyeOff, HiEye } from "react-icons/hi";
import { useState } from "react";
import {signin, signOut} from "next-auth/react";
import { useFormik } from "formik";
import login_validate from "../lib/validate";
import { Router, useRouter } from "next/router";
export default function Login() {
    const [show, setShow] = useState({ password: false, cpassword: false })
    const router=useRouter()
    const formik = useFormik({
        initialValues:{
            username:'',
            password:''
        },
        validate:login_validate,
        onSubmit
    })
    async function onSubmit(values){
        const status = await signin("credentials",{
            redirect:false,
            username:values.username,
            password:values.password,
            callbackUrl:"/"
        })
        if(status.ok) router.push(status.url)
        console.log(status);
    }
    const toggle = () => {
        setShow(!show);
    }
    return (
        <Layout>
            <Head>
                <title>Login</title>
            </Head>
            <section className="w-3/4 flex flex-col gap-10">
                <div className="title">
                    <h1 className="text-4xl">Welcome !</h1>
                    <h1 className="text-4xl font-bold py-4 pt-9">Sign in to</h1>
                    <p className="w-3/4">Lorem Ipsum is simply</p>
                </div>
                <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
                    <div className={styles.input_group}>
                        <label>User name</label><br />
                        <input type="text" name="username" placeholder="Enter your username" className="border-2 border-black rounded-md w-full h-12 px-6" {...formik.getFieldProps('username')}/>
                    </div>
                    <div className="relative">
                        <div className={styles.input_group}>
                            <label>Password</label><br />
                            <input type={(show === false) ? 'text' : 'password'} name="password" placeholder="Enter your password" className="border-2 border-black rounded-md w-full h-12 px-6 " {...formik.getFieldProps('password')}/>
                        </div>
                        <div className="icon flex justify-between items-center px-4 absolute top-9 right-1">
                            {
                                (show === false) ? <HiEye size={25} onClick={toggle} /> : <HiEyeOff size={25} onClick={toggle} />
                            }

                        </div>
                        {formik.errors.password && formik.touched.password ? <span>{formik.errors.password}</span>:<></>}
                    </div>
                    <div className="flex justify-between">
                        <label className="block font-bold my-4">
                            <input type="checkbox" className="leading-loose text-pink-600" />
                            <span className="py-2 text-sm text-gray-600 leading-snug"> Remember Me </span>
                        </label>
                        <label className="block text-gray-500 font-bold my-4">
                            <a href="#" className="cursor-pointer tracking-tighter text-gray-600">
                                <span>Forgot Password ?</span>
                            </a>
                        </label>
                    </div>

                    <div>
                        <button type="submit" className="input-button w-full bg-black rounded-md h-12 text-gray-50 text-lg text-center py-3">Login</button>
                    </div>
                </form>
                <p className="text-gray-400 text-center">Don't have an Account?<Link legacyBehavior href={'/register'}><a className="text-black font-bold"> Register</a></Link></p>
            </section>
        </Layout>
    )
}