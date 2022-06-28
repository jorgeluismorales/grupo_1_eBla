import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import {isLoggedIn} from '../../helpers/utils'

const PublicLayout = () => {

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/");
    }
  }, []);
  return (
    <Outlet />
  )
}

export default PublicLayout