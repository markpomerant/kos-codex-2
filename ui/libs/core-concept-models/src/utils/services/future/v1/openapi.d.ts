export interface paths {
    "/api/future/traces": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Return the list of available future traces. Every future captures a trace of events that
         *     allow the future to be analyzed. A future can also declare itself a child of another future
         *     in which case the trace for the child future becomes a child of the parent trace which
         *     ensures that parent traces can be analyzed with full context. The future service maintains
         *     a limited queue of traces and this endpoint returns the contents of the queue. This
         *     only includes the trace objects which describe structure and existence but no events.
         *     Use the events endpoint to fetch the event list for any future in the trace
         *
         *     As trace data is held in a queue, new traces will cause existing traces to be removed
         *     which means event data may not be available some time after this endpoint reports
         *     the existence of the trace. (v1.0)
         */
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
                        "application/json": components["schemas"]["213a4ce4-0a7b-40a3-b953-6dc93a4dfb86"];
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
    "/api/future/traces/{traceId}/events": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Return the events for the specified trace. Since traces are held in a queue in future service
         *     it's possible that new traces have pushed previous traces out of the queue and the events are
         *     no longer available.
         *
         *     Event data contains both timestamps and an index. While the timestamps are ms resolution,
         *     this may not be sufficient to determine event order. The index is global across every
         *     trace event and should be used to determine the order of events. (v1.0)
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Id of the trace to return events for. */
                    traceId: number;
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
                        "application/json": components["schemas"]["6871880f-e3f7-44c6-9a19-51816a10fa3c"];
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
    "/api/future/active": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the list of currently active futures. (v1.0) */
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
                        "application/json": components["schemas"]["65a34e67-ca90-4166-9b2f-3b8de470bb14"];
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
    "/api/future/{futureId}/cancel": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Cancel the specified future if not already completed. (v1.0) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Id of the future to cancel. */
                    futureId: number;
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
        "213a4ce4-0a7b-40a3-b953-6dc93a4dfb86": components["schemas"]["e3ead04c-9c28-408d-84cc-5cbd071190be"][];
        "e3ead04c-9c28-408d-84cc-5cbd071190be": {
            /** Format: int64 */
            runStartTime?: number;
            /** Format: int64 */
            createTime?: number;
            /** Format: int64 */
            runEndTime?: number;
            /** @description (typeName=java.util.List<com.kosdev.kos.commons.util.concurrent.future.trace.FutureTrace>) */
            children?: components["schemas"]["e8916523-4f8c-4002-bb9a-300b13191995"];
            /** @description (typeName=com.kosdev.kos.commons.util.concurrent.future.FutureState) */
            endState?: components["schemas"]["439c5a68-3e8d-4f7b-a617-d35d5e4bbd70"];
            name?: string;
            /** Format: int64 */
            endTime?: number;
            /** Format: int32 */
            id?: number;
            /** Format: int32 */
            parentId?: number;
        };
        "e8916523-4f8c-4002-bb9a-300b13191995": components["schemas"]["e3ead04c-9c28-408d-84cc-5cbd071190be"][];
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
        "6871880f-e3f7-44c6-9a19-51816a10fa3c": components["schemas"]["72241a43-8f64-4baa-8a04-a9121c7c92cc"][];
        "72241a43-8f64-4baa-8a04-a9121c7c92cc": {
            ex?: string;
            /** Format: date-time */
            time?: string;
            /** Format: int32 */
            idx?: number;
            type?: string;
        };
        "65a34e67-ca90-4166-9b2f-3b8de470bb14": components["schemas"]["8bdf3e54-9a18-474f-af0b-5f5e2522c0b3"][];
        "8bdf3e54-9a18-474f-af0b-5f5e2522c0b3": {
            /** @description (typeName=java.util.Set<java.lang.String>) */
            clientAddrs?: components["schemas"]["75837275-c8b7-4133-9bf1-8433aae4fb60"];
            /** @description (typeName=com.kosdev.kos.commons.util.concurrent.future.FutureWork) */
            future?: components["schemas"]["01d63af1-24c4-4dfb-abec-31c22a6fecca"];
            /** Format: int32 */
            postEstimateAbortMs?: number;
        };
        "75837275-c8b7-4133-9bf1-8433aae4fb60": string[];
        "01d63af1-24c4-4dfb-abec-31c22a6fecca": {
            reason?: string;
            note?: string;
            /** @description (typeName=com.kosdev.kos.commons.util.ReasonData) */
            reasonData?: components["schemas"]["aae22ec0-94c6-49fc-ac97-90be13be3382"];
            /** @description (typeName=com.kosdev.kos.commons.util.concurrent.future.FutureState) */
            endState?: components["schemas"]["9edabbec-6b0e-4eb2-94c8-29dc20e1e863"];
            tracker?: string;
            /** Format: int64 */
            remainingTimeMs?: number;
            /** Format: int32 */
            progress?: number;
            /** Format: int32 */
            id?: number;
            /** @description (typeName=com.kosdev.kos.commons.util.json.JsonViewWrapper) */
            clientData?: components["schemas"]["3bb8a0d8-fbb2-4f9e-b827-8b61b3f289a0"];
        };
        "aae22ec0-94c6-49fc-ac97-90be13be3382": unknown;
        "9edabbec-6b0e-4eb2-94c8-29dc20e1e863": unknown;
        "3bb8a0d8-fbb2-4f9e-b827-8b61b3f289a0": unknown;
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
