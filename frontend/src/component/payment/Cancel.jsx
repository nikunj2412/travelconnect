import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

const Cancel = () => {
  useEffect(() => {
    toast.error("Payment Failed !! Try Again");
  }, []); 

  return (
    <>
      
    </>
  );
};

export default Cancel;
