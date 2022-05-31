// Use rfc for emmet abbreviation 
import React from 'react'

/*
  Again, {children} always us to reuse this component by passing in what we want the button to say
  {...props} always for whatever att is being used on the button to be passed in through here
  {style}
*/


export default function Error({children, style, ...props}) {
  // This is the style dictionary that we have created for the error prompt
    const styles={
        error:{
            color:"red"
        }
    }

  return (
    // {{...styles.error, ...style}} -> this is creating a new style diction {...styles.error} and then also the dictionary that is being passed in from somebody using our error component
    <div style={{...styles.error, ...style}} {...props}>{children}</div>
  )
};
