import React from 'react'
import { Link } from 'react-router-dom'

import { ReactComponent as Logo } from '../../assets/favicon.svg'
import './header.styles.scss'

import { auth } from '../../firebase/firebase.utils'

const Header = ({ currentUser }) => (
  <div className='header'>
    <Link to='/' className='logo-container'>
      <Logo className='logo' style={{ maxWidth:'50px' }}/>
    </Link>

    <div className='options'>
      <Link className='option' to='/shop'>
        shop
      </Link>

      <Link className='option' to='/contact'>
        contact
      </Link>
      {
        currentUser ?
        <div className='option' onClick={() => auth.signOut()}>Sign out</div>
        :
        <Link className='option' to='/signin'>Sign In</Link>
      }
    </div>
  </div>
)

export default Header