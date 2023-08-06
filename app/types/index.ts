import { Listing, Reservation, User } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string; // 새로운 속성: ISO 8601 형식의 문자열로 변환
  updatedAt: string;
  emailVerified: string | null;
};

export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string; // 새로운 속성: ISO 8601 형식의 문자열로 변환
};

export type SafeReservations = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};

/* Omit<User, "createdAt" | "updatedAt" | "emailVerified">:
Omit은 TypeScript의 내장 타입 연산자 중 하나로, 객체 타입에서 
특정 속성들을 제거할 수 있게 해줍니다. User 객체 타입에서 
"createdAt", "updatedAt", 그리고 "emailVerified" 속성들을 
제거한 새로운 타입을 만듭니다.

& { createdAt: string; updatedAt: string; emailVerfied: string | null; }:
&는 TypeScript의 타입 연산자 중 하나로, 여러 타입을 
하나로 결합하는 역할을 합니다. 앞서 만들어진 타입에 
새로운 속성들을 추가하여 확장하는 역할을 합니다.
 이 코드에서는 "createdAt", "updatedAt", 그리고 
 "emailVerified" 속성들을 제거한 타입에 새로운 속성
  createdAt, updatedAt, 그리고 emailVerfied를 추가하고 
  해당 속성들의 타입을 string과 string | null로 지정합니다. */
