import React from "react";
import styles from "./Add.quiz.module.css";
import { useAddQuiz } from "../../hooks/useQuizes";
import { useForm, useFieldArray } from "react-hook-form";
import type { CreateQuizData } from "../../api/quizApi";

const AddQuiz: React.FC = () => {
        const { mutate, isPending, isSuccess, isError, error } = useAddQuiz();
        const { register, handleSubmit, reset, control, getValues, setValue, watch, formState: { errors } } = useForm<CreateQuizData>({
                defaultValues: {
                        text: "",
                        variants: [
                                { text: "", isTrue: false },
                                { text: "", isTrue: false },
                                { text: "", isTrue: false },
                                { text: "", isTrue: false },
                        ]
                }
        });

        const { fields } = useFieldArray({
                control,
                name: "variants"
        });

        const watchedVariants = watch("variants");

        const onSubmit = (data: CreateQuizData) => {
                const correctVariants = data.variants.filter(v => v.isTrue);
                if (correctVariants.length !== 1) {
                        alert("Please select exactly one correct answer");
                        return;
                }

                if (data.variants.some(v => !v.text.trim())) {
                        alert("Please fill in all variant texts");
                        return;
                }

                mutate(data, {
                        onSuccess: () => {
                                reset();
                        }
                });
        };

        return (
                <div className={styles['addquiz-container']}>
                        <h2>Add New Quiz</h2>
                        
                        {isSuccess && (
                                <div className={styles['success-message']}>
                                        Quiz added successfully!
                                </div>
                        )}
                        
                        {isError && (
                                <div className={styles['error-message']}>
                                        Error: {error?.message}
                                </div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className={styles['addquiz-form']}>
                                <label>Question</label>
                                <input
                                        {...register("text", { required: "Question is required" })}
                                        type="text"
                                        placeholder="Enter your question here"
                                        required
                                />
                                {errors.text && <span className={styles['error']}>{errors.text.message}</span>}

                                <h3>Variants</h3>
                                {fields.map((field, index) => (
                                        <div key={field.id} className={styles['variant-item']}>
                                                <input
                                                        {...register(`variants.${index}.text` as const, { 
                                                                required: "Variant text is required" 
                                                        })}
                                                        type="text"
                                                        placeholder={`Variant ${index + 1}`}
                                                        required
                                                />
                                                <label>
                                                        <input
                                                                type="radio"
                                                                name="correctAnswer"
                                                                value={index.toString()}
                                                                checked={watchedVariants?.[index]?.isTrue || false}
                                                                onChange={() => {
                                                                        const currentValues = getValues();
                                                                        const newVariants = currentValues.variants.map((_, i) => ({
                                                                                ...currentValues.variants[i],
                                                                                isTrue: i === index
                                                                        }));
                                                                        setValue('variants', newVariants);
                                                                }}
                                                        />
                                                        Correct
                                                </label>
                                        </div>
                                ))}

                                <button 
                                        type="submit" 
                                        className={styles['submit-btn']}
                                        disabled={isPending}
                                >
                                        {isPending ? 'Adding Quiz...' : 'Add Quiz'}
                                </button>
                        </form>
                </div>
        );
};

export default AddQuiz;
