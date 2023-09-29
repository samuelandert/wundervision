// apps/slube/src/lib/core/queryLoader.ts
import { writable } from 'svelte/store';
import { coreServices } from './services';

// The store that holds the data sets
export const queryStore = writable({});

// Assign the data modules to the store
const dataSources = [];

dataSources.forEach(dataSource => {
    Object.entries(dataSource).forEach(([name, getModule]) => {
        const moduleData = getModule();
        queryStore.update(store => ({ ...store, [name]: moduleData }));
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