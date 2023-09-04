import {useRef, useEffect} from "react"
function useOnClickOutside(handler) {
    const ref = useRef()
    useEffect(function(){
        // A function that closes the modal whenever the user clicks outside of the modal.
        function handleClick(e){
        if(ref.current && !ref.current.contains(e.target))handler()
        }
        // we passed true as a 3rd argument because to prevent event propagation and only litsen to the event when it moves down to the Dom Tree.
        document.addEventListener("click", handleClick, true)
        // CleanUp function
        return () => document.removeEventListener("click", handleClick, true)
    }, [handler])

    return {ref}
}

export default useOnClickOutside
