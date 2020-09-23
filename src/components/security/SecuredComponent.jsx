import React, { Fragment, useContext } from 'react'
import { firebaseAuth } from '../../provider/AuthProvider';

const SecuredComponent = (props) => {
  const {isUserValid} = useContext(firebaseAuth);
  
  return ( 
    <Fragment>
    {
      (isUserValid()) && props.children
    }
    </Fragment>
  )
}
 
export default SecuredComponent;