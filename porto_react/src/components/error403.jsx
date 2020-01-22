import React from 'react';
import '../styles/bootstrap.min.css';
import '../styles/style.css';
import { Link } from 'react-router-dom'

const NotFound403 = () => {
    return (
        <body>
            <div id="notfound">
                <div class="notfound">
                    <div class="notfound-404">
                        <h1>403</h1>
                        <h2 style={{fontSize:'10px'}}>Tidak mendapat akses.</h2>
                    </div>
                    <Link to="/">Kembali ke Beranda</Link>
                </div>
            </div>
        </body>
    )
}

export default NotFound403
