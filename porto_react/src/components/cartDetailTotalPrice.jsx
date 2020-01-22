import React from 'react';
import '../styles/bootstrap.min.css';
import '../styles/cartDetail.css';
import '../styles/loading.css';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { connect } from 'unistore/react';
import { store, actions } from '../store';
import axios from 'axios';

class CartDetailTotalPrice extends React.Component {
  // Function to display total price inside the cart
  componentDidMount = () => {
      const req = {
          method: "get",
          url: store.getState().baseUrl+"/cart/total",
          headers: {
            Authorization: "Bearer " + localStorage.getItem('token')
          }
        };
        const self =this
        axios(req)
            .then(function(response) {
              store.setState({
                "totalPrice": response.data,
                'disable': true
              })
              return response
            })
            .catch(error => {
              store.setState({ isLoading: false})
              switch (error.response.status) {
                case 401 :
                    self.props.history.push('/401')
                    break
                case 403 :
                    self.props.history.push('/403')
                    break
                case 404 :
                    self.props.history.push('/404')
                    break
                case 422 :
                    self.props.history.push('/login')
                    break
                case 500 :
                    self.props.history.push('/500')
                    break
                default :
                    break
            }
        })
  };

  // Function for recall cart
  resetCart = () => {
    store.setState({
      bookEmptyStock:[],
      disable:true
    })
    this.props.history.push('/cart')
  }
  
  render() {
      if(store.getState().lengthCart===0){
        return <Redirect to={{ pathname: "/cart" }} />;
      }
      if(this.props.isLoading){
          return (
          <div >
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
      if(store.getState().bookEmptyStock.length>0){
        return(
          <div className='book-empty' tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                  <div class="modal-header" style={{backgroundColor:'teal', color:'white'}}>
                      <h6 class="modal-title" id="exampleModalLongTitle">Stok buku ini tidak mencukupi.</h6>
                      <button onClick={this.resetCart}  type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  {store.getState().bookEmptyStock.map((item,i)=>
                  <div class="modal-body">
                      {i+1}. {item}
                  </div>
                  )}
                  </div>
              </div>
          </div>
        )
      }
      return (
          <div>
              <div className='container top-body-cart5'>
                  <div className='col-md-12' style={{ backgroundColor: 'aliceblue', borderRadius: '5%', marginBottom:'250px' }}>
                      <div className='row' style={{ paddingTop:'25px', paddingLeft: '23px', paddingRight: '23px'}} >
                          <div className='col-md-6'>Subtotal</div>
                          <div className='col-md-6'>Rp {this.props.totalPrice}</div>
                      </div>
                      <div className='row'>
                          <div className='col-md-12' style={{ paddingTop:'55px', marginBottom: '25px'}}>
                              <label><Link to='/expedition'>
                                  <button type="button" class="btn btn-success" disabled={this.props.disable}>Lanjutkan Pembelian</button></Link>
                              </label>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      )
  }
}

export default connect("carts, totalPrice, token, isLoading, disable",actions)(withRouter(CartDetailTotalPrice));