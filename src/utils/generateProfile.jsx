export const generateProfilePic = (userName) => {
    const baseUrl = "https://avatars.dicebear.com/api/";
    const style = "identicon";
    const avatarUrl = `${baseUrl}${style}/${encodeURIComponent(userName)}.svg`;
    return avatarUrl;
};
