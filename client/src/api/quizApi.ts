import api from "./instance";

export interface QuizVariant {
    text: string;
    isTrue: boolean;
}

export interface CreateQuizData {
    text: string;
    variants: QuizVariant[];
}

export const addQuiz = async (data: CreateQuizData) => {
    try {
        const response = await api.post('/quiz', data);
        return response.data;
    } catch (error: any) {
        console.log("bu error", error);
        
        const errorMessage = error.response?.data?.message || 'Add quiz failed';
        throw new Error(errorMessage);
    }
};

export const getQuiz = async () => {
    try {
        const response = await api.get('/quiz',);
        return response.data;
    } catch (error: any) {
        console.log("bu error", error);
        
        const errorMessage = error.response?.data?.message || 'Add quiz failed';
        throw new Error(errorMessage);
    }
};