// dataLoader.ts
import dataSources from 'virtual:data-sources-list';
import { writable } from 'svelte/store';
import { coreServices } from './coreServices';

// The store that holds the data sets
export const queryStore = writable({});

// Dynamically import the data modules and assign them to the store
dataSources.forEach(src => {
    import(`/src/lib/data/${src}.ts`).then(module => {
        const moduleData = module[src] || module.default;
        queryStore.update(store => ({ ...store, [src]: moduleData }));
    });
});

export function subscribeAndMapQueries(id: string, queryMap: Record<string, any>) {
    Object.entries(queryMap).forEach(([name, query]) => {
        query.subscribe((value) => {
            if (value) {
                coreServices.mutateStore(id, { [name]: value });
            }
        });
    });
}