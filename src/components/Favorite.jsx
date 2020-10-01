import axios from 'axios';
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { firebaseAuth } from '../provider/AuthProvider';
import { userConfigAddFavPoemAction, userConfigDeleteFavPoemAction } from '../redux/userConfigDucks';

const Favorite = ({poem}) => {
  const dispatch = useDispatch();
  const {user, token} = useContext(firebaseAuth);
  const [isFav, setFav] = useState(false);
  const userConfig = useSelector(state => state.userConfig.data);

  useEffect(() => {
    if (userConfig && userConfig.favorites) {
      for (const fav of  Object.entries(userConfig.favorites.poems)) {
        const poemId = fav[0];
        if (poem.id === poemId) {
          setFav(true);
        }
      }
    }
  }, [poem.id, userConfig]);
  
  const toggleFav = async () => {
    setFav(!isFav);
    if (!isFav) {
      try {
        const res = await axios.patch(`https://poemasmaker.firebaseio.com/users/${user.uid}/favorites/poems.json?auth=${token}`, {
          [poem.id]: {
            title: poem.title,
            createdAt: {'.sv': 'timestamp'}
          }
        });
        dispatch(userConfigAddFavPoemAction(poem.id, res.data[poem.id]))
      } catch(e) {
        setFav(false);
      }
    } else {
      const res = await axios.delete(`https://poemasmaker.firebaseio.com/users/${user.uid}/favorites/poems/${poem.id}.json?auth=${token}`);
      if (res.status !== 200) {
        setFav(true);
      } else {
        dispatch(userConfigDeleteFavPoemAction(poem.id))
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