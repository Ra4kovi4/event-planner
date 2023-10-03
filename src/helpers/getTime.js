export const getTime = number => {
    let arr = [];
    for (let i = 0; i < number; i += 1) {
        arr.push(String(i));
    }
    return arr;
};
