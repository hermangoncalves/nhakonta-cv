import { NotFoundHandler } from 'hono';
import { NOT_FOUND } from '@/utils/http-status-codes';
import { NOT_FOUND as NOT_FOUND_MESSAGE } from '@/utils/http-status-phrases';

const notFound: NotFoundHandler = (c) => {
	const path = c.req.path;
	const method = c.req.method;

	return c.json(
		{
			status: 'error',
			code: NOT_FOUND,
			message: NOT_FOUND_MESSAGE,
			details: {
				path,
				method,
			},
		},
		NOT_FOUND
	);
};

export default notFound;
