export interface paths {
    "/api/kabViewer/file/{*kabPath}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the contents of a file contained within the specified KAB file. (v1.0) */
        get: {
            parameters: {
                query?: {
                    /** @description Path of the file within the kab */
                    file?: string;
                };
                header?: never;
                path: {
                    /** @description Path of the kab to operate on. */
                    kabPath: string;
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
                        "application/octet-stream": Record<string, never>;
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
    "/api/kabViewer/extract/{*kabPath}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Extract the contents of files and directories specified in the request body to the
         *     specified directory on the local filesystem. Extraction of directories is recursive
         *     so the entire contents of the tree will be extracted. (v1.0)
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Kab to extract from. */
                    kabPath: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["e0cfc053-77ca-4ba9-aa1f-6e6ef53c5261"];
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
    "/api/kabViewer/{*kabPath}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Open the specified KAB file. This will return an object which lists information about the kab
         *     that can be used to operate on the KAB file. (v1.0)
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Path of the kab to return. */
                    kabPath: string;
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
                        "application/json": components["schemas"]["b8832633-500f-4c3f-b66f-1635f0e33f77"];
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
        "e0cfc053-77ca-4ba9-aa1f-6e6ef53c5261": components["schemas"]["ad79b63a-132e-487c-a1ed-81951f2ac7c6"][];
        "ad79b63a-132e-487c-a1ed-81951f2ac7c6": {
            dst?: string;
            src?: string;
        };
        "b8832633-500f-4c3f-b66f-1635f0e33f77": {
            file?: string;
            /** @description (typeName=com.kosdev.kos.commons.kab.KabEntry) */
            tree?: components["schemas"]["f66f9181-32bc-41d3-8d53-4098b01e38bf"];
            /** @description (typeName=com.kosdev.studio.app.service.filechooser.ChooserKabInfo) */
            header?: components["schemas"]["2a403a56-a1d3-4d06-82ec-cbd24afeb5c7"];
        };
        "f66f9181-32bc-41d3-8d53-4098b01e38bf": {
            /** @description (typeName=java.util.List<com.kosdev.kos.commons.kab.KabEntry>) */
            children?: components["schemas"]["6ab6b09f-c1b7-47fd-b821-d0e2b4477fe5"];
            permissions?: number;
            /** Format: int32 */
            flags?: number;
            name?: string;
            user?: string;
            group?: string;
        };
        "6ab6b09f-c1b7-47fd-b821-d0e2b4477fe5": components["schemas"]["f66f9181-32bc-41d3-8d53-4098b01e38bf"][];
        "2a403a56-a1d3-4d06-82ec-cbd24afeb5c7": {
            mfgAuthority?: string;
            /** @description (typeName=com.kosdev.kos.commons.util.Mode) */
            mode?: components["schemas"]["ae3735ba-5aa3-4457-8ddb-b8005e4bc177"];
            identifier?: string;
            authority?: string;
            tag?: string;
            type?: string;
            version?: string;
        };
        "ae3735ba-5aa3-4457-8ddb-b8005e4bc177": {
            value?: string;
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
