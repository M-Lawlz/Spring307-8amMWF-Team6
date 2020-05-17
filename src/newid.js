let lastId = 5;

export default function(prefix='id') {
    lastId++;
    return `${prefix}${lastId}`;
}