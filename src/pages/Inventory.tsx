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
                <footer>
                    <div className="setHome">
                        <button /*onClick={home}*/>HOME</button>
                    </div>
                    <div className="setBtn">
                        <button /*onClick={items}*/>ITEM</button>
                        <button /*onClick={collection}*/>COLLECT</button>
                    </div>
                </footer>
            </body>
        </>
    );
}

export default Inventory
