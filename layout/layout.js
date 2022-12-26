import styles from "../styles/Layout.module.css"
export default function Layout({children}){
    return(
        <div className="flex h-screen bg-white-400">
            <div className="m-auto rounded-md w-3/5 h-3/4 grid lg:grid-cols-2">
                <div className="right flex flex-col justify-evenly border-2 rounded-md  shadow md:shadow-lg">
                    <div className="pl-10 py-10">
                        {children}
                    </div>
                </div>
                <div className={styles.imgStyle}>
                    <div className={styles.cartoonimg}></div>
                </div>
            </div>
        </div>
    )
}