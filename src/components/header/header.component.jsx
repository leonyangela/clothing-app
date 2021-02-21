import React from 'react'
import { Link } from 'react-router-dom'

import { ReactComponent as Logo } from '../../assets/favicon.svg'
import './header.styles.scss'

const Header = () => (
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
    </div>
  </div>
)

export default Header