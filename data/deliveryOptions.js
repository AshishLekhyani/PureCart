import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [
    {
        id: '1',
        deliveryDays: 7,
        priceCents: 0
    },
    {
        id: '2',
        deliveryDays: 3,
        priceCents: 499
    },
    {
        id: '3',
        deliveryDays: 1,
        priceCents: 999
    }
];

export function getDeliveryOption(deliveryOptionId) {
    let deliveryOption;

    deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId) {
            deliveryOption = option;
        }
    });

    return deliveryOption || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryOption) {
    let days = deliveryOption.deliveryDays;
    let deliveryDate = dayjs();
    while (days > 0) {
        deliveryDate = deliveryDate.add(1, 'days');
        
        if (deliveryDate.format('dddd') !== 'Saturday' && deliveryDate.format('dddd') !== 'Sunday') {
            days--;
        }
    }

    const dateString = deliveryDate.format('dddd, MMMM D');
    return dateString;
}

export function recalibrateDate(orderPlacedAt, apiDeliveryDate) {
    const start = dayjs(orderPlacedAt).startOf('day');
    const end = dayjs(apiDeliveryDate).startOf('day');

    let days = end.diff(start, 'day');
    if (days <= 0) return start;

    let result = start.clone();

    // 1️⃣ Add full business weeks
    const fullWeeks = Math.floor(days / 5);
    result = result.add(fullWeeks * 7, 'day');
    days -= fullWeeks * 5;

    // 2️⃣ Handle remaining business days
    while (days > 0) {
        result = result.add(1, 'day');

        const d = result.day(); // 0 = Sun, 6 = Sat
        if (d !== 0 && d !== 6) {
            days--;
        }
    }

    return result;
}
