import React from 'react'

const states = [
  "Choose State",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttarakhand",
  "Uttar Pradesh",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Lakshadweep",
  "Puducherry"]



const initialState = {
  name: '', mobile: '', pincode: '', minAddress: '', maxAdress: '', landmark: '', place: '',
  state: ''
}

class AddInventory extends React.Component {

  clearForm = () => {
    this.props.setAddress(() => (initialState))
  }
  onChange = (e) => {
    this.props.setAddress({ ...this.props.address, [e.target.name]: e.target.value })
  }

  addItem = async () => {
    const { name, mobile, pincode, minAddress, maxAdress, landmark, place } = this.props.address
    if (!name || !mobile || !pincode || !minAddress || !maxAdress || !landmark || !place) return
    this.clearForm()
  }
  render() {

    console.log(this.props.address)


    const {
      name, mobile, pincode, minAddress, maxAdress, landmark, place, state
    } = this.props.address
    return (
      <div>
        <h3 className="text-3xl p-3">Delivery Address</h3>
        <div className="flex flex-1 justify-center">
          <div className="w-full max-w-144">
            <form className="bg-white shadow-xs rounded px-8 pt-6 pb-8 mb-4">
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
                  value={minAddress} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="minAddress" placeholder="minAddress" name="minAddress" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maxAdress">
                  Area, Street, Sector, Village
                </label>
                <input
                  onChange={this.onChange}
                  value={maxAdress} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="maxAdress" placeholder="maxAdress" name="maxAdress" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="landmark">
                  Landmark
                </label>
                <input
                  onChange={this.onChange}
                  value={landmark} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="Ex : near golden temple" placeholder="landmark" name="landmark" />
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

              <div className="flex items-center justify-between mt-4">
                <a onClick={this.clearForm} className="inline-block align-baseline font-bold text-sm" href="#">
                  Clear Form
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default AddInventory