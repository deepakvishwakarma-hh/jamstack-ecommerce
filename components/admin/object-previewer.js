const ObjectPreviewer = ({ object }) => {

    if (!object) {
        return <span className="p-1 font-mono bg-red-100 block text-red-800"> <b>typeError</b> : This type is not suitable for ObjectPreviewer</span>
    }

    const keys = Object.keys(object) // as arrey

    return (
        <div className=' flex flex-col'>

            {keys.map((key) => {
                return (
                    <div key={key} className="flex lsd p-1"  >
                        <span className='font-medium capitalize flex-1 font-mono text-sm pl-2'>{key} →</span>
                        {typeof object[key] === "object"
                            ? <ObjectPreviewer object={object[key]} />
                            : key.includes('url') ? <a rel="noreferrer" target={"_blank"} href={object[key]} className="flex-1 text-blue-500 break-words overflow-x-auto">{object[key]}</a> : <span className='flex-1 overflow-x-auto'>{object[key]}</span>}
                    </div>
                )
            })}

        </div>
    )
}


export default ObjectPreviewer