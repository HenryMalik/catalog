const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
const port = 3000;
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "catalog",
});

connection.connect();

const ErrorHandling = (err, res) => {
    res.status(500).json({
        status: "error",
        msg: err?.message,
    });
};

//!! menggunakan 2 router:
//!! - get
//!! - post

//!! 1. tampilkan semua data menggunakan "get"
//? http://localhost:3000
app.get("/", (req, res) => {
    try {
        //!! sql untuk menampilkan semua data
        const sql = "select * from catalog;";
        //!! panggil sql ke database
        //!! sql untuk memasukan query
        //!! error paramater untuk menangkap error
        //!! hasil paramater untuk menangkap hasil sql ke database
        connection.query(sql, (error, hasil) => {
            console.log("\nquery: " + sql + "\n", { error, hasil });
            //!! jika error panggil function error handling
            if (error) ErrorHandling(error, res);

            //!! sampai disini artinya success
            res.json({
                status: "success",
                data: hasil,
            });
        });
    } catch (error) {
        res.json({
            status: "failed",
            message: error.message,
        });
    }
});

//INSERT INTO `catalog` (`id`, `nama`, `harga`, `gambar`) VALUES (NULL, 'test', '20000', 'https://picsum.photos/id/237/200/300');
//!! 2. tambahkan data, menggunakan "post"
//? http://localhost:3000/tambah
app.post("/tambah", (req, res) => {
    try {
        //!! mengambil data dari request
        const { nama, harga, gambar } = req.body;
        //!! sql untuk menyimpan data
        const sql = `insert into catalog (nama, harga, gambar) values ("${nama, harga, gambar}")`;

        connection.query(sql, (error, hasil) => {
            console.log("\nquery: " + sql + "\n", { error, hasil });
            if (error) ErrorHandling(error, res);

            //!! sampai disini artinya success
            res.json({
                status: "success",
                data: hasil,
            });
        });
    } catch (error) {
        res.json({
            status: "failed",
            message: error.message,
        });
    }
});

app.listen(port, () => {
    console.log(`TODO app listening on port http://localhost:${port}`);
});
