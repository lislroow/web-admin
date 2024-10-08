import React, { useState, useEffect } from "react";
import { Typography } from '@mui/material';

import { getLastAccess } from 'utils/storage';
import { logout } from 'utils/http';

const ExpireTimer = () => {
  const calc = (): number => {
    const lastAccess = getLastAccess();
    const expire = Math.floor((lastAccess - Date.now()) / 1000) + 1800;
    if (expire < 0) {
      return -1;
    }
    return expire;
  };
  const [ expireTime, setExpireTime ] = useState<number>(calc());
  useEffect(() => {
    if (expireTime < 0) {
      return;
    }
    const timer = setInterval(() => {
      const time = calc();
      if (time < 0) {
        clearInterval(timer);
        logout();
      } else {
        setExpireTime(time);
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [expireTime]);

  return (
    <Typography style={{float: 'right', padding: '1px', marginTop: '7px', marginRight: '40px'}}>{expireTime > 0 ? expireTime : ''}</Typography>
  )
};
export default ExpireTimer;