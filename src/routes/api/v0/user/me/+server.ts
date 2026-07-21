import type { RequestHandler } from './$types';
import { db } from '$lib/server/db/db.js';
import { error, json } from '@sveltejs/kit';
import { DBUsers } from '$lib/server/db/user/user';
import type { User } from '$lib/server/lucia/lucia.js';

async function fetchFullUserInfo(user: User) {
	const DbUser = new DBUsers(db);
	const username = user.username;

	if (!username) {
		return error(500);
	}
	return await DbUser.getUserByUsername(username);
}

export const POST: RequestHandler = async ({ locals }) => {
	const user = locals.user;
	if (!user) {
		return error(401, { message: 'unauthorized' });
	}
	return json(await fetchFullUserInfo(user));
};

export const GET: RequestHandler = async ({ locals }) => {
	const user = locals.user;
	if (!user) {
		return error(401, { message: 'unauthorized' });
	}
	return json(await fetchFullUserInfo(user));
};
