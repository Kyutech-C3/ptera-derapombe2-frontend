import React, { useState } from "react"
import ReactDOM from "react-dom";
import './inventory.css'



function Inventory() {
    return (
        <>
            <body>
                <header>ITEM</header>
                <article className="subBack">
                    <section className="setContents">
                        <p>A</p>
                        <p>B</p>
                        <p>C</p>
                    </section>
                    <section className="setContents">
                        <p>A</p>
                        <p>B</p>
                        <p>C</p>
                    </section>
                    <section className="setContents">
                        <p>A</p>
                        <p>B</p>
                        <p>C</p>
                    </section>
                    <section className="setContents">
                        <p>A</p>
                        <p>B</p>
                        <p>C</p>
                    </section>
                </article>
                <div className="setHome">
                    <button /*onClick={home}*/><img src="../assets/Home_icon.png" alt="button" height="40"/></button>
                </div>
                <footer>
                    <div className="setBtn">
                        <button /*onClick={items}*/ className="itemBox"><img src="../assets/itemBox_icon.svg" alt="button" height="35" /></button>
                        <button /*onClick={collection}*/><img src="../assets/collect_icon.png" alt="button" height="55" /></button>
                    </div>
                </footer>
            </body>
        </>
    );
}

export default Inventory
