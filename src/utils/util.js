function toTitleCase(sentence) {
    return sentence
        .split(' ')
        .map((word, index) => {
            const lowerCaseWords = ['and', 'or', 'but', 'the', 'a', 'an', 'in', 'on', 'at', 'for', 'nor', 'so', 'to', 'by', 'with'];
            if (index === 0 || index === sentence.split(' ').length - 1 || !lowerCaseWords.includes(word.toLowerCase())) {
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            } else {
                return word.toLowerCase();
            }
        })
        .join(' ');
}

export { toTitleCase }