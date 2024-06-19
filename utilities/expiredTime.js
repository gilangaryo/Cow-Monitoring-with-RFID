const checkExpired = (time) => {
    const banExpirationTime = time;
    const remainingTime = banExpirationTime - Date.now();
    console.log();
    return { remainingTime };
}

const banTimes = () => {
    const banTime = Date.now() + 1 * 2 * 1000;
    return banTime;
};

module.exports = {
    checkExpired,
    banTimes
};