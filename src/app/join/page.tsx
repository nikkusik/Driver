'use server';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { addSchedule, getCookie } from '../api/api';
import PleaseLoginPage from '../pleaseLogin/page';
import PageClient from './pageClient';

export default async function Page() {
    const user = await getCookie();
    if (user?.role === 'driver' || user?.role === 'student') {
        return <PageClient />;
    } else {
        return <PleaseLoginPage />;
    }
}
