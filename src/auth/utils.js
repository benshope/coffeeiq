export const userFromPayload = payload => ({
	uid: payload.user.uid,
	photoURL: payload.user.photoURL,
	displayName: payload.user.displayName,
	email: payload.user.email,
	orgId: payload.user.email.split("@")[1].replace(".", "_"),
	orgName: payload.user.email.split("@")[1].split(".")[0],
	refreshToken: payload.user.refreshToken
});
