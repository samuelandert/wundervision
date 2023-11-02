export const view = {
    id: 'Test',
    layout: {
        areas: `
			"main"
		`
    },
    children: [
        {
            id: 'Todos',
            component: 'Todos',
            slot: 'main',
            queries: [{ operation: 'Countries', input: { filter: { code: { eq: 'SA' } } } }],
        }
    ]
}