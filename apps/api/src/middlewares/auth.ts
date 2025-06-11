import { AppBindings } from "@/types";

import { createMiddleware } from "hono/factory";
import { createClerkClient } from "@clerk/clerk-sdk-node";
import * as HttpStatusCode from '@/utils/http-status-codes';

const authMiddleware = createMiddleware<AppBindings>(async (c, next) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    c.var.logger.error('Missing or invalid Authorization header');
    return c.json({ error: 'Missing or invalid Authorization header' }, 401);
  }

  const token = authHeader.replace('Bearer ', '');

  if (!token) {
    c.var.logger.error('Missing token');
    return c.json({ error: 'Missing token' }, HttpStatusCode.UNAUTHORIZED);
  }

  if (!c.env.CLERK_SECRET_KEY) {
    c.var.logger.error('Missing CLERK_SECRET_KEY');
    return c.json({ error: 'Missing CLERK_SECRET_KEY' }, HttpStatusCode.INTERNAL_SERVER_ERROR);
  }

  const clerkClient = createClerkClient({
    secretKey: c.env.CLERK_SECRET_KEY,
  });

  const payload = await clerkClient.verifyToken(token);

  if (!payload) {
    c.var.logger.error('Invalid token');
    return c.json({ error: 'Invalid token' }, HttpStatusCode.UNAUTHORIZED);
  }

  const clerkId = payload.sub

  c.set('user', {
    clerkId,
  });

  await next();

})

export default authMiddleware;