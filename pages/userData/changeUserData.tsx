import { UserState } from '@/commons/types.interface';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const changeUserData = ({dataToChange}: any) => {
  const userId = useSelector((state: UserState) => state.user._id);
  const userData = useSelector((state: UserState) => state.user);
  const router = useRouter()
  const [dataUser, setDataUser] = useState({
    email: userData.email,
    phoneNumber: userData.phoneNumber,
    password: userData.password
  });

  function handleGoBack () {
    router.push('/userData')
};

function handleDataChange () {

}

  return (
    <div>
datatochange
    </div>
  )
}

export default changeUserData
