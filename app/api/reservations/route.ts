import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const { listingId, startDate, endDate, totalPrice } = body;

  if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
  }

  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservation: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice,
        },
      },
    },
  });

  return NextResponse.json(listingAndReservation);
}

/* Prisma를 사용하여 데이터베이스에 쿼리를 수행하는 방식은 
프로그래머의 선택에 따라 다양합니다. 코드에서 prisma.listing.update()를 
사용하여 prisma.reservation.create() 대신 예약을 생성하는 이유에 대해 
몇 가지 이유가 있을 수 있습니다:

데이터 관계의 유지: 코드는 prisma.listing.update()를 사용하여 기존 
리스트 데이터를 업데이트하고, 그 안에 새로운 예약을 생성하는 방식으로 
작성되었습니다. 이렇게 하면 예약과 리스트 간의 관계를 쉽게 유지할 수 
있습니다. 리스트와 예약 사이에 별도의 관계가 있을 경우, 이러한 방식으로
 데이터를 구성하는 것이 유용합니다.

데이터 일관성: prisma.listing.update()를 사용하여 업데이트를 수행하는 
것은 데이터베이스 트랜잭션을 더욱 간단하게 유지할 수 있습니다. 
여러 작업이 하나의 트랜잭션으로 묶이는 것이 일반적으로 데이터 일관성을 
유지하는 데 도움이 됩니다. 예약을 생성하는 것과 동시에 리스트를 
업데이트함으로써 트랜잭션을 구성할 수 있습니다.

코드 구조와 가독성: 코드를 prisma.listing.update()를 사용하여 작성하면
 예약 생성과 관련된 로직이 하나의 함수로 통합됩니다. 이렇게 하면 
 코드의 가독성이 향상되고 유지보수가 더 쉬워집니다.

성능: 실제로 데이터베이스 트랜잭션을 수행할 때, 예약 생성과 리스트 
업데이트를 별도의 쿼리로 분리하는 것보다 하나의 쿼리로 수행하는 것이 
성능 면에서 더 효율적일 수 있습니다.

그러나 데이터 모델과 비즈니스 로직에 따라서 prisma.reservation.create()를 
사용하는 것이 더 적합할 수도 있습니다. 데이터 구조와 비즈니스 요구 
사항에 따라서 Prisma 쿼리를 설계하는 것은 상황에 맞게 선택하는 것이 
중요합니다. */
