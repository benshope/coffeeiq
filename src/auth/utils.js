export const userFromResponse = (payload, gaveCalendarAccess) => {
    const domain = payload.user.email.split("@")[1];
    return {
        uid: payload.user.uid,
        emailId: payload.user.email
            .split(".")
            .join("_"),
        photoURL: payload.user.photoURL,
        displayName: payload.user.displayName,
        email: payload.user.email,
        domain,
        gaveCalendarAccess: !!gaveCalendarAccess,
        orgId: domain.split(".").join("_"),
        orgName: domain.split(".")[0],
        refreshToken: payload.user.refreshToken
    };
};
