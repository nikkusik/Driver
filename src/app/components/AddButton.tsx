'use client';
import Link from 'next/link';
import React from 'react';

const AddButton = () => {
    return (
        <Link href='../schedule/add' className="fixed rounded-full shadow-md bottom-4 right-4 bg-blue-500 he text-white p-4 hover:bg-blue-600" >
            <p>+</p>
        </Link>
    );
};

export default AddButton;