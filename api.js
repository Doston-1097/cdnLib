const getInfo = async (word) => {
    return await axios.get(`https://api.cdnjs.com/libraries/${word}`);
};
const get20 = async () => {
    return await axios.get(`https://api.cdnjs.com/libraries?limit=20`);
};
const get21 = async (links) => {
    return await axios.get(`https://api.cdnjs.com/libraries/${links}`);
};