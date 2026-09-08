export interface paths {
    "/api/window/{groupId}/{windowId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /** Update the settings for the specified window. (v1.0) */
        put: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Group of the window to update. */
                    groupId: string;
                    /** @description Id of the window to update. */
                    windowId: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["80c2d8f4-4a86-475c-8982-03461c3e65f2"];
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
        /** Open a new window. If already open, make visible and raise it. (v1.0) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Client supplied group for the window. */
                    groupId: string;
                    /** @description Client supplied id for the window. */
                    windowId: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["80c2d8f4-4a86-475c-8982-03461c3e65f2"];
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
        /** Close the specified window. (v1.0) */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Group of the window to close. */
                    groupId: string;
                    /** @description Id of the window to close. */
                    windowId: string;
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
    "/api/window/windows": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the list of windows. (v1.0) */
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
                        "application/json": components["schemas"]["edf9a0b2-cd01-45a3-a4a0-3be1391e212d"];
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
    "/api/window/states/{groupId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return global window states for the specified group. (v1.0) */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Group of the window to close. */
                    groupId: string;
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
                        "application/json": components["schemas"]["14643ba5-37d5-4fd7-aaeb-47f36a10a8ef"];
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
    "/api/window/monitors": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the list of monitors. (v1.0) */
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
                        "application/json": components["schemas"]["8a6fd07d-38fd-4b33-84a4-7c42208f47b6"];
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
        "80c2d8f4-4a86-475c-8982-03461c3e65f2": {
            visible?: boolean;
            /** @description (typeName=java.awt.Point) */
            size?: components["schemas"]["9c6a87e6-c8aa-4e57-8858-9b202e7887f9"];
            maximized?: boolean;
            /** @description (typeName=java.awt.Point) */
            maxSize?: components["schemas"]["9c6a87e6-c8aa-4e57-8858-9b202e7887f9"];
            /** @description (typeName=java.awt.Point) */
            minSize?: components["schemas"]["9c6a87e6-c8aa-4e57-8858-9b202e7887f9"];
            /** @description (typeName=java.awt.Point) */
            location?: components["schemas"]["9c6a87e6-c8aa-4e57-8858-9b202e7887f9"];
            title?: string;
            minimized?: boolean;
            url?: string;
            open?: boolean;
        };
        "9c6a87e6-c8aa-4e57-8858-9b202e7887f9": {
            /** Format: double */
            x?: number;
            /** Format: double */
            y?: number;
            /** @description (typeName=java.awt.Point) */
            location?: components["schemas"]["9c6a87e6-c8aa-4e57-8858-9b202e7887f9"];
        };
        "edf9a0b2-cd01-45a3-a4a0-3be1391e212d": components["schemas"]["fad34eed-99ed-4cb4-b655-6d6456c82e68"][];
        "fad34eed-99ed-4cb4-b655-6d6456c82e68": {
            /** @description (typeName=com.kosdev.kos.commons.window.WindowSettings) */
            settings?: components["schemas"]["80c2d8f4-4a86-475c-8982-03461c3e65f2"];
            groupId?: string;
            connId?: string;
            /** Format: int32 */
            zoom?: number;
            id?: string;
        };
        "14643ba5-37d5-4fd7-aaeb-47f36a10a8ef": components["schemas"]["fa1a0dc9-6313-488d-9339-4390d2c36f2b"][];
        "fa1a0dc9-6313-488d-9339-4390d2c36f2b": {
            visible?: boolean;
            groupId?: string;
            closed?: boolean;
            windowId?: string;
            /** Format: int64 */
            timestamp?: number;
        };
        "8a6fd07d-38fd-4b33-84a4-7c42208f47b6": components["schemas"]["fc8be4c9-c11f-4382-a539-e89e00d5f634"][];
        "fc8be4c9-c11f-4382-a539-e89e00d5f634": {
            /** @description (typeName=org.eclipse.swt.graphics.Rectangle) */
            clientArea?: components["schemas"]["8b083223-4bc1-4372-85be-177469897d80"];
            /** @description (typeName=org.eclipse.swt.graphics.Rectangle) */
            bounds?: components["schemas"]["8b083223-4bc1-4372-85be-177469897d80"];
            /** Format: int32 */
            zoom?: number;
        };
        "8b083223-4bc1-4372-85be-177469897d80": {
            empty?: boolean;
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
