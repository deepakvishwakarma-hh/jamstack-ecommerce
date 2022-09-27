const Order = ({ children }) => {

    const { status, id, address, products } = children




    const styleBasedUponStatus = {
        color: status == 'paid' ? "green" : status == 'cancelled' ? "red" : "blue",
    }


    return (
        <div className="px-2 grid grid-cols-5 gap-2 py-2 ">
            <h3>{products.length}</h3>
            <h3>{new Date(id).toLocaleDateString()}</h3>
            <h3 className="font-bold  capitalize" style={styleBasedUponStatus}>{status}</h3>
            <h3>{id}</h3>
            <h3>{address.place}</h3>
        </div>
    )
}

export default Order