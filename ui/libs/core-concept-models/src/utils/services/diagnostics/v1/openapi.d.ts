export interface paths {
    "/api/diagnostics/settings": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Export the studio settings info [version, UI KABs, path info] to Azure (v1.0) */
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
    "/api/diagnostics/log": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Export the studio live log file to Azure (v1.0) */
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
    "/api/diagnostics/db": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Export the studio database to Azure (v1.0) */
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
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
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
