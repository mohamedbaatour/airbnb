'use client'

import { Suspense, useEffect } from 'react';
import Loader from './components/Loader';
import EmptyState from './components/EmptyState';

interface ErrorStateProps {
    error: Error
}

const ErrorState: React.FC<ErrorStateProps> = ({
    error
}) => {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <Suspense fallback={<Loader />}>
            <EmptyState
                title="Uh Oh >.<"
                subtitle="Something went wrong! :("
            />
        </Suspense>
    );
}

export default ErrorState;