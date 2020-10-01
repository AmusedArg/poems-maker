import axios from 'axios';
import React, { useContext, useState } from 'react';
import ImageUploader from "react-images-upload";
import { useDispatch, useSelector } from 'react-redux';
import SecuredComponent from '../../components/security/SecuredComponent';
import { firebaseAuth } from '../../provider/AuthProvider';
import { userConfigDeleteFavPoemAction, userConfigUpdatePhotoAction } from '../../redux/userConfigDucks';

const ProfilePage = (props) => {
  const dispatch = useDispatch();
  const { user } = useContext(firebaseAuth);
  const userConfig = useSelector(state => state.userConfig.data);
  const [uploading, setUploading] = useState(null);
  
  const onDrop = async (picture) => {
    try {
      setUploading(true);
      const token = await user.getIdToken(true);
      const base64 = await toBase64(picture[0]);
      const res = await axios.post('https://us-central1-poemasmaker.cloudfunctions.net/uploadPicture', {
        user: token,
        file: base64.split(',')[1]
      });
      dispatch(userConfigUpdatePhotoAction(res.data));
    } finally {
      setUploading(false);
    }
  };

  // const updateFavorites = (res) => {
  //   if (res.data.favorites) {
  //     res.data.favorites = Object.entries(res.data.favorites);
  //     setUserData(res.data);
  //   }
  // }
  
  const removeFav = async (poemId) => {
    const token = await user.getIdToken(true);
    await axios.delete(`https://poemasmaker.firebaseio.com/users/${user.uid}/favorites/${poemId}.json?auth=${token}`);
    dispatch(userConfigDeleteFavPoemAction(poemId));
  }

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  const getUserFavs = () => {
    if (userConfig) {
      return Object.entries(userConfig?.favorites);
    } else {
      return [];
    }
  }

  return (
    <SecuredComponent>
      <div className="container-fluid profile-page-container">
        <div className="row">
          <div className="card my-3 col-lg-5 col-md-6">
            <div className="row no-gutters">
              <div className="align-self-center col-md-4 d-flex">
                {
                  uploading ? 
                    <div className="spinner spinner-grow text-secondary" role="status"><span className="sr-only">Loading...</span></div> 
                  :
                    (!uploading && userConfig?.photoURL) ? <img src={userConfig.photoURL} className="card-img user-pic" alt="Profile" /> : <span className="jam jam-user-circle user-pic"></span>
                }
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title text-center">{user.displayName || user.email}</h5>
                  <ImageUploader
                    {...props}
                    withIcon={true}
                    onChange={onDrop}
                    buttonText="Cambiar foto de perfil"
                    label="Tamaño máximo: 5MB"
                    imgExtension={[".jpg", ".png"]}
                    maxFileSize={5242880}
                    singleImage={true}
                    fileTypeError="Formatos válidos: .png y .jpg"
                  />
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
                getUserFavs().map(item => {
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