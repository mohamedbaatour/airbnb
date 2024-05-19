import { Suspense } from 'react';
import Loader from '../components/Loader';
import EmptyState from "../components/EmptyState";
import PropertiesClient from "./PropertiesClient"

import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";

const PropertiesPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <EmptyState
                title="Unauthorized"
                subtitle="Please login"
            />
        );
    }

    const listings = await getListings({
        userId: currentUser.id
    });

    if (listings.length === 0) {
        return (
            <EmptyState
                title="No properties found"
                subtitle="Looks like you have no properties."
            />
        );
    }

    return (
        <Suspense fallback={<Loader />}>
        <PropertiesClient
            listings={listings}
            currentUser={currentUser}
            />
        </Suspense>
    );
};

export default PropertiesPage;
