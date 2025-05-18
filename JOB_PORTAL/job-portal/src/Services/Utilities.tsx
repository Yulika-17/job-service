// const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     const options = { year: 'numeric' as const, month: 'short' as const };
//     return date.toLocaleString('en-US', options);
// }
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options = { year: 'numeric' as const, month: 'short' as const };
    return date.toLocaleString('ru-RU', options);
}
// function timeAgo(timestamp: string) {
//     const now = new Date();
//     const postDate = new Date(timestamp);
//     const diffInMs = now.getTime() - postDate.getTime();


//     const seconds = Math.floor(diffInMs / 1000);
//     const minutes = Math.floor(seconds / 60);
//     const hours = Math.floor(minutes / 60);
//     const days = Math.floor(hours / 24);
//     const months = Math.floor(days / 30);
//     const years = Math.floor(months / 12);

//     if (seconds < 60) {
//         return `${seconds} секунд${seconds === 1 ? '' : 's'} ago`;
//     } else if (minutes < 60) {
//         return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
//     } else if (hours < 24) {
//         return `${hours} hour${hours === 1 ? '' : 's'} ago`;
//     } else if (days < 30) {
//         return `${days} day${days === 1 ? '' : 's'} ago`;
//     } else if (months < 12) {
//         return `${months} month${months === 1 ? '' : 's'} ago`;
//     } else {
//         return `${years} year${years === 1 ? '' : 's'} ago`;
//     }
// }
function timeAgo(timestamp: string) {
    const now = new Date();
    const postDate = new Date(timestamp);
    const diffInMs = now.getTime() - postDate.getTime();

    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    function pluralize(number: number, one: string, few: string, many: string) {
        const n = Math.abs(number) % 100;
        const n1 = n % 10;
        if (n > 10 && n < 20) return many;
        if (n1 > 1 && n1 < 5) return few;
        if (n1 === 1) return one;
        return many;
    }

    if (seconds < 60) {
        return `${seconds} ${pluralize(seconds, "секунда", "секунды", "секунд")} назад`;
    } else if (minutes < 60) {
        return `${minutes} ${pluralize(minutes, "минута", "минуты", "минут")} назад`;
    } else if (hours < 24) {
        return `${hours} ${pluralize(hours, "час", "часа", "часов")} назад`;
    } else if (days < 30) {
        return `${days} ${pluralize(days, "день", "дня", "дней")} назад`;
    } else if (months < 12) {
        return `${months} ${pluralize(months, "месяц", "месяца", "месяцев")} назад`;
    } else {
        return `${years} ${pluralize(years, "год", "года", "лет")} назад`;
    }
}

const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
};
const openPDF = (base64: string) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);

    const newWindow = window.open(blobUrl);
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        alert('Popup was blocked. Please allow popups for this website.');
    }
}
// const formatInterviewTime = (dateString: string) => {
//     const date = new Date(dateString);

//     const options: Intl.DateTimeFormatOptions = {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric',
//         hour: 'numeric',
//         minute: 'numeric',
//         hour12: true
//     };

//     return date.toLocaleString('en-US', options);
// }
const formatInterviewTime = (dateString: string) => {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };

    return date.toLocaleString('ru-RU', options);
}

export { formatDate, timeAgo, getBase64, openPDF, formatInterviewTime };