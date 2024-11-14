import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as jwksClient from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider: (request, rawJwtToken, done) => {
        const client = jwksClient({
          jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
        });

        function getKey(header, callback) {
          client.getSigningKey(header.kid, function (err, key) {
            if (err) {
              console.error('Erro ao obter a chave de assinatura:', err);
              return callback(err, null);
            }
            const signingKey = key.getPublicKey();
            callback(null, signingKey);
          });
        }
        

        // Remova a chamada manual `getKey(null, done);`
        done(null, getKey);
      },
      audience: process.env.AUTH0_AUDIENCE,
      issuer: `https://${process.env.AUTH0_DOMAIN}/`,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, ...payload };
  }
  
}
