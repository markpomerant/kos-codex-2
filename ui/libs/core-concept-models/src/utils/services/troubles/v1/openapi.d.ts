export interface paths {
    "/api/troubles": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return all available troubles. (v1.0) */
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
                        "application/json": components["schemas"]["63a5a1db-ff4b-4364-9fcd-ede454afed41"];
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
    "/api/troubles/resolve": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Attempt to resolve all the trouble id's listed in the request body. Troubles marked as
         *     resolvable can generally execute logic that will resolve the underlying issue without
         *     the caller needing any knowledge or details of the underlying process. It a trouble
         *     is successfully resolved it will be removed from the list, otherwise it will remain
         *     in the list. (v1.0)
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["8e9aae11-4174-4f14-b9e1-55e14fbbf358"];
                };
            };
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
    "/api/troubles/resolve/{troubleId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Attempt to resolve the specified trouble. Troubles marked as resolvable can generally
         *     execute logic that will resolve the underlying issue without the caller needing any
         *     knowledge or details of the underlying process. It a trouble is successfully resolved
         *     it will be removed from the list, otherwise it will remain in the list. (v1.0)
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Id of the trouble to resolve. */
                    troubleId: string;
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
    "/api/troubles/{troubleId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the specified trouble. (v1.0) */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Id of the trouble to return. */
                    troubleId: string;
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
                        "application/json": components["schemas"]["def21ed3-90f2-4111-81c3-bdde1691d198"];
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
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        "63a5a1db-ff4b-4364-9fcd-ede454afed41": components["schemas"]["def21ed3-90f2-4111-81c3-bdde1691d198"][];
        "def21ed3-90f2-4111-81c3-bdde1691d198": {
            reason?: string;
            /** Format: date-time */
            createTime?: string;
            resolvable?: boolean;
            /** @description (typeName=java.util.Set<java.lang.String>) */
            ifaces?: components["schemas"]["212c6772-9d19-41fa-a6d8-2b8501b073f4"];
            /** @description (typeName=java.util.Map<java.lang.String, com.kosdev.kos.commons.util.json.JsonViewWrapper>) */
            clientAttributes?: components["schemas"]["c239dfd3-5453-4322-b7cc-3dd21b175105"];
            id?: string;
            /** @description (typeName=com.kosdev.kos.commons.util.json.JsonViewWrapper) */
            clientData?: components["schemas"]["984ebf7e-f746-4d85-83f1-19022b960427"];
            type?: string;
            /** @description (typeName=java.util.Set<java.lang.String>) */
            tags?: components["schemas"]["212c6772-9d19-41fa-a6d8-2b8501b073f4"];
            group?: string;
        };
        "212c6772-9d19-41fa-a6d8-2b8501b073f4": string[];
        /** @description (typeName=com.kosdev.kos.commons.util.json.JsonViewWrapper) */
        "c239dfd3-5453-4322-b7cc-3dd21b175105": components["schemas"]["984ebf7e-f746-4d85-83f1-19022b960427"];
        "984ebf7e-f746-4d85-83f1-19022b960427": unknown;
        "8e9aae11-4174-4f14-b9e1-55e14fbbf358": string[];
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
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
