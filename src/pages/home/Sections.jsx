import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Sections = ({isNavLink}) => {
  const sections = useSelector(state => state.appConfig.sections);

  const goTop = () => {
    window.scrollTo(0, 0);
  }

  return ( 
    <Fragment>
      {
        sections?.map((item, i) => {
          return (
            item.info.isNavLink ?  
            <li className="nav-item" key={item.key}>
              <NavLink to={item.info.path} className="nav-link" activeClassName="active" onClick={goTop}>{item.info.title}</NavLink>
            </li>
            :
            <li key={item.key} className="nav-item"><a href={item.info.path} className="nav-link">{item.info.title}</a></li>
          )
        })
      }
    </Fragment>
  );
}
 
export default Sections;