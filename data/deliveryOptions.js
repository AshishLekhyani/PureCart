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

export function recalibrateDate(givenTime) {
    const currentTime = dayjs();
    const estimatedTime = dayjs(givenTime);
    let recalibratedTime = currentTime;

    let daysRem = estimatedTime.diff(currentTime, 'days') + 1;

    while(daysRem > 0) {
        recalibratedTime = recalibratedTime.add(1, 'days');
        
        if (recalibratedTime.format('dddd') !== 'Saturday' && recalibratedTime.format('dddd') !== 'Sunday') {
            daysRem--;
        }
    }

    return recalibratedTime;
}