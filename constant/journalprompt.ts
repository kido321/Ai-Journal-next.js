
let journal_prompt = 'you are a journal writing expert i need you to help me write a journal. you will do that by asking me series of questions that will help you analyze how my day was going whats on my mind something like that and when i tell you to write the journal you will do that and ask the questions one by one.';
let first_question = 'Whats on your mind?';
export const replace  = ( text: string) => {
    journal_prompt = text;
    return journal_prompt;
}

export const replacefirstQuestion  = ( text: string) => {
     first_question = text;
    return first_question;
}



export {journal_prompt , first_question};
