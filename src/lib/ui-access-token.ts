import "server-only";

import { createHmac, timingSafeEqual } from "crypto";

export type UiLibraryAccessClaims = {
  sub: string;
  entitlement: "ui-library";
  iat: number;
  exp: number;
};

function getAccessSecret() {
  const secret = process.env.UI_LIBRARY_ACCESS_SECRET?.trim();

  if (secret) return secret;

  if (process.env.NODE_ENV === "production") {
    throw new Error("Set UI_LIBRARY_ACCESS_SECRET in production");
  }

  return "dev-ui-library-access-secret-change-before-production";
}

function sign(payloadPart: string) {
  return createHmac("sha256", getAccessSecret()).update(payloadPart).digest("base64url");
}

export function verifyUiLibraryAccessToken(token: string): UiLibraryAccessClaims | null {
  const [payloadPart, signaturePart] = token.split(".");
  if (!payloadPart || !signaturePart) return null;

  const expected = Buffer.from(sign(payloadPart));
  const actual = Buffer.from(signaturePart);
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return null;

  try {
    const claims = JSON.parse(Buffer.from(payloadPart, "base64url").toString("utf8")) as UiLibraryAccessClaims;
    const now = Math.floor(Date.now() / 1000);

    if (
      !claims.sub ||
      claims.entitlement !== "ui-library" ||
      !Number.isFinite(claims.iat) ||
      !Number.isFinite(claims.exp) ||
      claims.iat > now + 60 ||
      claims.exp <= now
    ) {
      return null;
    }

    return claims;
  } catch {
    return null;
  }
}
