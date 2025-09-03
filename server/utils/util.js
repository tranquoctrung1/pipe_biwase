module.exports.CalculateSpcaeDay = (start, end) => {
    let tempStart = new Date(parseInt(start));
    let tempEnd = new Date(parseInt(end));

    if (
        tempStart.getMonth() == tempEnd.getMonth() &&
        tempStart.getFullYear() == tempEnd.getFullYear() &&
        tempStart.getDate() == tempEnd.getDate()
    ) {
        return 1;
    }

    let difference = tempEnd.getTime() - tempStart.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return TotalDays + 1;
};

module.exports.CalculateSpaceHour = (start, end) => {
    let tempStart = new Date(parseInt(start));
    let tempEnd = new Date(parseInt(end));

    var diff = Math.abs(tempStart.getTime() - tempEnd.getTime()) / 3600000;
    return diff + 1;
};

module.exports.CalculateSpaceMonth = (start, end) => {
    let tempStart = new Date(parseInt(start));
    let tempEnd = new Date(parseInt(end));

    if (
        tempStart.getMonth() == tempEnd.getMonth() &&
        tempStart.getFullYear() == tempEnd.getFullYear()
    ) {
        return 1;
    }

    var months;
    months = (tempEnd.getFullYear() - tempStart.getFullYear()) * 12;
    months -= tempStart.getMonth();
    months += tempEnd.getMonth();
    return months <= 0 ? 0 : months + 1;
};

module.exports.CalculateSpaceYear = (start, end) => {
    let tempStart = new Date(parseInt(start));
    let tempEnd = new Date(parseInt(end));

    if (tempStart.getFullYear() == tempEnd.getFullYear()) {
        return 1;
    }

    var year = tempEnd.getFullYear() - tempStart.getFullYear();
    return year + 1;
};

const hexToRgb = (hex) => {
    // Xóa bỏ ký tự '#' nếu có
    hex = hex.replace(/^#/, '');

    // Chuyển đổi mỗi cặp ký tự thành giá trị thập phân
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    return [r, g, b];
};

const rgbToHex = (r, g, b) => {
    return (
        '#' +
        ((1 << 24) + (r << 16) + (g << 8) + b)
            .toString(16)
            .slice(1)
            .toUpperCase()
    );
};

module.exports.lightenColor = (hex, percent) => {
    let rgb = hexToRgb(hex);

    // Tăng giá trị RGB theo tỷ lệ phần trăm, nhưng không vượt quá 255
    let lighterRgb = rgb.map((channel) => {
        return Math.min(Math.floor(channel + (255 - channel) * percent), 255);
    });

    // Chuyển đổi lại màu RGB đã điều chỉnh thành HEX
    return rgbToHex(lighterRgb[0], lighterRgb[1], lighterRgb[2]);
};

module.exports.CalcDayInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
};

module.exports.CalcDayInYear = (year) => {
    return (year % 4 === 0 && year % 100 > 0) || year % 400 == 0 ? 366 : 365;
};

module.exports.findMinFlow = (data) => {
    let min = null;

    if (data[0] !== null) {
        min = data[0].Value;
    }
    for (let i = 1; i < data.length; i++) {
        if (data[i] !== null) {
            if (data[i].Value < min) {
                min = data[i].Value;
            }
        }
    }
    return min;
};

module.exports.findMaxFlow = (data) => {
    let max = null;

    if (data[0] !== null) {
        max = data[0].Value;
    }
    for (let i = 1; i < data.length; i++) {
        if (data[i] !== null) {
            if (data[i].Value > max) {
                max = data[i].Value;
            }
        }
    }
    return max;
};

module.exports.calcAvgFlow = (data) => {
    let sum = 0;
    let count = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i] !== null) {
            sum += data[i].Value;
            count += 1;
        }
    }
    if (count == 0) {
        count = 1;
    }

    return sum / count;
};
