import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import prisma from "@/app/libs/prismadb";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || credentials?.email || credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Invaild credentials");
        }
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  debug: process.env.NODE_ENV !== "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);

/* 주어진 코드는 Next.js 애플리케이션에서 NextAuth를 사용하여 인증 기능을 
구현하는 코드입니다. NextAuth는 Next.js 애플리케이션에서 손쉽게 
소셜 로그인 및 자체 인증을 구현할 수 있도록 도와주는 라이브러리입니다.

코드 리뷰를 통해 몇 가지 사항을 확인할 수 있습니다:

PrismaAdapter를 사용한 인증 어댑터 설정: adapter 속성을 통해 
PrismaAdapter를 설정하고 있습니다. 이를 통해 NextAuth에서 Prisma 
데이터베이스를 사용하여 사용자 인증을 관리할 수 있습니다.

다양한 인증 프로바이더 설정: providers 속성을 통해 GitHub, Google, 
그리고 사용자 기반의 자체 인증(CredentialsProvider)을 설정하고 있습니다. 
사용자 기반의 자체 인증은 이메일과 비밀번호를 사용하여 인증하는 방식입니다.

사용자 기반 인증(authorize) 로직: CredentialsProvider에서 제공하는 
authorize 함수를 통해 사용자의 이메일과 비밀번호를 확인하는 로직이 
구현되어 있습니다. 입력된 이메일과 비밀번호를 사용하여 Prisma를 통해 
사용자를 조회하고, bcrypt를 사용하여 비밀번호를 검증하는 방식입니다.

기타 옵션 설정: pages, debug, session, secret 등 다양한 옵션들을 
설정하여 원하는 인증 흐름 및 디버깅 방법을 지정하고 있습니다.

위 코드에서 보이는 부분은 기본적인 인증 설정과 로직이며, prisma와 
process.env를 사용하여 환경 변수와 데이터베이스 설정을 
잘 활용하고 있습니다. 단, 코드 리뷰에서는 완전한 프로젝트의 
전반적인 상황과 보안 측면 등을 고려하지 않기 때문에, 실제 프로덕션 
환경에서 사용하기 전에 보다 심도 깊은 검토와 보안 검토를 
진행하는 것이 좋습니다. 또한, NextAuth와 Prisma를 적절히 
활용하는 방법에 대해 공식 문서를 참고하는 것도 좋은 방법입니다. */
