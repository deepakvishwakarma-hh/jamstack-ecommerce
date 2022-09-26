import React from 'react'
import { states, addressInitialState } from '../../ecommerce.config'

class Address extends React.Component {

  clearForm = () => {
    this.props.setAddress(() => (addressInitialState))
  }

  onChange = (e) => {
    this.props.setAddress({ ...this.props.address, [e.target.name]: e.target.value })
  }

  render() {
    const {
      name, mobile, pincode, minAddress, maxAdress, landmark, place } = this.props.address;
    return (
      <div className='md:flex-1'>
        <h3 className="text-3xl py-5">Delivery Address</h3>
        <div className="flex-1 ">
          <div className="w-full max-w-144">
            <form action='' className="bg-white shadow-xs rounded px-1  p5-8 mb-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Full Name
                </label>
                <input
                  onChange={this.onChange}
                  value={name} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Item name" name="name" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobile">
                  Mobile Number
                </label>
                <input
                  onChange={this.onChange}
                  value={mobile} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="mobile" type="number" placeholder="mobile" name="mobile" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pincode">
                  Pin code
                </label>
                <input
                  onChange={this.onChange} type="number"
                  value={pincode} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="pincode" placeholder="digit [0-9] PIN code" name="pincode" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="minAddress">
                  Flat, House no., Building, Company, Apartment
                </label>
                <input
                  onChange={this.onChange}
                  value={minAddress} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="minAddress" name="minAddress" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maxAdress">
                  Area, Street, Sector, Village
                </label>
                <input
                  onChange={this.onChange}
                  value={maxAdress} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="maxAdress" name="maxAdress" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="landmark">
                  Landmark
                </label>
                <input
                  onChange={this.onChange}
                  value={landmark} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="landmark" placeholder="ex. near petrol pump" name="landmark" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="place">
                  Town/city
                </label>
                <input
                  onChange={this.onChange}
                  value={place} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="place" placeholder="place" name="place" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">
                  State
                </label>

                <select name='state' onChange={this.onChange} id="state" placeholder='Choose a state' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
                  {states.map((name) => (<option key={name} value={name}>{name}</option>))}
                </select>
              </div>

              <div className="bg-gray-500 hover:bg-gray-700 text-white font-normal w-full py-2 px-4 rounded mt-5 text-sm" onClick={this.clearForm}>Clear form </div>

            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Address