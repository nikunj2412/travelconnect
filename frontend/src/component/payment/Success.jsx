import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

const Success = () => {
  useEffect(() => {
    toast.success("Payment Received Successfully");
  }, []); 

  return (
    <>
      
    </>
  );
};

export default Success;
