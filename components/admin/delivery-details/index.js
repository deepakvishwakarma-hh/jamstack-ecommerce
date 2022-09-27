import React, { useState } from 'react'
import { firestore } from "../../../firebase"
import { getDocs, collection } from 'firebase/firestore'
import Delivery from './delivery'
import Router from 'next/router'

const DeliveryDetails = () => {

    const [deliveries, setDeliveries] = useState({
        // order cancel by the user
        cancelled: [],
        // prepaid by user : [authentic]
        prepaid: [],
        // all delivery includeds prepaid , cancelled, perfact
        all: [],
        // which is avialable in prepaid or not in cancelled delivery
        perfact: []
    })


    console.log(deliveries)


    const [inputValues, setInputValues] = useState({
        search: '',
        select: 'all'
    })


    function onChangeHandler(event) {
        setInputValues((prev) => {
            return { ...prev, [event.target.name]: event.target.value }
        })
    }


    function onSearchHandler() {
        Router.push(`/admin#${inputValues.search}`)
    }



    // we need to upgrade code 

    React.useEffect(() => {
        async function getDeliveries() {

            const delivatyQuerySnapshot = await getDocs(collection(firestore, "delivery"));
            const cancelledQuerySnapshot = await getDocs(collection(firestore, "cancelled-delivery"));
            const razorQuerySnapshot = await getDocs(collection(firestore, "razor-payments"));

            delivatyQuerySnapshot.forEach((doc) => {
                setDeliveries(prev => {
                    return { ...prev, all: [...prev.all, doc.id] }
                })
            });
            cancelledQuerySnapshot.forEach((doc) => {
                setDeliveries(prev => {
                    return { ...prev, cancelled: [...prev.cancelled, doc.id] }
                })
            });

            razorQuerySnapshot.forEach((doc) => {
                // collection > doc > payload > payment > entity > entity.description
                const response = doc.data()
                const deliveryId = response.payload.payment.entity.description
                setDeliveries(prev => {
                    return { ...prev, prepaid: [...prev.prepaid, deliveryId] }
                })
            });




        }

        getDeliveries()

    }, [])


    return (
        <div>
            <div className='flex py-2'>
                <div className='bg-purple-100 flex-1 rounded mx-1 flex overflow-hidden justify-between' >

                    <input list="list" onChange={onChangeHandler} name="search" type="number" className='h-full bg-transparent  px-2 flex-1' placeholder="Search by id"></input>

                    <datalist id="list">
                        {[...new Set(deliveries[inputValues.select])].map((id, index) => {
                            return (
                                <option key={id} value={id} />
                            )
                        })}
                    </datalist>

                    <button onClick={onSearchHandler} className='px-5 bg-purple-300'>Search</button>


                </div>

                <select onChange={onChangeHandler} name="select" defaultValue={'all'} className="flex-1 bg-blue-100 p-2  rounded mx-1">
                    <option value="all">all</option>
                    <option value="cancelled">cancelled</option>
                    <option value="prepaid">prepaid</option>
                    <option value="perfact">perfact</option>
                </select>
            </div>

            <div>

                {[...new Set(deliveries[inputValues.select])].map((id, index) => {
                    return (
                        <Delivery key={index} id={id} />
                    )
                })}

            </div>




        </div>
    )
}


export default DeliveryDetails


// collectino > doc > payload > payment > entity > entity.description