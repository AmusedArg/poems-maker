import axios from 'axios';
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { firebaseAuth } from '../provider/AuthProvider';

const Favorite = ({poem}) => {
  const {user} = useContext(firebaseAuth);
  const [isFav, setFav] = useState(false);

  useEffect(() => {
    const getFavs = async () => {
      const token = await user.getIdToken(true);
      const res = await axios.get(`https://poemasmaker.firebaseio.com/users/${user.uid}/favorites/${poem.id}.json?auth=${token}`);
      setFav(res.data !== null);
    };
    getFavs();
  }, [user, poem.id]);
  
  const toggleFav = async () => {
    setFav(!isFav);
    const token = await user.getIdToken(true);
    if (!isFav) {
      try {
        await axios.patch(`https://poemasmaker.firebaseio.com/users/${user.uid}/favorites.json?auth=${token}`, {
          [poem.id]: {
            title: poem.title,
            createdAt: {'.sv': 'timestamp'}
          }
        });
      } catch(e) {
        setFav(false);
      }
    } else {
      const res = await axios.delete(`https://poemasmaker.firebaseio.com/users/${user.uid}/favorites/${poem.id}.json?auth=${token}`);
      if (res.status !== 200) {
        setFav(true);
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