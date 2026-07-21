import type { RequestHandler } from './$types';
import { db } from '$lib/server/db/db.js';
import { error, json } from '@sveltejs/kit';
import { DBUsers } from '$lib/server/db/user/user';

async function fetchFullUserInfo(locals: App.Locals) {
	const DbUser = new DBUsers(db);
	if (locals.pat) {
		return await DbUser.getUserByPat(locals.pat);
	}
	if (locals.user?.username) {
		return await DbUser.getUserByUsername(locals.user.username);
	}
	return null;
}

export const POST: RequestHandler = async ({ locals }) => {
	const userInfo = await fetchFullUserInfo(locals);
	if (!userInfo) {
		return error(401, { message: 'unauthorized' });
	}
	return json(userInfo);
};
