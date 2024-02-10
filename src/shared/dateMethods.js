const getHour = date => date.toLocaleTimeString('he-IL', {
    hour: '2-digit',
    minute: '2-digit',
});

export { getHour };