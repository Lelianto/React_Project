import React from 'react';
import '../styles/bootstrap.min.css';
import '../styles/allBooks.css';
import '../styles/loading.css'
import { withRouter } from 'react-router-dom'
import { connect } from 'unistore/react'
import { store, actions } from '../store'
import axios from 'axios'


class DisplayOwnBook extends React.Component {
    // Function to go to book detail information
    goToBook = async (book) => {
        store.setState({ 
            bookId: book.id 
        })
        this.props.history.push("/bookdetail/"+store.getState().bookId);
        }
    // Function to get all book which user has
    componentDidMount = () => {
        const req = {
        method: "get",
        url: store.getState().baseUrl+"/book/mine",
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token')
        }
        }; 
        const self = this
        axios(req)
            .then(function (response) {
                store.setState({ bookOwn: response.data, isLoading:false})
                return response
            })
            .catch((error)=>{
                store.setState({ isLoading: false})
                switch (error.response.status) {
                    case 401 :
                        self.props.history.push('/login')
                        break
                    case 403 :
                        self.props.history.push('/403')
                        break
                    case 404 :
                        self.props.history.push('/404')
                        break
                    case 500 :
                        self.props.history.push('/500')
                        break
                    default :
                        break
                }
            })
    };

    render() {
        const { bookOwn } = this.props
        const displayAvailableBooks = bookOwn.filter(item => {
            if (item.foto_buku !== null && item.judul !== null && item.penulis !== null && item.harga !== null && item.berat !== null) {
                return item;
            }
            return false
        });
        if(this.props.isLoading){
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
        return (
            <div className='container' style={{paddingTop:'30px'}}>
                <div className='row'>
                    <div className='col-md-12'>
                        <h3 style={{textAlign:'left', paddingLeft:'0px'}} className='col-md-12 border-user1'>
                            Buku Milikmu
                        </h3>
                    </div>
                    {displayAvailableBooks.map((book,i) =>
                        <div className='col-md-6 col-sm-12'>
                            <div className='row box-all-books'>
                                <div className='col-md-12 col-sm-12 box-all-books-photo'>
                                    <img style={{ width:'100%'}} src={book.foto_buku} alt=""/>
                                </div>
                                <div className='col-md-12 col-sm-12 box-all-books-title' onClick={event => this.goToBook(book)}>{book.judul}</div>
                                <div className='col-md-12 col-sm-12 box-all-books-writer'>{book.penulis}</div>
                                <div className='col-md-12 col-sm-12 box-all-books-price'>Rp {book.harga}</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default connect("bookOwn, books, bookId, token, isLoading",actions)(withRouter(DisplayOwnBook));