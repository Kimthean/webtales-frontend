const formatRelativeTime = (dateString: string) => {
  const now = new Date();
  const past = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "Just Now";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} Minute${minutes > 1 ? "s" : ""} Ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} Hour${hours > 1 ? "s" : ""} Ago`;
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} Day${days > 1 ? "s" : ""} Ago`;
  } else if (diffInSeconds < 31536000) {
    const months = Math.floor(diffInSeconds / 2592000);
    return `${months} Month${months > 1 ? "s" : ""} Ago`;
  } else {
    const years = Math.floor(diffInSeconds / 31536000);
    return `${years} Year${years > 1 ? "s" : ""} Ago`;
  }
};

export default formatRelativeTime;