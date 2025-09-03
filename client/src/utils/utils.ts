export const convertDateToStringNotTime = (date: any) => {
    if (
        date != null &&
        date != undefined &&
        date.toString().trim() != '' &&
        date != 'NO DATA'
    ) {
        const year = date.getFullYear();
        const month =
            date.getMonth() + 1 >= 10
                ? date.getMonth() + 1
                : `0${date.getMonth() + 1}`;
        const day =
            date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;

        return `${day}/${month}/${year}`;
    }
    return '';
};

export const convertDateToStringNotDate = (date: any) => {
    if (
        date != null &&
        date != undefined &&
        date.toString().trim() != '' &&
        date != 'NO DATA'
    ) {
        const hour =
            date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`;
        const minute =
            date.getMinutes() >= 10
                ? date.getMinutes()
                : `0${date.getMinutes()}`;
        const seconds =
            date.getSeconds() >= 10
                ? date.getSeconds()
                : `0${date.getSeconds()}`;

        return `${hour}:${minute}:${seconds}`;
    }
    return '';
};

export const convertDateToStringNotTimeNotYear = (date: any) => {
    if (
        date != null &&
        date != undefined &&
        date.toString().trim() != '' &&
        date != 'NO DATA'
    ) {
        const month =
            date.getMonth() + 1 >= 10
                ? date.getMonth() + 1
                : `0${date.getMonth() + 1}`;
        const day =
            date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;

        return `${day}/${month}`;
    }
    return '';
};

export const convertDateToStringMonth = (date: any) => {
    if (
        date != null &&
        date != undefined &&
        date.toString().trim() != '' &&
        date != 'NO DATA'
    ) {
        const year = date.getFullYear();
        const month =
            date.getMonth() + 1 >= 10
                ? date.getMonth() + 1
                : `0${date.getMonth() + 1}`;
        return `${month}/${year}`;
    }
    return '';
};

export const convertDateToStringMonthInput = (date: any) => {
    if (
        date != null &&
        date != undefined &&
        date.toString().trim() != '' &&
        date != 'NO DATA'
    ) {
        const year = date.getFullYear();
        const month =
            date.getMonth() + 1 >= 10
                ? date.getMonth() + 1
                : `0${date.getMonth() + 1}`;
        return `${year}-${month}`;
    }
    return '';
};

export const convertDateToString = (date: any) => {
    if (
        date != null &&
        date != undefined &&
        date.toString().trim() != '' &&
        date != 'NO DATA'
    ) {
        date = new Date(date);
        const year = date.getFullYear();
        const month =
            date.getMonth() + 1 >= 10
                ? date.getMonth() + 1
                : `0${date.getMonth() + 1}`;
        const day =
            date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;
        const hour =
            date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`;
        const minute =
            date.getMinutes() >= 10
                ? date.getMinutes()
                : `0${date.getMinutes()}`;
        const seconds =
            date.getSeconds() >= 10
                ? date.getSeconds()
                : `0${date.getSeconds()}`;

        return `${day}/${month}/${year} ${hour}:${minute}:${seconds}`;
    }
    return '';
};

export const convertDateToSetValueDateTimeLocalInput = (date: any) => {
    if (
        date != null &&
        date != undefined &&
        date.toString().trim() != '' &&
        date != 'NO DATA'
    ) {
        date = new Date(date);
        const year = date.getFullYear();
        const month =
            date.getMonth() + 1 >= 10
                ? date.getMonth() + 1
                : `0${date.getMonth() + 1}`;
        const day =
            date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;
        const hour =
            date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`;
        const minute =
            date.getMinutes() >= 10
                ? date.getMinutes()
                : `0${date.getMinutes()}`;

        return `${year}-${month}-${day}T${hour}:${minute}`;
    }
    return '';
};

export const convertDateToStringNotTimeForTitle = (date: any) => {
    if (
        date != null &&
        date != undefined &&
        date.toString().trim() != '' &&
        date != 'NO DATA'
    ) {
        const year = date.getFullYear();
        const month =
            date.getMonth() + 1 >= 10
                ? date.getMonth() + 1
                : `0${date.getMonth() + 1}`;
        const day =
            date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;

        return `${day}/${month}/${year}`;
    }
    return '';
};

// @ts-ignore
export const quickSort = (arr: any) => {
    if (arr.length < 2) return arr;

    // *** lấy phần tử cuối của 'arr' làm 'pivot'
    const pivotIndex = arr.length - 1;
    const pivot = arr[pivotIndex];

    const left = [];
    const right = [];

    let currentItem;
    // *** 'i < pivotIndex' => chúng ta sẽ không loop qua 'pivot' nữa
    for (let i = 0; i < pivotIndex; i++) {
        currentItem = arr[i];

        if (currentItem.SiteId[2] < pivot.SiteId[2]) {
            left.push(currentItem);
        } else {
            right.push(currentItem);
        }
    }

    return [...quickSort(left), pivot, ...quickSort(right)];
};

export const convertDateToTimeString = (time: Date) => {
    if (time !== null && time !== undefined) {
        const date = new Date(time);

        const year = date.getFullYear();

        const month =
            date.getMonth() + 1 >= 10
                ? date.getMonth() + 1
                : `0${date.getMonth() + 1}`;
        const day =
            date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;
        const hour =
            date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`;
        const minute =
            date.getMinutes() >= 10
                ? date.getMinutes()
                : `0${date.getMinutes()}`;
        const second =
            date.getSeconds() >= 10
                ? date.getSeconds()
                : `0${date.getSeconds()}`;

        return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
    }
    return '';
};

export const convertDateToDateInput = (time: Date) => {
    if (time !== null && time !== undefined) {
        const date = new Date(time);

        const year = date.getFullYear();

        const month =
            date.getMonth() + 1 >= 10
                ? date.getMonth() + 1
                : `0${date.getMonth() + 1}`;
        const day =
            date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;

        return `${year}-${month}-${day}`;
    }
    return '';
};

export const convertDateForTitleDay = (time: Date) => {
    if (time !== null && time !== undefined) {
        const date = new Date(time);

        const year = date.getFullYear();

        const month =
            date.getMonth() + 1 >= 10
                ? date.getMonth() + 1
                : `0${date.getMonth() + 1}`;
        const day =
            date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;

        return `${day}-${month}-${year}`;
    }
    return '';
};

export const roundFlowCurrentDataTableMap = (number: any) => {
    if (number === null) {
        return '';
    }

    return number.toFixed(1);
};

export const roundPressureCurrentDataTableMap = (number: any) => {
    if (number === null) {
        return '';
    }
    return number.toFixed(2);
};

export const formatNumber = (number: number | null) => {
    if (number == null) {
        return '';
    }

    return new Intl.NumberFormat('en-US', {
        style: 'decimal',
    }).format(number);
};

export const calculateHoursBetweenDates = (start: any, end: any) => {
    // Parse the dates
    const startDate = new Date(start);
    const endDate = new Date(end);

    // Calculate the difference in milliseconds
    // @ts-ignore
    const differenceInMillis = endDate - startDate;

    // Convert milliseconds to hours
    const differenceInHours = differenceInMillis / (1000 * 60 * 60);

    return differenceInHours;
};

export const getDayOfYear = (date: any) => {
    const start = new Date(date.getFullYear(), 0, 1);
    // Tính số ngày giữa ngày hiện tại và ngày đầu năm
    //@ts-ignore
    const diff = date - start;
    // Chuyển đổi từ mili giây sang ngày
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
    return dayOfYear;
};
