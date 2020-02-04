export const isValidEmail = email => {
    const isEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;
    return isEmailRegex.test(email);
};