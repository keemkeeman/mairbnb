import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password } = body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });
  return NextResponse.json(user);
}

/* 보안: 비밀번호 해싱에 bcrypt를 사용하고 있으며, 
해시 알고리즘의 작업량을 12로 설정하여 보안을 강화하고 있습니다. 
이렇게 함으로써 저장된 비밀번호가 안전하게 보호됩니다.

Prisma를 사용한 데이터베이스 조작: prisma를 사용하여 MongoDB 
데이터베이스에 새로운 사용자를 생성하고 있습니다. 이를 통해 
데이터베이스 조작을 쉽게 처리할 수 있으며, ORM을 사용하여 
타입 세이프한 쿼리를 작성할 수 있습니다.

요청 처리: POST 함수는 request 객체를 매개변수로 받아 요청을 처리합니다. 
request.json() 메서드를 사용하여 요청 본문을 JSON 형식으로 파싱하고, 
그 안에 포함된 email, name, password 정보를 추출하여 새로운 사용자를 
생성합니다.

응답 반환: NextResponse.json()을 사용하여 생성된 사용자 정보를 
JSON 형식으로 응답합니다. 이를 통해 클라이언트가 회원 가입 결과를 
받을 수 있습니다.

전반적으로 보안적인 측면에서 bcrypt를 사용하여 비밀번호를 해싱하고, 
Prisma를 사용하여 데이터베이스 조작을 처리하는 것이 좋습니다. 
또한 코드 구조도 간결하고 명확하게 작성되어 있으며, 요청과 응답 
처리가 잘 이루어지고 있습니다. */
