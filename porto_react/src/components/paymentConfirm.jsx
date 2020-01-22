import React from 'react';
import '../styles/bootstrap.min.css';
import '../styles/paymentConfirm.css';
import '../styles/loading.css';
import { withRouter, Link, Redirect } from 'react-router-dom'
import { connect } from 'unistore/react'
import { actions } from '../store'
import foto from '../images/fotobank.jpg'

const PaymentConfirm =(props)=>{
    const { orderCode, orderDate, totalPayment, isLoading } = props
    if(isLoading){
        return (
        <div>
            <body style={{paddingTop:'200px'}}>
            <div className='container'>
            <div className='row'>
                <div className='col-md-5'>
                </div>
                <div className='col-md-2'>
                <div class="loader"></div>
                </div>
                <div className='col-md-5'>
                </div>
            </div>
            
            </div>
        </body>
        </div>
        )
        }
    if (localStorage.getItem('token') == null){
        return <Redirect to={{ pathname: "/login" }} />;
    } else {
        return (
            <div>
                <div className='container user-full-name1 container-user'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <h6 className='border-user'>Informasi Pemesanan</h6>
                        </div>
                        <div className='col-md-6'>
                            <Link style={{textDecoration:'none', color:'teal', fontWeight:'bold', fontSize:'15px', padding:'20px'}} to='/'>Back to Home</Link> 
                        </div>
                    </div>
                </div>
                <div className='container alamat-email container-user'>
                    <div className='row'>
                        <div className='col-md-6' style={{marginTop:'10px', fontWeight:'bold'}}>
                            Kode Pemesanan
                        </div>
                        <div className='col-md-6' style={{marginTop:'10px'}}>
                            {orderCode}
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6' style={{marginTop:'30px', fontWeight:'bold'}}>
                            Tanggal Pemesanan
                        </div>
                        <div className='col-md-6' style={{marginTop:'30px'}}>
                            {orderDate}
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6' style={{marginTop:'30px', fontWeight:'bold'}}>
                            Total Pembayaran
                        </div>
                        <div className='col-md-6' style={{marginTop:'30px'}}>
                            Rp. {totalPayment}
                        </div>
                    </div>
                    <div className='row' style={{marginTop:'30px'}}>
                        <img style={{width:'100%'}} src={foto}></img>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect("orderCode, orderDate, totalPayment, isLoading",actions)(withRouter(PaymentConfirm));