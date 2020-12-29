export const json = response => response.json();

export const handleRes = response => {
    if (response.ok){
        return response;
    }
    throw new Error('404 or 500 error');
};


export const handleError = error => {
    console.log(error);
}