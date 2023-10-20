export const view = {
    id: 'Test',
    layout: {
        columns: '300px 1fr',
        areas: `
			"left right"
		`
    },
    children: [
        {
            id: 'Todos',
            component: 'Todos',
            slot: 'right',
            queries: [{ operation: 'Countries', input: { filter: { code: { eq: 'ES' } } } }],
        }
    ]
}