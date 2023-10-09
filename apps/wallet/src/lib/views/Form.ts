import { UserSchema } from "../composables/UserSchema";

export const view = {
    id: 'FormContainer',
    layout: {
        rows: '1fr auto',
        areas: `
            "main "
        `
    },
    children: [
        {
            id: 'ComposerForm',
            component: 'ComposerForm',
            slot: 'main',
            machine: {
                id: 'validation',
                initial: 'notValidated',
                context: {
                    fields: [
                        {
                            name: 'email',
                            type: 'email',
                            title: 'What is your email?',
                            description: 'Please enter your email'
                        },
                        {
                            name: 'name',
                            type: 'text',
                            title: 'What is your name?',
                            description: 'Please enter your name'
                        }
                    ],
                    validators: UserSchema
                },
                states: {
                    notValidated: {
                        on: {
                            VALIDATE: {
                                target: 'isValidated',
                                actions: 'setValidated'
                            }
                        }
                    },
                    isValidated: {
                        on: {
                            INVALIDATE: {
                                target: 'notValidated',
                                actions: 'setNotValidated'
                            }
                        }
                    }
                }
            }
        }
    ]
};