import { useCallback, useState, useLayoutEffect, useEffect, useRef } from 'react'

const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : useEffect


function useEventListener(eventName, handler, element, options) {
    // Create a ref that stores handler
    const savedHandler = useRef(handler)

    useIsomorphicLayoutEffect(() => {
        savedHandler.current = handler
    }, [handler])

    useEffect(() => {
        // Define the listening target
        const targetElement = element?.current || window
        if (!(targetElement && targetElement.addEventListener)) {
            return
        }

        // Create event listener that calls handler function stored in ref
        const eventListener = event => savedHandler.current(event)

        targetElement.addEventListener(eventName, eventListener, options)

        // Remove event listener on cleanup
        return () => {
            targetElement.removeEventListener(eventName, eventListener)
        }
    }, [eventName, element, options])
}


function useElementSize() {
    // Mutable values like 'ref.current' aren't valid dependencies
    // because mutating them doesn't re-render the component.
    // Instead, we use a state as a ref to be reactive.
    const [ref, setRef] = useState(null)
    const [size, setSize] = useState({
        width: 0,
        height: 0,
    })

    // Prevent too many rendering using useCallback
    const handleSize = useCallback(() => {
        setSize({
            width: ref?.offsetWidth || 0,
            height: ref?.offsetHeight || 0,
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref?.offsetHeight, ref?.offsetWidth])

    useEventListener('resize', handleSize)

    useIsomorphicLayoutEffect(() => {
        handleSize()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref?.offsetHeight, ref?.offsetWidth])

    return [setRef, size]
}

export default useElementSize