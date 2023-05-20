import { useState } from 'react'
import './App.css'

const url = "http://localhost:3000"

const ambilData = async () => {
    const fetching = await fetch(url);
    const data = await fetching.json();
    console.log("ambilData", data)
    return data;
}

const tambahData = async (param) => {
    const fetching = await fetch(url + "/tambah", {
        method: "POST",
        body: JSON.stringify({ catalog: param }),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    });
    const data = await fetching.json();
    console.log("tambahData", data, param)
    return data;
}
const dummyData = [{
    id: 1,
    harga: 1000,
    nama: "test",
    gambar: "https://picsum.photos/id/85/367/267"
}, {
    id: 2,
    harga: 2000,
    nama: "test 2",
    gambar: "https://picsum.photos/id/84/367/267"
}]

const duplicateDummy = [...dummyData, ...dummyData, ...dummyData, ...dummyData];

function App() {
    return (

        <div style={{
            width: "100%",
        }}>
            <h1 style={{
                backgroundColor: "orange"
            }}>Products ({duplicateDummy.length})</h1>
            <div style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
            }}>
                {duplicateDummy.map((data, index) => {
                    return (
                        <div style={{
                            padding: "1em",
                        }}>
                            <div className='ProductList'>
                                <img style={{
                                    width: "12em",
                                    height: "14em",
                                }} src={data.gambar} alt="" srcset="" />
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    width: "100%",
                                    backgroundColor: "white"
                                }}>
                                    <h3>{data.nama}</h3>
                                    <h3 style={{
                                        color: "green"
                                    }}>{data.harga}</h3>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}

export default App
