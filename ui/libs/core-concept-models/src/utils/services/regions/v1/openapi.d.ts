export interface paths {
    "/api/regions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the list of known regions (v1.0) */
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
                        "application/json": components["schemas"]["ca951f7f-3d3a-402b-a050-89540359f351"];
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
    "/api/regions/info": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return available unit systems and time / date formats. (v1.0) */
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
                        "application/json": components["schemas"]["cc3474d4-7065-487c-816e-fcea2f881019"];
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
        "ca951f7f-3d3a-402b-a050-89540359f351": components["schemas"]["a39bd661-eefe-43d9-b979-87a7dd3e31fd"][];
        "a39bd661-eefe-43d9-b979-87a7dd3e31fd": {
            country?: string;
            timeFormatId?: string;
            unitSystemId?: string;
            hidden?: boolean;
            id?: string;
            /** @description (typeName=java.util.List<java.lang.String>) */
            timeZones?: components["schemas"]["8e9aae11-4174-4f14-b9e1-55e14fbbf358"];
            dateFormatId?: string;
        };
        "8e9aae11-4174-4f14-b9e1-55e14fbbf358": string[];
        "cc3474d4-7065-487c-816e-fcea2f881019": {
            /** @description (typeName=java.util.Collection<com.kosdev.kos.commons.util.format.date.DateFormat>) */
            dateFormats?: components["schemas"]["50928b4a-c310-40ff-ae23-32d6b99b133d"];
            /** @description (typeName=java.util.Collection<com.kosdev.kos.commons.util.units.UnitSystem>) */
            unitSystems?: components["schemas"]["7019f234-634e-4d38-bb88-6f2256b5dcaa"];
            /** @description (typeName=java.util.Collection<com.kosdev.kos.commons.util.format.time.TimeFormat>) */
            timeFormats?: components["schemas"]["66edf350-27b6-4473-8882-f424f786ff74"];
        };
        "50928b4a-c310-40ff-ae23-32d6b99b133d": components["schemas"]["a13a5fbe-5fdc-47cc-ae39-8d1673cada12"][];
        "a13a5fbe-5fdc-47cc-ae39-8d1673cada12": {
            format?: string;
            id?: string;
            order?: string;
        };
        "7019f234-634e-4d38-bb88-6f2256b5dcaa": components["schemas"]["f06138d9-3c39-43c2-afca-6404170d55d3"][];
        "f06138d9-3c39-43c2-afca-6404170d55d3": {
            id?: string;
            /** @description (typeName=java.util.Set<com.kosdev.kos.commons.util.units.Unit>) */
            units?: components["schemas"]["8f4d6bcd-956d-451d-b6b7-8407151c01de"];
        };
        "8f4d6bcd-956d-451d-b6b7-8407151c01de": components["schemas"]["f7fa395f-6897-420d-bd40-a060659a6eb7"][];
        "f7fa395f-6897-420d-bd40-a060659a6eb7": {
            default?: boolean;
            measure?: string;
            /** Format: double */
            offset?: number;
            /** Format: int32 */
            decimals?: number;
            name?: string;
            /** Format: double */
            scale?: number;
            alias?: string;
        };
        "66edf350-27b6-4473-8882-f424f786ff74": components["schemas"]["2486dae4-ce44-4b35-90ab-742cc554fccc"][];
        "2486dae4-ce44-4b35-90ab-742cc554fccc": {
            ampm?: boolean;
            format?: string;
            id?: string;
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
