export interface paths {
    "/api/updater/future": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the updater future (v1.0) */
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
                        "application/json": components["schemas"]["d4804e47-62df-4aba-a0ca-cb35811cccfd"];
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
        "d4804e47-62df-4aba-a0ca-cb35811cccfd": {
            reason?: string;
            note?: string;
            /** @description (typeName=com.kosdev.kos.commons.util.ReasonData) */
            reasonData?: components["schemas"]["347de57d-0028-4adf-a4b6-f4ccb775a3b9"];
            tracker?: string;
            /** Format: int64 */
            remainingTimeMs?: number;
            /** Format: int32 */
            progress?: number;
            /** Format: int32 */
            id?: number;
            /** @description (typeName=com.kosdev.kos.commons.util.json.JsonViewWrapper) */
            clientData?: components["schemas"]["7da837b7-a55e-4f21-8ba1-4e53f6d478dc"];
        };
        "347de57d-0028-4adf-a4b6-f4ccb775a3b9": unknown;
        "7da837b7-a55e-4f21-8ba1-4e53f6d478dc": unknown;
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
