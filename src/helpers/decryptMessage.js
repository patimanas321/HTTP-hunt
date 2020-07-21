function decryptMessage(encryptedMessage, key) {
    return [...encryptedMessage].map(char => decryptChar(char, key)).join('');
}

function decryptChar(char, key) {
    const upperCaseStart = 65;
    const upperCaseEnd = 90;
    const lowerCaseStart = 97;
    const lowerCaseEnd = 122;

    let charCode = char.charCodeAt(0);
    key = key % 26;

    const isUpperCaseLetter = (upperCaseStart <= charCode && charCode <= upperCaseEnd);
    const isLowerCaseLetter = (lowerCaseStart <= charCode && charCode <= lowerCaseEnd);
    if (isUpperCaseLetter || isLowerCaseLetter) {
        charCode = charCode - key;

        // Handle rotation
        if (isUpperCaseLetter && charCode < upperCaseStart) {
            charCode = upperCaseEnd - (upperCaseStart - charCode) + 1;
        } else if (isLowerCaseLetter && charCode < lowerCaseStart) {
            charCode = lowerCaseEnd - (lowerCaseStart - charCode) + 1;
        }

        return String.fromCharCode(charCode);
    }

    return char;
}

module.exports = decryptMessage;
