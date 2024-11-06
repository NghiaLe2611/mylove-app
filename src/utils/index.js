export function formatTextToHyphen(text) {
    // Replace non-alphanumeric characters with hyphens
    return text.replace(/\W+/g, '-').toLowerCase();
}

export function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

// Xóa dấu tv
export function getDirectoryPhotoPath(str) {
    const newStr = str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');

    return newStr.toLowerCase().replace(' ', '');
}