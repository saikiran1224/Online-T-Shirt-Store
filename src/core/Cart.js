import React, {useState, useEffect} from 'react'
import "../styles.css"
import { API } from '../backend';
import Base from './Base';
import Card from './Card';
 import { loadCart } from './helper/CartHelper';


const Cart = () => {

    const [products, setProducts] = useState([])
    const [reload, setReload] = useState(false)

    const loadAllProducts = () => {
        return (
            <div>
                <h2>This section is to load products!</h2>
                {
                    products.map((product, index) => (
                        <Card key={index} product = {product} removeFromCart={true} 
                        addtoCart={false} setReload={setReload} reload={reload} />
                    ))
                }
            </div>
        )
    }

    const loadCheckout = () => {
        return (
            <div>
                <h2>This section for checkout!</h2>
            </div>
        )
    }

    useEffect(() => {
        setProducts(loadCart())
    }, [reload])
    

  return (
    <Base title='Home Page' description='Ready to Checkout!'>
        <div className='row'>
            <h1 className="text-white">All of T shirts</h1>
            <div className="row text-center">
              <div className="col-6">
                {loadAllProducts()}
              </div>
              <div className="col-6">
                {loadCheckout()}
              </div>
            </div>
        </div>
    </Base>
  )
}

export default Cart;
