import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "../../../database/conn";
import Users from "../../../model/Schema";
import {compare} from "bcryptjs"
export default NextAuth({
    providers:[
        CredentialsProvider({
            name:"Credentials",
            async authorize(credentials,req){
                connectMongo().catch(error=>{error:"Connection Failed....!"})
                const result=await Users.findOne({email:credentials.email})
                if(!result){
                    throw new Error("Please Sign Up");
                }
                const checkPassword=await compare(credentials.password, result.password);
                if(!checkPassword || result.email!==credentials.email){
                    throw new Error("Username or Password doesn't match");
                }
                return result;
            }
        })
    ],
    secret:"XH^bp/TkLvnUkQiPDEZNyHcOCV+VV5RL/n+HdVHoHNo="
})