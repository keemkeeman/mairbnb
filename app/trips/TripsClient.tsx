"use client";

import axios from "axios";

import { toast } from "react-hot-toast";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { SafeReservations, SafeUser } from "../types";

import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";

interface TripsClientProps {
  reservations: SafeReservations[];
  currentUser?: SafeUser | null;
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation canceled");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error); // 이건 왜 이렇게 해
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading
        title="Trips"
        subTitle="Where you've been and where you're going"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel reservation"
            actionId={reservation.id}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
