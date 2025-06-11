import type { ErrorHandler } from 'hono';

import { INTERNAL_SERVER_ERROR } from '@/utils/http-status-codes';
import { INTERNAL_SERVER_ERROR as INTERNAL_SERVER_ERROR_MESSAGE } from '@/utils/http-status-phrases';
import { HTTPException } from 'hono/http-exception';

const onError: ErrorHandler = (err, c) => {
	if (err instanceof HTTPException) {
		return c.json(
			{
				status: 'error',
				code: err.status,
				message: err.message,
			},
			err.status
		);
	}

	return c.json(
		{
			status: 'error',
			code: INTERNAL_SERVER_ERROR,
			message: INTERNAL_SERVER_ERROR_MESSAGE,
		},
		INTERNAL_SERVER_ERROR
	);
};

export default onError;
