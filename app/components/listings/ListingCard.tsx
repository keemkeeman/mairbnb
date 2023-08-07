"use client";

import useCountries from "@/app/hooks/useCountry";
import { SafeUser, SafeListing, SafeReservations } from "@/app/types";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservations;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(data.locationValue);
  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation(); //상위 요소로 이벤트 영향 막기

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [actionId, disabled, onAction]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [data.price, reservation]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  /* reservation 객체의 값이 존재하는 경우, 
  reservation.startDate와 reservation.endDate를 
  JavaScript의 Date 객체로 변환하고, date-fns 
  라이브러리의 format 함수를 사용하여 날짜를 원하는 
  형식으로 포맷합니다. "PP"는 date-fns 라이브러리에서 
  지원하는 날짜 형식 중 하나로, Aug 1, 2023과 같은 형식으로 
  날짜를 포맷합니다. 따라서 reservationDate는 시작일과 
  종료일이 포함된 문자열을 반환합니다. */

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="felx flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            alt="Listing"
            src={data.imageSrc}
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
