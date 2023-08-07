import prisma from "@/app/libs/prismadb";

export interface IListingParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(params: IListingParams) {
  try {
    const {
      userId,
      roomCount,
      guestCount,
      bathroomCount,
      locationValue,
      startDate,
      endDate,
      category,
    } = params;

    /* 검색 조건 설정 */
    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount,
      };
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount,
      };
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount,
      };
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (startDate && endDate) {
      query.NOT = {
        reservation: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate }, // startDate를 포함하는 날짜
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate }, // endDate를 포함하는 날짜
              },
            ],
          },
        },
      };
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}

/* 데이터 시리얼라이제이션: 서버와 클라이언트 간 데이터 교환 시, 
데이터를 문자열로 변환해서 전송해야 할 때가 있습니다. Date 객체는 
직렬화(시리얼라이제이션)되지 않으므로, JSON 형식 등으로 변환하기 위해 
문자열로 변환해야 합니다. ISO 형식은 JSON 등에서 날짜와 시간을 
표현하는데 편리한 문자열 형태이기 때문에 자주 사용됩니다.

데이터 저장 및 처리의 통일성: 데이터베이스에 Date 객체를 
저장하거나 서버에서 Date를 처리할 때, ISO 형식으로 표현하면 
데이터의 통일성과 관리 용이성을 높일 수 있습니다. */
