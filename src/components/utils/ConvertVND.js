import React from 'react'

const convertVND = (string) => {
    string = string.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
    return string;
}

export default convertVND