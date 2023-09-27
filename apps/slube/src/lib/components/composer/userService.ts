// userService.ts
export function createUser(name: string, email: string): Promise<string> {
    return new Promise((resolve, reject) => {
        // Simulating an API call.
        setTimeout(() => {
            if (name && email) {
                resolve('User created successfully');
            } else {
                reject(new Error('Failed to create user'));
            }
        }, 2000);
    });
}
