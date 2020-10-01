import axios from 'axios';
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { firebaseAuth } from '../provider/AuthProvider';
import { userConfigAddFavAction, userConfigDeleteFavAction } from '../redux/userConfigDucks';

const Favorite = ({id, title, groupName}) => {
  const dispatch = useDispatch();
  const {user, token} = useContext(firebaseAuth);
  const [isFav, setFav] = useState(false);
  const userConfig = useSelector(state => state.userConfig.data);

  useEffect(() => {
    if (userConfig && userConfig.favorites && userConfig.favorites[groupName]) {
      for (const fav of  Object.entries(userConfig.favorites[groupName])) {
        const _id = fav[0];
        if (_id === id) {
          setFav(true);
        }
      }
    }
  }, [id, groupName, userConfig]);
  
  const toggleFav = async () => {
    setFav(!isFav);
    if (!isFav) {
      try {
        const res = await axios.patch(`https://poemasmaker.firebaseio.com/users/${user.uid}/favorites/${groupName}.json?auth=${token}`, {
          [id]: {
            title: title,
            createdAt: {'.sv': 'timestamp'}
          }
        });
        dispatch(userConfigAddFavAction(groupName, id, res.data[id]))
      } catch(e) {
        setFav(false);
      }
    } else {
      const res = await axios.delete(`https://poemasmaker.firebaseio.com/users/${user.uid}/favorites/${groupName}/${id}.json?auth=${token}`);
      if (res.status !== 200) {
        setFav(true);
      } else {
        dispatch(userConfigDeleteFavAction(groupName, id))
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