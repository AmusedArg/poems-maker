import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import SecuredComponent from '../components/security/SecuredComponent';
import { firebaseAuth } from '../provider/AuthProvider';

const ProfilePage = () => {
  const { user } = useContext(firebaseAuth);
  const picture = user.photoURL || null;
  const [userData, setUserData] = useState({});

  const updateFavorites = (res) => {
    res.data.favorites = Object.entries(res.data.favorites);
    setUserData(res.data);
  }
  
  useEffect(() => {
    const userInfo = async () => {
      const token = await user.getIdToken(true);
      const res = await axios.get(`https://poemasmaker.firebaseio.com/users/${user.uid}.json?auth=${token}`);
      updateFavorites(res);
    };
    userInfo();
  }, [user]);  
  
  const removeFav = async (poemId) => {
    const token = await user.getIdToken(true);
    await axios.delete(`https://poemasmaker.firebaseio.com/users/${user.uid}/favorites/${poemId}.json?auth=${token}`);
    const res = await axios.get(`https://poemasmaker.firebaseio.com/users/${user.uid}.json?auth=${token}`);
    updateFavorites(res);
  }

  return (
    <SecuredComponent>
      <div className="container-fluid profile-page-container">
        <div className="row">
          <div className="card my-3 col-lg-5 col-md-6">
            <div className="row no-gutters">
              <div className="align-self-center col-md-4 d-flex">
                {picture ? <img src="..." className="card-img" alt="..." /> : <span className="jam jam-user-circle user-pic"></span>}
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{user.displayName || user.email}</h5>
                  {/* <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Breve descripción de tí</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    <button className="btn btn-sm btn-primary mt-1">Editar</button>
                    <button className="btn btn-sm btn-primary mt-1">Guardar</button>
                  </div>
                  <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p> */}
                </div>
              </div>
            </div>
          </div>
          <div className="my-3 col-lg-7 col-md-6">
            <ul className="list-group favorites-list">
              <li className="list-group-item bg-primary list-title">Poemas favoritos</li>
              {
                userData?.favorites?.map(item => {
                  console.log(item);
                  let key = item[0];
                  let poem = item[1];
                  return (
                    <li className="list-group-item" key={key}>
                      <a href={`/poems/${key}`}>
                        <span className="poem-fav-title">{poem.title}</span>
                      </a>
                      <button className="btn btn-secondary btn-sm float-right" onClick={()=>removeFav(key)}>Quitar</button>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>
    </SecuredComponent>
  );
}

export default ProfilePage;