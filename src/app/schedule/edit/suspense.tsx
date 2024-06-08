import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';

export default <Suspense>
    {useSearchParams()}
</Suspense>