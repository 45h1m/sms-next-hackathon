function convertToIST(isoTime) {
    const date = new Date(isoTime);

    const options = {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    };

    return date.toLocaleString("en-IN", options);
}
