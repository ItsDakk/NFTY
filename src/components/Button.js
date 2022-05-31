import React from 'react'
// Have to import from MUI, since it's a default export (meaning it's missing {} around it ) we can import it in and rename it what we want
import MUIButton from '@mui/material/Button';

/* 
  This is going to export this button function outside of this Button file. So we can import Button into another file 
  {children} - Has to be called {children} this will pass through whatever is inside the element.
  {...props} means that it will take over any left-over of our object that we did not pull out
*/

export default function Button({children, variant, ...props}) {

  return (
    // the 'variant' attribute allows for us to pass in MUI properties to our button
    // "variant={variant ?? }" means that if there is no default variant value set, then inherit the default value, which in this example is contained
    // The ...props is being passed in from the Button on the app page, and being rendered through here

    <MUIButton variant={variant ?? "contained"} {...props}>{children}</MUIButton>
  )
}


