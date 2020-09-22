export const maths_api = async (url) => {
    const response = await fetch(url)
        .then((response) => response.json())
        .catch((err) => {
            console.log(err);
            return {};
        });
    const data = await response;
    // console.log(data);
    return data;
};
