export interface paths {
    "/api/config/schema": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Return schema data about all known config data. This describes the structure of every known
         *     ConfigBean. This is used by KOS Studio tools. (v1.0)
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
                        "application/json": components["schemas"]["f590f2d5-1d73-42cd-ac7e-b1662a16e079"];
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
    "/api/config/schema/{path}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Return schema data about the ConfigBean identified by the handle path. This describes
         *     the structure of the config bean for use by tools in KOS Studio. (v1.0)
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Handle path for the ConfigBean */
                    path: string;
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
                        "application/json": components["schemas"]["c84a0ec9-12a0-4a8f-8923-7f5c1cd81561"];
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
    "/api/config/{path}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Return the ConfigBean associated with the specified handle path. This is actual
         *     configuration object in memory and reflects the actual configuration values
         *     visible to the associated bean. This only works for beans that exist on this node. (v1.0)
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description The handle path to a bean containing a configuration. */
                    path: string;
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
                        "application/json": components["schemas"]["5b19bc5b-94c2-47eb-a108-fdc1af279779"];
                    };
                };
            };
        };
        put?: never;
        /**
         * Update the ConfigBean associated with the specified handle path. This will update
         *     the actual configuration object in memory as well as update the database to persist
         *     the changes so they will be applied on reboot.
         *
         *     If a value is set to the default value then the new value will not be stored in
         *     the database and any previous value will be removed. This allows changes in default
         *     values to be made in future release without having the old defaults locked into the
         *     database.
         *
         *     Whether an object reacts in real time to changes in the configuration is up to the
         *     implementation of the bean. (v1.0)
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description The handle path to a bean configuration to update. */
                    path: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["5cb56c4a-3fc3-4596-b78d-a16b38c7b6af"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["a39931bd-8313-4332-b9e7-fa558c900e0f"];
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
    "/api/config/details/{options}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Return configuration details from all available ConfigSources. This will return both
         *     default values and override values for all handle paths known by all sources. This is
         *     useful for tooling and for inspecting what changes have been persisted in the config
         *     service.
         *
         *     A stock KOS install defines default values as the initial values of a config bean as
         *     set in the bean constructor with any values from system xml files loaded on top.
         *     Override values are any changes applied via endpoints which are persisted in the database.
         *
         *     As it is also possible to insert new ConfigSources into the config service which can
         *     have higher priority than other sources, this is also useful to see what the effective
         *     default and override values are for the active sources. (v1.0)
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /**
                     * @description Bitwise OR of options that identify the data to return: 1=bean, 2=overrides,
                     *     4=defaults, 8=schema
                     */
                    options: number;
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
                        "application/json": components["schemas"]["3961f0bb-15d5-42c3-925f-45e1a8709bce"];
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
    "/api/config/details/{path}/{options}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Return the config details for the specified handle path. See /details for a
         *     description of config details. (v1.0)
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description The handle path to return config details for. */
                    path: string;
                    /**
                     * @description Bitwise OR of options that identify the data to return: 1=bean, 2=overrides,
                     *     4=defaults, 8=schema
                     */
                    options: number;
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
                        "application/json": components["schemas"]["3961f0bb-15d5-42c3-925f-45e1a8709bce"];
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
    "/api/config/bulk": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Update multiple ConfigBeans in a single call. See /{path} for details about the
         *     update process. (v1.0)
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
                    "application/json": components["schemas"]["0dd2dbde-39d7-4092-92ee-625d8b76d668"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["a39931bd-8313-4332-b9e7-fa558c900e0f"];
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
    "/api/config/value/merged/{scopedPath}/{attr}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Return merged value of the scoped config bean attribute. This merges all
         *     scopes up from the specified scope starting scope. By specifying a nodeId
         *     scope, you get the same values that the node would actually see. By using
         *     a higher level scope, you can see the merged value for that scope which
         *     is useful for debugging and for settings compliance. (v1.0)
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Handle path for the ConfigBean */
                    scopedPath: string;
                    /** @description Name of attribute to return */
                    attr: string;
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
                        "application/json": components["schemas"]["aa74f14f-c8ac-426c-9ba3-80e25f897b66"];
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
    "/api/config/value/{scopedPath}/{attr}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Return value of the scoped config bean attribute. This merges defaults and overrides
         *     but only for the scope specified in the path. This is useful for examining just a
         *     single value at a single scope in the scope stack. (v1.0)
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Handle path for the ConfigBean */
                    scopedPath: string;
                    /** @description Name of attribute to return */
                    attr: string;
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
                        "application/json": components["schemas"]["aa74f14f-c8ac-426c-9ba3-80e25f897b66"];
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
    "/api/config/bean/defaults/{scopedPath}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Return the defaults for a particular scoped path. This is only defaults in
         *     the specified scope. Useful for debugging. (v1.0)
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Handle path for the ConfigBean */
                    scopedPath: string;
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
                        "application/json": components["schemas"]["48cc7303-ec37-49bc-9f7b-e069da5dffcf"];
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
    "/api/config/bean/merged/{path}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Return merged values for the specified path using the default scope of the node.
         *     This most closely resembles how config beans are set on this node. (v1.0)
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Handle path for the ConfigBean */
                    path: string;
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
                        "application/json": components["schemas"]["48cc7303-ec37-49bc-9f7b-e069da5dffcf"];
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
    "/api/config/bean/overrides/{scopedPath}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Return the overrides for a particular scoped path. This is only overrides
         *     in the specified scope. Useful for debugging. (v1.0)
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Handle path for the ConfigBean */
                    scopedPath: string;
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
                        "application/json": components["schemas"]["48cc7303-ec37-49bc-9f7b-e069da5dffcf"];
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
        "f590f2d5-1d73-42cd-ac7e-b1662a16e079": components["schemas"]["c84a0ec9-12a0-4a8f-8923-7f5c1cd81561"][];
        "c84a0ec9-12a0-4a8f-8923-7f5c1cd81561": {
            /** @description (typeName=java.util.Map<java.lang.String, com.kosdev.kos.commons.core.service.config.MethodPair$MethodSchema>) */
            schema?: components["schemas"]["8a23552b-1d8f-4fb4-a80a-6324615373f3"];
            /** @description (typeName=java.util.List<java.lang.String>) */
            paths?: components["schemas"]["8e9aae11-4174-4f14-b9e1-55e14fbbf358"];
        };
        /** @description (typeName=com.kosdev.kos.commons.core.service.config.MethodPair$MethodSchema) */
        "8a23552b-1d8f-4fb4-a80a-6324615373f3": components["schemas"]["4fdab285-9240-4a36-8d98-be349660a9db"];
        "4fdab285-9240-4a36-8d98-be349660a9db": {
            /** @description (typeName=java.lang.Object[]) */
            values?: components["schemas"]["bfba8319-e15f-46a8-8244-2bb8ebad8464"];
            /** @description (typeName=java.lang.Class<? extends com.kosdev.kos.commons.core.service.config.options.ConfigOptions>) */
            optionsClass?: components["schemas"]["e618c981-7c3b-44dd-8533-802bb504ef9f"];
            /** @description (typeName=com.kosdev.kos.commons.core.service.config.options.ConfigOptions) */
            options?: components["schemas"]["f5ac66fa-4635-43b9-8cb1-53b5e5751ca1"];
            format?: string;
            type?: string;
            desc?: string;
        };
        "bfba8319-e15f-46a8-8244-2bb8ebad8464": unknown;
        "e618c981-7c3b-44dd-8533-802bb504ef9f": unknown;
        "f5ac66fa-4635-43b9-8cb1-53b5e5751ca1": {
            type?: string;
        };
        "8e9aae11-4174-4f14-b9e1-55e14fbbf358": string[];
        "5b19bc5b-94c2-47eb-a108-fdc1af279779": {
            /** @description (typeName=com.kosdev.kos.commons.util.ListenerList<com.kosdev.kos.commons.core.service.config.ConfigBeanListener>) */
            listeners?: components["schemas"]["38738432-cdc7-417d-8a85-5190446674e3"];
        };
        "38738432-cdc7-417d-8a85-5190446674e3": components["schemas"]["86938e14-2745-4f5a-996b-fb542b8bebea"][];
        "86938e14-2745-4f5a-996b-fb542b8bebea": unknown;
        "5cb56c4a-3fc3-4596-b78d-a16b38c7b6af": Record<string, never>;
        "a39931bd-8313-4332-b9e7-fa558c900e0f": {
            tracker?: string;
            /** @description (typeName=java.util.Map<java.lang.String, com.kosdev.kos.commons.core.service.config.BeanChanges>) */
            beanChanges?: components["schemas"]["3b381d67-d24c-409d-bb15-13d763a9c20c"];
        };
        /** @description (typeName=com.kosdev.kos.commons.core.service.config.BeanChanges) */
        "3b381d67-d24c-409d-bb15-13d763a9c20c": components["schemas"]["382efe93-e5de-40ae-a43e-7d3e4a49cedb"];
        "382efe93-e5de-40ae-a43e-7d3e4a49cedb": {
            /** @description (typeName=java.util.List<com.kosdev.kos.commons.core.service.config.BeanChanges$AttrChange>) */
            scopedChanges?: components["schemas"]["206fdd21-018f-4069-b157-bd4d1caaef41"];
            /** @description (typeName=java.util.List<com.kosdev.kos.commons.core.service.config.BeanChanges$AttrChange>) */
            changes?: components["schemas"]["206fdd21-018f-4069-b157-bd4d1caaef41"];
            /** @description (typeName=java.util.List<com.kosdev.kos.commons.core.service.config.BeanChanges$Error>) */
            errors?: components["schemas"]["a42031ac-652e-402c-b48f-9d5c9c1bba8c"];
        };
        "206fdd21-018f-4069-b157-bd4d1caaef41": components["schemas"]["bf163b8d-0184-4b3b-8177-c8aa914c5ebc"][];
        "bf163b8d-0184-4b3b-8177-c8aa914c5ebc": {
            scope?: string;
            attr?: string;
            previousValue?: string;
            currentValue?: string;
        };
        "a42031ac-652e-402c-b48f-9d5c9c1bba8c": components["schemas"]["7ab83f00-bb2f-45c2-9262-ded6aaa398a0"][];
        "7ab83f00-bb2f-45c2-9262-ded6aaa398a0": {
            val?: string;
            reason?: string;
            attr?: string;
        };
        "3961f0bb-15d5-42c3-925f-45e1a8709bce": {
            /** @description (typeName=java.util.List<java.lang.String>) */
            scopeNames?: components["schemas"]["8e9aae11-4174-4f14-b9e1-55e14fbbf358"];
            /** @description (typeName=java.util.List<com.kosdev.kos.commons.core.service.config.ConfigDetails>) */
            details?: components["schemas"]["3c4ed37c-b569-431d-8ca0-bc01b38d1828"];
        };
        "3c4ed37c-b569-431d-8ca0-bc01b38d1828": components["schemas"]["518b6e0b-aeff-4350-b504-0fd8108a73c6"][];
        "518b6e0b-aeff-4350-b504-0fd8108a73c6": {
            /** @description (typeName=com.kosdev.kos.commons.core.service.config.ConfigSchema) */
            schema?: components["schemas"]["c84a0ec9-12a0-4a8f-8923-7f5c1cd81561"];
            path?: string;
            /** @description (typeName=java.util.Map<java.lang.String, java.lang.String>) */
            defaults?: components["schemas"]["48cc7303-ec37-49bc-9f7b-e069da5dffcf"];
            /** @description (typeName=java.util.List<com.kosdev.kos.commons.core.service.config.ConfigDetails$ScopeData>) */
            scopes?: components["schemas"]["4108fb80-41a9-4904-926a-41f8bab24198"];
            /** @description (typeName=com.kosdev.kos.commons.core.service.config.ConfigBean) */
            bean?: components["schemas"]["5b19bc5b-94c2-47eb-a108-fdc1af279779"];
        };
        "48cc7303-ec37-49bc-9f7b-e069da5dffcf": string;
        "4108fb80-41a9-4904-926a-41f8bab24198": components["schemas"]["5d82a294-72f2-412b-add2-9eebf730b9a5"][];
        "5d82a294-72f2-412b-add2-9eebf730b9a5": {
            /** @description (typeName=java.util.Map<java.lang.String, java.lang.String>) */
            defaults?: components["schemas"]["48cc7303-ec37-49bc-9f7b-e069da5dffcf"];
            scope?: string;
            /** @description (typeName=java.util.Map<java.lang.String, java.lang.String>) */
            overrides?: components["schemas"]["48cc7303-ec37-49bc-9f7b-e069da5dffcf"];
        };
        "0dd2dbde-39d7-4092-92ee-625d8b76d668": components["schemas"]["612e3e1a-02bb-441a-a8fd-bf704a0d7457"][];
        "612e3e1a-02bb-441a-a8fd-bf704a0d7457": {
            path?: string;
            /** @description (typeName=java.util.Map<java.lang.String, java.lang.Object>) */
            values?: components["schemas"]["5cb56c4a-3fc3-4596-b78d-a16b38c7b6af"];
            scope?: string;
            replace?: boolean;
        };
        "aa74f14f-c8ac-426c-9ba3-80e25f897b66": {
            valid?: boolean;
            value?: string;
            /** Format: int64 */
            lastUpdateTime?: number;
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
