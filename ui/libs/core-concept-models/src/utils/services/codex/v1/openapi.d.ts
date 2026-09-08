export interface paths {
    "/api/codex/test/objects/race": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Add an object out of band, publish it, then return the list after a delay (v1.0) */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["a585f94b-b0d2-4239-a656-b2a0b0a9f5cf"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/codex/test/objects/removed": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Remove the highest-id object out of band and publish it on the removed topic (v1.0) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["7b8f9084-e4f6-4a34-a404-5e7feb33c630"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/codex/test/objects/added": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Add an object out of band and publish it on the added topic (v1.0) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["7b8f9084-e4f6-4a34-a404-5e7feb33c630"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/codex/test/troubles/raise": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Raise the resolvable codex session trouble (v1.0) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/codex/test/troubles/remove": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Remove the codex session trouble (v1.0) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/codex/test/event": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Publish the given payload on the given topic (v1.0) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["8387fbdd-8662-4256-99af-95ccb8b6f0f6"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/codex/objects": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the list of objects. (v1.0) */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["a585f94b-b0d2-4239-a656-b2a0b0a9f5cf"];
                    };
                };
            };
        };
        put?: never;
        /** Add an item to the list and return it (v1.0) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["7b8f9084-e4f6-4a34-a404-5e7feb33c630"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["7b8f9084-e4f6-4a34-a404-5e7feb33c630"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/codex/objects/additional-data/{numOfItems}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Return the Future Work of Additional Data (v1.0) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Number of items to operate on */
                    numOfItems: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["cef11873-6a5e-4b21-a4ae-dd029a36f6f4"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/codex/objects/stats": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the count of objects and when it was computed (v1.0) */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["602a22ae-23de-4fb5-a728-ba649cea7f0f"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/codex/objects/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return one item from the list (v1.0) */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description The object id to return */
                    id: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["7b8f9084-e4f6-4a34-a404-5e7feb33c630"];
                    };
                };
            };
        };
        /** Modify an item from the list and return it (v1.0) */
        put: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description The object id to modify */
                    id: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["7b8f9084-e4f6-4a34-a404-5e7feb33c630"];
                    };
                };
            };
        };
        post?: never;
        /** remove an item from the list (v1.0) */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description The object id to remove */
                    id: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        "a585f94b-b0d2-4239-a656-b2a0b0a9f5cf": components["schemas"]["7b8f9084-e4f6-4a34-a404-5e7feb33c630"][];
        "7b8f9084-e4f6-4a34-a404-5e7feb33c630": {
            /** Format: int32 */
            id?: number;
            desc?: string;
        };
        "8387fbdd-8662-4256-99af-95ccb8b6f0f6": {
            payload?: Record<string, never>;
            topic?: string;
        };
        "cef11873-6a5e-4b21-a4ae-dd029a36f6f4": {
            reason?: string;
            note?: string;
            /** @description (typeName=com.kosdev.kos.commons.util.ReasonData) */
            reasonData?: components["schemas"]["15676a30-551a-42b1-9e09-2181397594f0"];
            /** @description (typeName=com.kosdev.kos.commons.util.concurrent.future.FutureState) */
            endState?: components["schemas"]["439c5a68-3e8d-4f7b-a617-d35d5e4bbd70"];
            /** Format: int32 */
            abortAbandonedTimeoutMs?: number;
            /** @description (typeName=com.kosdev.kos.commons.util.concurrent.future.FutureWork) */
            rootFuture?: components["schemas"]["cef11873-6a5e-4b21-a4ae-dd029a36f6f4"];
            tracker?: string;
            /** Format: int64 */
            remainingTimeMs?: number;
            name?: string;
            /** Format: int32 */
            progress?: number;
            /** @description (typeName=java.util.Map<java.lang.String, com.kosdev.kos.commons.util.json.JsonViewWrapper>) */
            clientAttributes?: components["schemas"]["0399045e-fc87-4b7d-8cfc-aa2036a0827e"];
            /** Format: int32 */
            id?: number;
            /** @description (typeName=com.kosdev.kos.commons.util.json.JsonViewWrapper) */
            clientData?: components["schemas"]["df23cb99-a783-4668-a306-1239a2e4074e"];
        };
        "15676a30-551a-42b1-9e09-2181397594f0": {
            /** @description (typeName=java.lang.Class<?>) */
            view?: components["schemas"]["85ed52b3-600a-412f-902a-de9ebee20dc1"];
            data?: Record<string, never>;
        };
        "85ed52b3-600a-412f-902a-de9ebee20dc1": unknown;
        "439c5a68-3e8d-4f7b-a617-d35d5e4bbd70": {
            cancel?: boolean;
            fail?: boolean;
            abort?: boolean;
            success?: boolean;
            unsuccess?: boolean;
            /** @description (typeName=com.kosdev.kos.commons.util.concurrent.future.FutureEvent) */
            futureEvent?: components["schemas"]["76a0af67-5390-47cf-aa88-1eb98abc6799"];
            terminate?: boolean;
            done?: boolean;
        };
        "76a0af67-5390-47cf-aa88-1eb98abc6799": unknown;
        /** @description (typeName=com.kosdev.kos.commons.util.json.JsonViewWrapper) */
        "0399045e-fc87-4b7d-8cfc-aa2036a0827e": components["schemas"]["df23cb99-a783-4668-a306-1239a2e4074e"];
        "df23cb99-a783-4668-a306-1239a2e4074e": {
            /** @description (typeName=java.lang.Class<?>) */
            view?: components["schemas"]["85ed52b3-600a-412f-902a-de9ebee20dc1"];
            data?: Record<string, never>;
        };
        "602a22ae-23de-4fb5-a728-ba649cea7f0f": {
            computedAt?: string;
            /** Format: int32 */
            count?: number;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
