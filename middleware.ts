export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/trips", "/reservations", "/properties", "/favorites"],
};

/* 로그인, 로그아웃해도 위 4개 선택사항은 사라지지 않고 유지 됨*/
/* 깜박하고 로그인 안하고 검색을 한 경우, 늦게 로그인해도 검색 결과가 그대로 잔존 */