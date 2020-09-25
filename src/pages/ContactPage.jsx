import Axios from 'axios';
import React, { Fragment, useState } from 'react'

const ContactPage = () => {

  const [nombre, setNombre] = useState(null);
  const [email, setEmail] = useState(null);
  const [comentario, setComentario] = useState(null);
  const [success, setSuccess] = useState(null)

  const submit = async () => {
    try {
      await Axios.post('https://us-central1-poemasmaker.cloudfunctions.net/contact', {nombre, email, comentario});
      setNombre(null);
      setEmail(null);
      setComentario(null);
      setSuccess(true);
    } catch(e) {
      console.error(e);
      setSuccess(false);
    }
  }

  return (
    <Fragment>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-8 my-3">
            <form onSubmit={(e) => {e.preventDefault(); submit()}}>
              <div className="card">
                <div className="card-header p-0">
                  <div className="bg-secondary text-white text-center py-2">
                    <h3>Dejanos una sugerencia</h3>
                  </div>
                </div>
                <div className="card-body p-3">
                  <div className="form-group">
                    <div className="input-group input-group-lg mb-2">
                      <div className="input-group-prepend d-none d-md-flex">
                        <div className="input-group-text bg-secondary"><span className="jam jam-user text-white"></span></div>
                      </div>
                      <input type="text" className="form-control" id="nombre" name="nombre" placeholder="Nombre y Apellido" required onChange={(e)=>setNombre(e.target.value)} maxLength="50" autoComplete="off"/>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group input-group-lg mb-2">
                      <div className="input-group-prepend d-none d-md-flex">
                        <div className="input-group-text bg-secondary"><span className="jam jam-envelope text-white"></span></div>
                      </div>
                      <input type="email" className="form-control" id="nombre" name="email" placeholder="ejemplo@email.com" required onChange={(e)=>setEmail(e.target.value)} maxLength="200" autoComplete="off"/>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group input-group-lg mb-2">
                      <div className="input-group-prepend d-none d-md-flex">
                        <div className="input-group-text bg-secondary"><span className="jam jam-message text-white"></span></div>
                      </div>
                      <textarea className="form-control" name="comentario" placeholder="Comentario" rows="5" required onChange={(e)=>setComentario(e.target.value)} maxLength="500"></textarea>
                    </div>
                  </div>
                  <div className="text-center">
                    <input type="submit" value="Enviar" className="btn btn-lg btn-primary btn-block py-2" disabled={!nombre || !email || !comentario} />
                  </div>
                  {(success === false) && <div className="alert alert-warning mt-2">Ha ocurrido un error. Vuelva a intentar</div>}
                  {success && <div className="alert alert-success mt-2">Gracias por tu comentario! <span role="img" aria-label="corazon">❤️</span></div>}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ContactPage;