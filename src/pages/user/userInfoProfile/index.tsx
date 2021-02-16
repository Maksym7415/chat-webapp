import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

interface ParamsId {
  id: string
}

export default function UserInfoProfile() {
  const userId = +useParams<ParamsId>().id;
  console.log(userId);
  return (
        <div>

        </div>
  );
}
