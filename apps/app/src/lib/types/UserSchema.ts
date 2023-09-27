import { z } from 'zod';

// Define custom validation messages
const validationMessages = {
    name: {
        minLength: 'Name must be at least 3 characters.',
        maxLength: 'Name must contain at most 10 characters.',
    },
    email: {
        isEmail: 'Invalid email address.',
    },
    about: {
        maxLength: 'About me section must contain at most 500 characters.',
    },
    age: {
        min: 'Age must be at least 18.',
        max: 'Age must be at most 120.',
    },
    favoriteFood: {
        invalid: 'Invalid food selection.',
    },
    slider: {
        min: 'Slider value must be at least 0.',
        max: 'Slider value must be at most 100.',
    },
    toggle: {
        isBoolean: 'Toggle value must be a boolean.',
    },
};

export const UserSchema = z.object({
    name: z.string().nonempty('Name is required.').min(3, validationMessages.name.minLength).max(10, validationMessages.name.maxLength),
    email: z.string().email(validationMessages.email.isEmail),
    about: z.string().max(500, validationMessages.about.maxLength),
    age: z.number().min(18, validationMessages.age.min).max(120, validationMessages.age.max),
    favoriteFood: z.enum(['apple', 'banana', 'coconut', 'peach', 'mango']).refine(value => value !== '', validationMessages.favoriteFood.invalid),
    slider: z.number().min(0, validationMessages.slider.min).max(100, validationMessages.slider.max),
    toggle: z.boolean().refine(value => typeof value === 'boolean', validationMessages.toggle.isBoolean),
}).required({
    name: true,
});