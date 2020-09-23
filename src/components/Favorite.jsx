import axios from 'axios';
import React, { Fragment, useContext, useState } from 'react'
import { firebaseAuth } from '../provider/AuthProvider';

const Favorite = ({poem}) => {
  const {user} = useContext(firebaseAuth);
  const [isFav, setFav] = useState(false);
  
  const toggleFav = async () => {
    const token = await user.getIdToken(true);
    if (!isFav) {
      const res = await axios.patch(`https://poemasmaker.firebaseio.com/users/${user.uid}/favorites.json?auth=${token}`, {
        [poem.id]: {
          title: poem.title,
          createdAt: {'.sv': 'timestamp'}
        }
      });
      if (res.status === 200) {
        setFav(true);
      }
    } else {
      const res = await axios.delete(`https://poemasmaker.firebaseio.com/users/${user.uid}/favorites/${poem.id}.json?auth=${token}`);
      if (res.status === 200) {
        setFav(false);
      }
    }
  }
  return ( 
    <Fragment>
      {
        isFav ? <span className="jam jam-heart-f fav-icon" onClick={toggleFav}></span>
        : <span className="jam jam-heart fav-icon" onClick={toggleFav}></span>
      }
    </Fragment>
   );
}
 
export default Favorite;