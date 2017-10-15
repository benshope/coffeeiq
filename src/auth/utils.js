export const userFromResponse = (payload, gaveCalendarAccess) => {
    const domain = payload.user.email.split("@")[1];
    return {
        uid: payload.user.uid,
        photoURL: payload.user.photoURL,
        displayName: payload.user.displayName,
        email: payload.user.email,
        domain,
        gaveCalendarAccess: !!gaveCalendarAccess,
        orgId: domain.replace(".", "_"),
        orgName: domain.split(".")[0],
        refreshToken: payload.user.refreshToken
    };
};
