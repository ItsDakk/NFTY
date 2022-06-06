import React, { useEffect } from 'react'

// The first

export default function useEffectNotes() {

    const [counter, setCounter] = useState(true)

    /* 
        *useEffect*
        1st arguement:
            The first arguemnet to a useEffect hook is a function and this function will run
            This function can return something and can return another function which is called the cleanup-stage
        2nd arguement:
            The second argument is the dependency Array

    */
    useEffect(
        () => {
            console.log('I am running in the body of the function')

            return () => {
                console.log('I am in the return of the function')
            }   
        },
        [counter]


    )

    return (
        <button onClick={() => {setCounter(counter + 1)}}>Click Me</button>
  )
}
