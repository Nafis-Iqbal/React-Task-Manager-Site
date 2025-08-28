const makeFirstLetterUppercase = (word: string | undefined): string => {
    if(word){
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
    else return "";
}

export const isNumber = (text: string): boolean => {
    return !isNaN(Number(text));
};

export const calculateRemainingDays = (date: string | Date): number => {
    const targetDate = new Date(date);
    const today = new Date();

    // Remove time part for an accurate difference
    targetDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert ms to days

    return diffDays;
};

export const checkIfSubstring = (bigString: string, subString: string): boolean => {
    if(bigString.includes(subString)){
        return true;
    }
    else {
        return false;
    }
}

export default makeFirstLetterUppercase;