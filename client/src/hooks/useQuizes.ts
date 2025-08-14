import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addQuiz, getQuiz } from "../api/quizApi"

export const useAddQuiz = () => {
        const queryClient = useQueryClient();
        
        return useMutation({
                mutationFn: addQuiz,
                mutationKey: ['add-quiz'],
                onSuccess: () => {
                        queryClient.invalidateQueries({ queryKey: ['quizzes'] });
                },
                onError: (error: Error) => {
                        console.error('Failed to add quiz:', error.message);
                }
        })
}

export const useGetQuiz = () => {
        return useQuery({
                queryKey: ['quizzes'],
                queryFn: getQuiz,
                staleTime: 5 * 60 * 1000,
                refetchOnWindowFocus: false
        });
}