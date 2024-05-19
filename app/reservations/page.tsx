import { Suspense } from 'react';
import Loader from '../components/Loader';
import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationsClient from "./ReservationsClient";

const ReservationsPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <EmptyState
                title="Unauthorized"
                subtitle="Please login"
            />
        );
    }

    const reservations = await getReservations({
        userId: currentUser.id
    });

    if (reservations.length === 0) {
        return (
            <EmptyState
                title="No reservations found"
                subtitle="Looks like you have no reservations on your properties"
            />
        );
    }

    return (
        <Suspense fallback={<Loader />}>
        <ReservationsClient
            reservations={reservations}
                currentUser={currentUser}
            />
        </Suspense>
    );
};


export default ReservationsPage