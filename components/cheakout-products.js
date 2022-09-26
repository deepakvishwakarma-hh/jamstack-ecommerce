import Image from "next/image"
const Product = ({ item }) => (
    <div>
        <div className="border-b py-2">
            <div className=" items-center flex">
                <div className=" h-14 w-14 relative">
                    <Image src={item.image} loader={() => item.image} alt={item.name} layout="fill" />
                </div>
                <p className="m-0 pl-10 text-gray-600">{item.name}</p>
                <div className="flex flex-1 justify-end">
                    <p className="m-0 pl-10 text-gray-900 tracking-wider">
                        {"₹" + item.price} * {item.quantity}
                    </p>
                </div>
            </div>
        </div>
    </div>
)

export default Product