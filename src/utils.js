import { words } from "./words"

export function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)]
}

export function getFarewellText(language) {
    const options = [
        `${language} bruhhh 🥀🥀🥀🥀 skill issue`,
        `Adios, ${language}`,
        `R.I.P., ${language}`,
        `We won't miss you, ${language}`,
        `Oh no, not ${language}, ehh nobody cares`,
        `${language} takes the L`,
        `Gone but forgotten, ${language}`,
        `The end of ${language} as we know it, and as it should`,
        `${language}, it's been real`,
        `${language}, your watch has ended`,
        `${language} has left the building`,
        `Nobody likes ${language} anyways`,
        ``
    ];

    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}