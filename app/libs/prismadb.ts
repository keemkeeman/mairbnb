import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;

/* 주어진 코드는 Prisma ORM을 사용하여 데이터베이스에 연결하는 코드입니다. 
이 코드는 PrismaClient 인스턴스를 생성하고, 전역으로 사용할 수 있도록 
globalThis 객체에 저장하는 역할을 합니다.

리뷰할 수 있는 몇 가지 사항은 다음과 같습니다:

PrismaClient의 단일 인스턴스 관리: 이 코드는 globalThis.prisma 
변수를 사용하여 PrismaClient의 단일 인스턴스를 관리합니다. 
이렇게 함으로써 동일한 PrismaClient 인스턴스를 여러 번 생성하지 
않고 재사용할 수 있습니다. 이는 성능을 향상시키는데 도움이 됩니다.

환경에 따른 PrismaClient 생성: 코드의 마지막 부분에서 
process.env.NODE_ENV를 검사하여 개발 환경인 경우에만 
globalThis.prisma에 클라이언트를 할당하고 있습니다. 
이렇게 하면 개발 환경에서만 PrismaClient를 생성하고, 
프로덕션 환경에서는 재사용할 수 있습니다. 

이렇게 함으로써 개발 환경에서 PrismaClient가 새로운 연결을 
맺는 것을 방지할 수 있으며, 성능과 자원 사용량을 개선할 수 있습니다.

globalThis: globalThis 객체는 현재 환경(브라우저, Node.js 등)에서 
전역 객체를 나타냅니다. 이 객체를 사용하여 전역 변수를 설정하거나 
접근할 수 있습니다. 하지만, 전역 변수를 사용할 때는 주의가 필요합니다. 
모듈화와 의존성 관리를 위해 모듈 시스템을 사용하는 것이 바람직합니다.
전역 변수는 코드를 이해하기 어렵게 만들 수 있고, 
충돌이나 부작용을 유발할 수 있습니다. 

코드의 환경에 따라 전역 변수의 사용을 최소화하고 모듈 시스템을 
활용하는 것이 좋습니다.

타입스크립트 타입 선언: 코드의 첫 번째 라인에서 PrismaClient를 
@prisma/client에서 임포트하고 있습니다. 
그리고 두 번째 라인에서 globalThis.prisma의 
타입을 PrismaClient | undefined로 선언하고 있습니다. 

이렇게 함으로써 타입스크립트에서 globalThis.prisma 변수를 
올바르게 추론할 수 있습니다.

전체적으로 보면, Prisma ORM의 사용과 PrismaClient 인스턴스의 
단일성을 잘 관리하는 코드로 보입니다. 하지만, globalThis를 
사용할 때 주의하여야 하며, 필요한 경우에만 사용하는 것이 좋습니다. 
또한 타입스크립트 타입을 정확하게 선언하고 코드의 모듈화와 
의존성 관리에 신경 쓰는 것이 중요합니다. */