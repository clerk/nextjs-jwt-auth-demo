import * as jose from 'jose';

const jwtConfig = {
  secret: new TextEncoder().encode(process.env.JWT_SECRET),
  protectedHeader: { alg: 'HS256', typ: 'JWT' }
};

export async function parseToken(token: string): Promise<jose.JWTPayload | null> {
  try {
    const { payload } = await jose.jwtVerify(token, jwtConfig.secret);
    return payload;
  } catch (err) {
    console.error('Error parsing token', err);
    return null;
  }
}

interface CreateTokenProps {
  sub: string
  username: string
}

export async function createToken({ sub, username }: CreateTokenProps): Promise<string> {
  try {
    return await new jose.SignJWT({ sub, username })
        .setProtectedHeader(jwtConfig.protectedHeader)
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(jwtConfig.secret)
  } catch (err) {
    console.error("Error creating", err)
    throw err
  }
}