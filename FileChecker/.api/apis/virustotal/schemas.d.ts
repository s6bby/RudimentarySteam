declare const AnalyseBinary: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["data"];
        readonly properties: {
            readonly data: {
                readonly type: "string";
                readonly format: "json";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API Key.";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const AnalysesGetDescriptors: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Analysis identifier";
                };
                readonly relationship: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Relationship name (see [table](ref:analyses-object#relationships))";
                };
            };
            readonly required: readonly ["id", "relationship"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const AnalysesGetObjects: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Analysis identifier";
                };
                readonly relationship: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Relationship name (see [table](ref:analyses-object#relationships))";
                };
            };
            readonly required: readonly ["id", "relationship"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const Analysis: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Analysis identifier";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const ApiSearch: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly query: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Search query.";
                };
            };
            readonly required: readonly ["query"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const Assets: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Asset filter by type (`domain`, `ip range`, `brand`)";
                };
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continuation cursor";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly [];
        }];
    };
};
declare const Assetsid: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The id of the Alerts Asset to retrieve";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly [];
        }];
    };
};
declare const CheckUserHuntingRulesetEditor: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Ruleset identifier";
                };
                readonly user_or_group_id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "User or group ID";
                };
            };
            readonly required: readonly ["id", "user_or_group_id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "boolean";
                    readonly default: true;
                    readonly examples: readonly [true];
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const CollectionsAddElement: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["data"];
        readonly properties: {
            readonly data: {
                readonly type: "string";
                readonly description: "Object's descriptors";
                readonly format: "json";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Collection's ID";
                };
                readonly relationship: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Relationship name (see below)";
                };
            };
            readonly required: readonly ["id", "relationship"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const CollectionsComments: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Collection's ID";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly default: 10;
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Maximum number of comments to retrieve";
                };
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continuation cursor";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const CollectionsCommentsCreate: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["data"];
        readonly properties: {
            readonly data: {
                readonly type: "string";
                readonly description: "A comment object";
                readonly format: "json";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Collection's ID";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const CollectionsCreate: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["data"];
        readonly properties: {
            readonly data: {
                readonly type: "string";
                readonly description: "Collection object";
                readonly format: "json";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly attributes: {
                            readonly type: "object";
                            readonly properties: {
                                readonly name: {
                                    readonly type: "string";
                                    readonly examples: readonly ["Test collection"];
                                };
                                readonly description: {
                                    readonly type: "string";
                                    readonly examples: readonly ["This is how to create a new collection via API."];
                                };
                                readonly top_icon_md5: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                        readonly examples: readonly ["1bc1faf71106e964e44cb17ab4dd8d11"];
                                    };
                                };
                                readonly tags: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "object";
                                        readonly properties: {};
                                    };
                                };
                                readonly ip_addresses_count: {
                                    readonly type: "integer";
                                    readonly default: 0;
                                    readonly examples: readonly [0];
                                };
                                readonly domains_count: {
                                    readonly type: "integer";
                                    readonly default: 0;
                                    readonly examples: readonly [1];
                                };
                                readonly creation_date: {
                                    readonly type: "integer";
                                    readonly default: 0;
                                    readonly examples: readonly [1614784765];
                                };
                                readonly last_modification_date: {
                                    readonly type: "integer";
                                    readonly default: 0;
                                    readonly examples: readonly [1614784765];
                                };
                                readonly references_count: {
                                    readonly type: "integer";
                                    readonly default: 0;
                                    readonly examples: readonly [0];
                                };
                                readonly alt_names: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "object";
                                        readonly properties: {};
                                    };
                                };
                                readonly urls_count: {
                                    readonly type: "integer";
                                    readonly default: 0;
                                    readonly examples: readonly [0];
                                };
                                readonly autogenerated_tags: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "object";
                                        readonly properties: {};
                                    };
                                };
                                readonly files_count: {
                                    readonly type: "integer";
                                    readonly default: 0;
                                    readonly examples: readonly [0];
                                };
                            };
                        };
                        readonly type: {
                            readonly type: "string";
                            readonly examples: readonly ["collection"];
                        };
                        readonly id: {
                            readonly type: "string";
                            readonly examples: readonly ["<ID>"];
                        };
                        readonly links: {
                            readonly type: "object";
                            readonly properties: {
                                readonly self: {
                                    readonly type: "string";
                                    readonly examples: readonly ["https://www.virustotal.com/api/v3/collections/<ID>"];
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const CollectionsDelete: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Collection's ID";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const CollectionsDeleteElement: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["data"];
        readonly properties: {
            readonly data: {
                readonly type: "string";
                readonly description: "Object's descriptors";
                readonly format: "json";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Collection's ID";
                };
                readonly relationship: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Relationship name (see below)";
                };
            };
            readonly required: readonly ["id", "relationship"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const CollectionsExportAggregations: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Collection's ID";
                };
                readonly format: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Export format (one of `json` or `csv`)";
                };
            };
            readonly required: readonly ["id", "format"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const CollectionsExportIocs: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Collection's ID";
                };
                readonly format: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Export format (one of `json`, `csv`, or `stix`)";
                };
            };
            readonly required: readonly ["id", "format"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly files: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly examples: readonly ["009cc0f34f60467552ef79c3892c501043c972be55fe936efb30584975d45ec0"];
                    };
                };
                readonly threat_actors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly examples: readonly ["muddywater"];
                    };
                };
                readonly references: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly examples: readonly ["153590cf5677a6ab5b5103382d41d4d8868a878a04104e86e936db63e4d186b8"];
                    };
                };
                readonly urls: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly examples: readonly ["http://abrahamseed.co.za/db_template.php"];
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const CollectionsExportIocsRelationship: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Collection's ID";
                };
                readonly relationship: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Relationship name (see [table](ref:collections-1#relationships))";
                };
                readonly format: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Export format (one of `json`, `csv`, or `stix`)";
                };
            };
            readonly required: readonly ["id", "relationship", "format"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly files: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly examples: readonly ["009cc0f34f60467552ef79c3892c501043c972be55fe936efb30584975d45ec0"];
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const CollectionsGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Collection's ID";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const CollectionsUpdate: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["data"];
        readonly properties: {
            readonly data: {
                readonly type: "string";
                readonly description: "Collection object";
                readonly format: "json";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Collection's ID";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly attributes: {
                            readonly type: "object";
                            readonly properties: {
                                readonly name: {
                                    readonly type: "string";
                                    readonly examples: readonly ["Updating the name"];
                                };
                                readonly description: {
                                    readonly type: "string";
                                    readonly examples: readonly ["This is how to create a new collection via API."];
                                };
                                readonly top_icon_md5: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                        readonly examples: readonly ["1bc1faf71106e964e44cb17ab4dd8d11"];
                                    };
                                };
                                readonly tags: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "object";
                                        readonly properties: {};
                                    };
                                };
                                readonly ip_addresses_count: {
                                    readonly type: "integer";
                                    readonly default: 0;
                                    readonly examples: readonly [1];
                                };
                                readonly domains_count: {
                                    readonly type: "integer";
                                    readonly default: 0;
                                    readonly examples: readonly [2];
                                };
                                readonly creation_date: {
                                    readonly type: "integer";
                                    readonly default: 0;
                                    readonly examples: readonly [1614784765];
                                };
                                readonly last_modification_date: {
                                    readonly type: "integer";
                                    readonly default: 0;
                                    readonly examples: readonly [1614784765];
                                };
                                readonly references_count: {
                                    readonly type: "integer";
                                    readonly default: 0;
                                    readonly examples: readonly [0];
                                };
                                readonly alt_names: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "object";
                                        readonly properties: {};
                                    };
                                };
                                readonly urls_count: {
                                    readonly type: "integer";
                                    readonly default: 0;
                                    readonly examples: readonly [2];
                                };
                                readonly autogenerated_tags: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                        readonly examples: readonly ["cve-2017-5753"];
                                    };
                                };
                                readonly files_count: {
                                    readonly type: "integer";
                                    readonly default: 0;
                                    readonly examples: readonly [1];
                                };
                            };
                        };
                        readonly type: {
                            readonly type: "string";
                            readonly examples: readonly ["collection"];
                        };
                        readonly id: {
                            readonly type: "string";
                            readonly examples: readonly ["{id}"];
                        };
                        readonly links: {
                            readonly type: "object";
                            readonly properties: {
                                readonly self: {
                                    readonly type: "string";
                                    readonly examples: readonly ["https://www.virustotal.com/api/v3/collections/{id}"];
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const CommentIdDelete: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Comment ID";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const CommentsRelationships: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Comment identifier";
                };
                readonly relationship: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Relationship name (see [table](ref:comments#relationships))";
                };
            };
            readonly required: readonly ["id", "relationship"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const CommentsRelationshipsIds: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Comment identifier";
                };
                readonly relationship: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Relationship name (see [table](ref:comments#relationships))";
                };
            };
            readonly required: readonly ["id", "relationship"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "string";
                    readonly default: "10";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Maximum number of related objects to retrieve";
                };
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continuation cursor";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const CreateGraphs: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly RAW_BODY: {
                readonly type: "string";
                readonly format: "json";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "X-Apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                };
            };
            readonly required: readonly ["X-Apikey"];
        }];
    };
};
declare const CreateSavedSearches: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["data"];
        readonly properties: {
            readonly data: {
                readonly type: "string";
                readonly description: "Payload to post.";
                readonly format: "json";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly attributes: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A comma-separated list of the [_saved search attributes_](ref:saved-search-object#object-attributes) to be returned. (All attributes are returned by default.)";
                };
                readonly relationships: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Provides additional information about the saved search as [_relationships_](ref:saved-search-object#relationships)";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your AP Key.";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const CrowdsourcedYaraRuleRelationshipDescriptorsEndpoint: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Rule identifier";
                };
                readonly relationship: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Relationship name";
                };
            };
            readonly required: readonly ["id", "relationship"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const CrowdsourcedYaraRuleRelationshipEndpoint: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Rule identifier";
                };
                readonly relationship: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Relationship name";
                };
            };
            readonly required: readonly ["id", "relationship"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const DeleteAnIocStreamNotification: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The ID of the IoC Stream notification";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const DeleteHuntingRulesetEditor: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Ruleset identifier";
                };
                readonly user_or_group_id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "User or group ID";
                };
            };
            readonly required: readonly ["id", "user_or_group_id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const DeleteNotificationsFromTheIocStream: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly filter: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter string";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "429": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const DeleteSavedSearches: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Saved Search's ID.";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API Key.";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const DomainInfo: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly domain: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Domain name";
                };
            };
            readonly required: readonly ["domain"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const DomainVotesPost: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["data"];
        readonly properties: {
            readonly data: {
                readonly type: "string";
                readonly description: "Vote object";
                readonly default: "{\"type\": \"vote\", \"attributes\": {\"verdict\": \"harmless\"}}";
                readonly format: "json";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly domain: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "hostname or domain name";
                };
            };
            readonly required: readonly ["domain"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "409": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly examples: readonly ["AlreadyExistsError"];
                        };
                        readonly message: {
                            readonly type: "string";
                            readonly examples: readonly ["User \"username\" already voted \"harmless\" for this domain"];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const DomainsCommentsGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly domain: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Domain name";
                };
            };
            readonly required: readonly ["domain"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly default: 10;
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Maximum number of comments to retrieve";
                };
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continuation cursor";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const DomainsCommentsPost: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly data: {
                readonly type: "string";
                readonly description: "A comment object";
                readonly default: "{\"type\": \"comment\", \"attributes\": {\"text\": \"Lorem ipsum dolor sit ...\"}}";
                readonly format: "json";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly domain: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Domain name";
                };
            };
            readonly required: readonly ["domain"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const DomainsRelationships: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly domain: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Domain name";
                };
                readonly relationship: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Relationship name (see [table](ref:domains-1#relationships))";
                };
            };
            readonly required: readonly ["domain", "relationship"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly default: 10;
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Maximum number of related objects to retrieve";
                };
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continuation cursor";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const DomainsRelationshipsIds: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly domain: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Domain name";
                };
                readonly relationship: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Relationship name (see [table](ref:domains-1#relationships))";
                };
            };
            readonly required: readonly ["domain", "relationship"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "string";
                    readonly default: "10";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Maximum number of related objects to retrieve";
                };
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continuation cursor";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const DomainsRescan: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Domain";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const DomainsVotesGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly domain: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                };
            };
            readonly required: readonly ["domain"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const Events: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continue returning results from this cursor on.";
                };
                readonly filter: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A space-separated list of key:value accepting: 'action', 'creator_id', 'level<operator>', 'monitor_key', 'owner_id', 'source', 'timestamp<operator>', where operator is optional among '+', '-', and '='";
                };
                readonly job_id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Along with cursor, the corresponding job to continue returning results from.";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const FeedsUrl: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly time: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A string in format YYYYMMDDhhmm";
                };
            };
            readonly required: readonly ["time"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const Feedsdomains2Time: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly time: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A string in format YYYYMMDDhhmm";
                };
            };
            readonly required: readonly ["time"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const FileAllBehavioursSummary: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "SHA-256, SHA-1 or MD5 identifying the file";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const FileInfo: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "SHA-256, SHA-1 or MD5 identifying the file";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const FilesAnalyse: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "SHA-256, SHA-1 or MD5 identifying the file";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const FilesCommentsGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "SHA-256, SHA-1 or MD5 identifying the file";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly default: 10;
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Maximum number of comments to retrieve";
                };
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continuation cursor";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const FilesCommentsPost: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["data"];
        readonly properties: {
            readonly data: {
                readonly type: "string";
                readonly description: "A comment object";
                readonly default: "{\"type\": \"comment\", \"attributes\": {\"text\": \"Lorem ipsum dolor sit ...\"}}";
                readonly format: "json";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "SHA-256, SHA-1 or MD5 identifying the file";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const FilesDownload: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "SHA-256, SHA-1 or MD5 identifying the file";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const FilesDownloadUrl: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "SHA-256, SHA-1 or MD5 identifying the file";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const FilesRelationships: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "SHA-256, SHA-1 or MD5 identifying the file";
                };
                readonly relationship: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Relationship name (see [table](ref:files#relationships))";
                };
            };
            readonly required: readonly ["id", "relationship"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly default: 10;
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Maximum number of related objects to retrieve";
                };
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continuation cursor";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const FilesRelationshipsIds: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "SHA-256, SHA-1 or MD5 identifying the file";
                };
                readonly relationship: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Relationship name (see [table](ref:files#relationships))";
                };
            };
            readonly required: readonly ["id", "relationship"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "string";
                    readonly default: "10";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Maximum number of related objects to retrieve";
                };
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continuation cursor";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const FilesUploadUrl: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const FilesVotesGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "SHA-256, SHA-1 or MD5 identifying the file";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly default: 10;
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Maximum number of votes to retrieve";
                };
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continuation cursor";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const FilesVotesPost: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["data"];
        readonly properties: {
            readonly data: {
                readonly type: "string";
                readonly description: "A vote object";
                readonly default: "{\"type\": \"vote\", \"attributes\": {\"verdict\": \"malicious\"}}";
                readonly format: "json";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "SHA-256, SHA-1 or MD5 identifying the file";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "409": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly examples: readonly ["AlreadyExistsError"];
                        };
                        readonly message: {
                            readonly type: "string";
                            readonly examples: readonly ["User \"username\" already voted \"malicious\" for this file"];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetACrowdsourcedYaraRule: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Rule identifier";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetASummaryOfAllMitreAttckTechniquesObservedInAFile: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "SHA-256, SHA-1 or MD5 identifying the file";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetAllBehaviorReportsForAFile: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "SHA-256, SHA-1 or MD5 identifying the file";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetAnIocStreamNotification: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The ID of the IoC Stream notification";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetAttackTactics: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Attack tactic's ID";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetAttackTacticsRelationship: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Attack tactic's ID";
                };
                readonly relationship: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Relationship name (see [table](ref:attack-tactics#relationships))";
                };
            };
            readonly required: readonly ["id", "relationship"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly default: 10;
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Maximum number of related objects to retrieve";
                };
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continuation cursor";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetAttackTacticsRelationshipDescriptor: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Attack tactic's ID";
                };
                readonly relationship: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Relationship name (see [table](ref:attack-tactics#relationships))";
                };
            };
            readonly required: readonly ["id", "relationship"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly default: 10;
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Maximum number of related objects to retrieve";
                };
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continuation cursor";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetAttackTechniques: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Attack technique's ID";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetAttackTechniquesRelationship: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Attack technique's ID";
                };
                readonly relationship: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Relationship name (see [table](ref:attack-techniques#relationships))";
                };
            };
            readonly required: readonly ["id", "relationship"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly default: 10;
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Maximum number of related objects to retrieve";
                };
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continuation cursor";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetAttackTechniquesRelationshipDescriptor: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Attack technique's ID";
                };
                readonly relationship: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Relationship name (see [table](ref:attack-techniques#relationships))";
                };
            };
            readonly required: readonly ["id", "relationship"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly default: 10;
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Maximum number of related objects to retrieve";
                };
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continuation cursor";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetCollectionsRelationship: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Collection's ID";
                };
                readonly relationship: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Relationship name (see [table](ref:collections-1#relationships))";
                };
            };
            readonly required: readonly ["id", "relationship"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly default: 10;
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Maximum number of related objects to retrieve";
                };
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continuation cursor";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetCollectionsRelationshipDescriptor: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Collection's ID";
                };
                readonly relationship: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Relationship name (see [table](ref:collections-1#relationships))";
                };
            };
            readonly required: readonly ["id", "relationship"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly default: 10;
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Maximum number of related objects to retrieve";
                };
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continuation cursor";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetCollectionsSubscriptionPreferences: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Collection's ID";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly meta: {
                    readonly type: "object";
                    readonly properties: {
                        readonly count: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [1];
                        };
                    };
                };
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly attributes: {
                            readonly type: "object";
                            readonly properties: {
                                readonly last_modification_date: {
                                    readonly type: "integer";
                                    readonly default: 0;
                                    readonly examples: readonly [1615551105];
                                };
                                readonly daily_email: {
                                    readonly type: "boolean";
                                    readonly default: true;
                                    readonly examples: readonly [true];
                                };
                                readonly creation_date: {
                                    readonly type: "integer";
                                    readonly default: 0;
                                    readonly examples: readonly [1615463501];
                                };
                            };
                        };
                        readonly type: {
                            readonly type: "string";
                            readonly examples: readonly ["collection_subscription_preferences"];
                        };
                        readonly id: {
                            readonly type: "string";
                            readonly examples: readonly ["<ID>"];
                        };
                    };
                };
                readonly links: {
                    readonly type: "object";
                    readonly properties: {
                        readonly self: {
                            readonly type: "string";
                            readonly examples: readonly ["https://www.virustotal.com/api/v3/collections/{id}/subscription_preferences"];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetComment: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Comment ID";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly relationships: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Relationship name (see [table](ref:comments#relationships))";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetComments: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly default: 10;
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Number of items to retrieve";
                };
                readonly filter: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter returned elements";
                };
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continuation cursor";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetFeedsIpAddresses: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly time: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A string in format YYYYMMDDhhmm";
                };
            };
            readonly required: readonly ["time"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetFileBehaviourId: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly sandbox_id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Sandbox report ID. See \"Sandbox Report identifiers\" section below for more info.";
                };
            };
            readonly required: readonly ["sandbox_id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetFileBehavioursEvtx: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly sandbox_id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Sandbox report ID.";
                };
            };
            readonly required: readonly ["sandbox_id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetFileBehavioursHtml: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly sandbox_id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Sandbox report ID.";
                };
            };
            readonly required: readonly ["sandbox_id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetFileBehavioursMemdump: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly sandbox_id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Sandbox report ID.";
                };
            };
            readonly required: readonly ["sandbox_id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetFileBehavioursPcap: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly sandbox_id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Sandbox report ID.";
                };
            };
            readonly required: readonly ["sandbox_id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetFileBehavioursRelationship: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly sandbox_id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Sandbox report ID";
                };
                readonly relationship: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Relationship name (see [table](ref:file-behaviour-summary#relationships))";
                };
            };
            readonly required: readonly ["sandbox_id", "relationship"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly default: 10;
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Maximum number of related objects to retrieve";
                };
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continuation cursor";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetFileBehavioursRelationshipDescriptor: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly sandbox_id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Sandbox report ID";
                };
                readonly relationship: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Relationship name (see [table](ref:file-behaviour-summary#relationships))";
                };
            };
            readonly required: readonly ["sandbox_id", "relationship"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly default: 10;
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Maximum number of related objects to retrieve";
                };
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continuation cursor";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetGraphComments: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A 65 char length id which uniquely identify the graph.";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Maximum number of related objects to retrieve";
                };
                readonly cursor: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continuation cursor";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
};
declare const GetObjectsFromTheIocStream: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly default: 10;
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Number of objects to retrieve (max 40)";
                };
                readonly descriptors_only: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The response returns only objects descriptors instead of whole VT objects";
                };
                readonly filter: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter string";
                };
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continuation cursor";
                };
                readonly order: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Sort order";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly meta: {
                    readonly type: "object";
                    readonly properties: {
                        readonly cursor: {
                            readonly type: "string";
                            readonly examples: readonly ["Ck0KEQoEZGF0ZRIJCLnz1ObJg_0CEjRqEXN-dmlydXN0b3RhbGNsb3Vkch8LEhVJT0NTdHJlYW1Ob3RpZmljYXRpb24YsK2w2iEMGAAgAQ=="];
                        };
                    };
                };
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly type: {
                                readonly type: "string";
                                readonly examples: readonly ["file"];
                            };
                            readonly id: {
                                readonly type: "string";
                                readonly examples: readonly ["c9c4ee34d9c9f769f884f720e1d37ce1e864aae1be81a4a274bb1a88704cb11c"];
                            };
                            readonly context_attributes: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly notification_id: {
                                        readonly type: "string";
                                        readonly examples: readonly ["9047905968"];
                                    };
                                    readonly origin: {
                                        readonly type: "string";
                                        readonly examples: readonly ["hunting"];
                                    };
                                    readonly hunting_info: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly rule_name: {
                                                readonly type: "string";
                                                readonly examples: readonly ["vulnerability_weaponization"];
                                            };
                                        };
                                    };
                                    readonly tags: {
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "string";
                                            readonly examples: readonly ["c9c4ee34d9c9f769f884f720e1d37ce1e864aae1be81a4a274bb1a88704cb11c"];
                                        };
                                    };
                                    readonly sources: {
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly type: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["hunting_ruleset"];
                                                };
                                                readonly id: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["7926136120"];
                                                };
                                                readonly label: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["Ransomware"];
                                                };
                                            };
                                        };
                                    };
                                    readonly notification_date: {
                                        readonly type: "integer";
                                        readonly default: 0;
                                        readonly examples: readonly [1675778611];
                                    };
                                };
                            };
                        };
                    };
                };
                readonly links: {
                    readonly type: "object";
                    readonly properties: {
                        readonly self: {
                            readonly type: "string";
                            readonly examples: readonly ["https://www.virustotal.com/api/v3/ioc_stream?limit=1&filter=date%3A2023-02-07T10%3A00%3A00%2B%20entity_type%3Afile%20origin%3Ahunting&descriptors_only=true"];
                        };
                        readonly next: {
                            readonly type: "string";
                            readonly examples: readonly ["https://www.virustotal.com/api/v3/ioc_stream?filter=date%3A2023-02-07T10%3A00%3A00-+entity_type%3Afile+origin%3Ahunting&cursor=Ck0KEQoEZGF0ZRIJCLnz1ObJg_0CEjRqEXN-dmlydXN0b3RhbGNsb3Vkch8LEhVJT0NTdHJlYW1Ob3RpZmljYXRpb24YsK2w2iEMGAAgAQ%3D%3D&limit=1&descriptors_only=true"];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly message: {
                            readonly type: "string";
                            readonly examples: readonly ["origin \"notHunting\" is not valid. Valid origins are: hunting,subscriptions"];
                        };
                        readonly code: {
                            readonly type: "string";
                            readonly examples: readonly ["BadRequestError"];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetOperationsId: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Operation ID";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetPopularThreatCategories: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly examples: readonly ["adware"];
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetResolutionById: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Resolution object ID.";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key.";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetSavedSearches: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Saved Search's ID.";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly attributes: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A comma-separated list of the [_saved search attributes_](ref:saved-search-object#object-attributes) to be returned. (All attributes are returned by default.)";
                };
                readonly relationships: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Provides additional information about the saved search as [_relationships_](ref:saved-search-object#relationships)";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API Key.";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetSavedSearchesRelatedDescriptors: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Saved Search's ID.";
                };
                readonly relationship: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Saved search available relationships are listed [_here_](ref:saved-search-object#relationships)";
                };
            };
            readonly required: readonly ["id", "relationship"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly default: 10;
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Maximum number of related objects to retrieve. The maximum value is 40.";
                };
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continuation cursor.";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API Key.";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetSavedSearchesRelationships: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Saved Search's ID.";
                };
                readonly relationship: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Saved search available relationships are listed [_here_](ref:saved-search-object#relationships)";
                };
            };
            readonly required: readonly ["id", "relationship"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly default: 10;
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Maximum number of related objects to retrieve. The maximum value is 40.";
                };
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continuation cursor.";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API Key.";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetSha256HashComments: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Comment ID";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
};
declare const GetSigmaRules: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Rule ID";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetSubmission: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Submission object ID";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetYaraRulesets: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Ruleset ID to fetch.";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const Graphs: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly filter: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Return the graphs matching the given criteria only";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Maximum number graphs to retrieve";
                };
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continuation cursor";
                };
                readonly order: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Sort order";
                };
                readonly attributes: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Specific fields to retrieve";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
};
declare const GraphsAddEditor: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A 65 char length id which uniquely identify the graph.";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
};
declare const GraphsAddViewer: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A 65 char length id which uniquely identify the graph.";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
};
declare const GraphsCheckEditor: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A 65 char length id which uniquely identify the graph.";
                };
                readonly user_or_group_id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "User or group ID";
                };
            };
            readonly required: readonly ["id", "user_or_group_id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
};
declare const GraphsCheckViewer: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A 65 char length id which uniquely identify the graph.";
                };
                readonly user_or_group_id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "User or group ID";
                };
            };
            readonly required: readonly ["id", "user_or_group_id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "boolean";
                    readonly default: true;
                    readonly examples: readonly [true];
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GraphsDelete: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A 65 char length id which uniquely identify the graph.";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GraphsDeleteEditor: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A 65 char length id which uniquely identify the graph.";
                };
                readonly user_or_group_id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "User or group ID";
                };
            };
            readonly required: readonly ["id", "user_or_group_id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
};
declare const GraphsDeleteViewer: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A 65 char length id which uniquely identify the graph.";
                };
                readonly user_or_group_id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "User or group ID";
                };
            };
            readonly required: readonly ["id", "user_or_group_id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
};
declare const GraphsEditors: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A 65 char length id which uniquely identify the graph.";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Maximum number of related objects to retrieve";
                };
                readonly cursor: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continuation cursor";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
};
declare const GraphsInfo: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A 65 char length id which uniquely identify the graph.";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
};
declare const GraphsRelationships: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A 65 char length id which uniquely identify the graph.";
                };
                readonly relationship: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Relationship name (see [table](ref:graph-object#relationships))";
                };
            };
            readonly required: readonly ["id", "relationship"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Maximum number of related objects to retrieve";
                };
                readonly cursor: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continuation cursor";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GraphsRelationshipsIds: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A 65 char length id which uniquely identify the graph.";
                };
                readonly relationship: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Relationship name (see [table](ref:graph-object#relationships))";
                };
            };
            readonly required: readonly ["id", "relationship"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Maximum number of related objects to retrieve";
                };
                readonly cursor: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continuation cursor";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GraphsUpdate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly nodes: {
                readonly type: "array";
                readonly description: "Array of nodes.";
                readonly items: {
                    readonly properties: {
                        readonly entity_id: {
                            readonly type: "string";
                            readonly description: "Node entity id.";
                        };
                        readonly type: {
                            readonly type: "string";
                            readonly description: "Node entity type.";
                        };
                        readonly x: {
                            readonly type: "number";
                            readonly description: "X position of the node.";
                            readonly format: "float";
                            readonly minimum: -3.402823669209385e+38;
                            readonly maximum: 3.402823669209385e+38;
                        };
                        readonly y: {
                            readonly type: "number";
                            readonly description: "Y position of the node.";
                            readonly format: "float";
                            readonly minimum: -3.402823669209385e+38;
                            readonly maximum: 3.402823669209385e+38;
                        };
                        readonly index: {
                            readonly type: "integer";
                            readonly description: "Index of the node list.";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly fx: {
                            readonly type: "number";
                            readonly description: "(optional) Force x position.";
                            readonly format: "float";
                            readonly minimum: -3.402823669209385e+38;
                            readonly maximum: 3.402823669209385e+38;
                        };
                        readonly fy: {
                            readonly type: "number";
                            readonly description: "(optional) Force y position.";
                            readonly format: "float";
                            readonly minimum: -3.402823669209385e+38;
                            readonly maximum: 3.402823669209385e+38;
                        };
                        readonly text: {
                            readonly type: "string";
                            readonly description: "(optional) Node label.";
                        };
                        readonly entity_attributes: {
                            readonly type: "object";
                            readonly description: "(optional) Entity related attributes.";
                            readonly additionalProperties: true;
                        };
                    };
                    readonly type: "object";
                };
            };
            readonly links: {
                readonly type: "array";
                readonly description: "Array of links.";
                readonly items: {
                    readonly properties: {
                        readonly source: {
                            readonly type: "string";
                            readonly description: "Entity id of the link source.";
                        };
                        readonly target: {
                            readonly type: "string";
                            readonly description: "Entity id of the link target.";
                        };
                        readonly connection_type: {
                            readonly type: "string";
                            readonly description: "Type of the connection between the source and the target.";
                        };
                    };
                    readonly type: "object";
                };
            };
            readonly graph_data: {
                readonly type: "object";
                readonly description: "Highlevel graph data.";
                readonly properties: {
                    readonly version: {
                        readonly type: "string";
                        readonly description: "Current version of the graph.";
                    };
                };
            };
            readonly private: {
                readonly type: "boolean";
                readonly description: "Private status.";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A 65 char length id which uniquely identify the graph.";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
};
declare const GraphsViewers: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A 65 char length id which uniquely identify the graph.";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Maximum number of related objects to retrieve";
                };
                readonly cursor: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continuation cursor";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
};
declare const GroupsRelationshipsIds: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Group ID.";
                };
                readonly relationship: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Relationship name (see [table](ref:group-object#relationships))";
                };
            };
            readonly required: readonly ["id", "relationship"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Maximum number of related objects to retrieve";
                };
                readonly cursor: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continuation cursor";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const IpCommentsGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly ip: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "IP address";
                };
            };
            readonly required: readonly ["ip"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly default: 10;
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Maximum number of comments to retrieve";
                };
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continuation cursor";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const IpCommentsPost: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly data: {
                readonly type: "string";
                readonly description: "A comment object";
                readonly default: "{\"type\": \"comment\", \"attributes\": {\"text\": \"Lorem ipsum dolor sit ...\"}}";
                readonly format: "json";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly ip: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "IP address";
                };
            };
            readonly required: readonly ["ip"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const IpInfo: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly ip: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "IP address";
                };
            };
            readonly required: readonly ["ip"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const IpRelationships: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly ip: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "IP address";
                };
                readonly relationship: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Relationship name (see [table](ref:ip-object#relationships))";
                };
            };
            readonly required: readonly ["ip", "relationship"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly default: 10;
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Maximum number of related objects to retrieve";
                };
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continuation cursor";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const IpRelationshipsIds: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly ip: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "IP address";
                };
                readonly relationship: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Relationship name (see [table](ref:ip-object#relationships))";
                };
            };
            readonly required: readonly ["ip", "relationship"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "string";
                    readonly default: "10";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Maximum number of related objects to retrieve";
                };
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continuation cursor";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const IpVotes: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly ip: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "IP Address";
                };
            };
            readonly required: readonly ["ip"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly attributes: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly date: {
                                        readonly type: "integer";
                                        readonly default: 0;
                                        readonly examples: readonly [1574246328];
                                    };
                                    readonly value: {
                                        readonly type: "integer";
                                        readonly default: 0;
                                        readonly examples: readonly [47];
                                    };
                                    readonly verdict: {
                                        readonly type: "string";
                                        readonly examples: readonly ["harmless"];
                                    };
                                };
                            };
                            readonly id: {
                                readonly type: "string";
                                readonly examples: readonly ["i-1.1.1.1-a68784ad"];
                            };
                            readonly links: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly self: {
                                        readonly type: "string";
                                        readonly examples: readonly ["https://www.virustotal.com/api/v3/votes/i-1.1.1.1-a68784ad"];
                                    };
                                };
                            };
                            readonly type: {
                                readonly type: "string";
                                readonly examples: readonly ["vote"];
                            };
                        };
                    };
                };
                readonly links: {
                    readonly type: "object";
                    readonly properties: {
                        readonly self: {
                            readonly type: "string";
                            readonly examples: readonly ["https://www.virustotal.com/api/v3/ip_addresses/1.1.1.1/votes?limit=10"];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const IpVotesPost: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["data"];
        readonly properties: {
            readonly data: {
                readonly type: "string";
                readonly description: "Vote object";
                readonly default: "{\"type\": \"vote\", \"attributes\": {\"verdict\": \"malicious\"}}";
                readonly format: "json";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly ip: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "IP Address";
                };
            };
            readonly required: readonly ["ip"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly attributes: {
                            readonly type: "object";
                            readonly properties: {
                                readonly date: {
                                    readonly type: "integer";
                                    readonly default: 0;
                                    readonly examples: readonly [1574246672];
                                };
                                readonly value: {
                                    readonly type: "integer";
                                    readonly default: 0;
                                    readonly examples: readonly [1];
                                };
                                readonly verdict: {
                                    readonly type: "string";
                                    readonly examples: readonly ["harmless"];
                                };
                            };
                        };
                        readonly id: {
                            readonly type: "string";
                            readonly examples: readonly ["i-IP-a68784ad"];
                        };
                        readonly links: {
                            readonly type: "object";
                            readonly properties: {
                                readonly self: {};
                            };
                        };
                        readonly type: {
                            readonly type: "string";
                            readonly examples: readonly ["vote"];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "409": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly examples: readonly ["AlreadyExistsError"];
                        };
                        readonly message: {
                            readonly type: "string";
                            readonly examples: readonly ["User \"UserName\" already voted \"harmless\" for this ip_address"];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const ListCollections: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly default: 10;
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Maximum number of collections to retrieve (max 40)";
                };
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continuation cursor";
                };
                readonly filter: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter collections by different properties";
                };
                readonly order: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Sorting order";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const ListCrowdsourcedYaraRules: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly default: 10;
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Maximum number of rules to retrieve";
                };
                readonly filter: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Return the rules matching the given criteria only";
                };
                readonly order: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Sort order";
                };
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continuation cursor";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const ListSavedSearches: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly filter: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter saved searches by different properties.";
                };
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continuation cursor.";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly default: 10;
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Maximum number of saved searches to retrieve. The maximum value is 40.";
                };
                readonly order: {
                    readonly type: "string";
                    readonly default: "last_modification_date-";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Sorting order.";
                };
                readonly relationships: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Provides additional information about the saved search as [_relationships_](ref:saved-search-object#relationships)";
                };
                readonly attributes: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A comma-separated list of the [_saved search attributes_](ref:saved-search-object#object-attributes) to be returned. (All attributes are returned by default.)";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API Key.";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const Metadata: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key.";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const MonitorItemComments: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Monitor item identifier";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continue listing after this offset";
                };
                readonly limit: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Maximum number of analyses to retrieve";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const MonitorItemsAnalyses: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Monitor item identifier";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continue listing after this offset";
                };
                readonly limit: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Maximum number of analyses to retrieve";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const MonitorItemsConfig: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["data"];
        readonly properties: {
            readonly data: {
                readonly type: "string";
                readonly description: "MonitorItem obj";
                readonly default: "{\"id\": \"[MONITOR-ID]\", \"type\": \"monitoritem\", \"attributes\": {\"details\": \"This is file metadata.\"}}";
                readonly format: "json";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Monitor item identifier";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const MonitorItemsCreate: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["file"];
        readonly properties: {
            readonly file: {
                readonly type: "string";
                readonly description: "Encoded file";
                readonly format: "binary";
            };
            readonly path: {
                readonly type: "string";
                readonly description: "A path relative to current monitor user root folder. In must include the filename at the end of the path or a / if it's a folder being created";
            };
            readonly item: {
                readonly type: "string";
                readonly description: "A Monitor ID describing group and path";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const MonitorItemsDelete: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Monitor item identifier";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const MonitorItemsDownload: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Monitor item identifier";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const MonitorItemsDownloadUrl: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Monitor item identifier";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const MonitorItemsFilter: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly filter: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Return the items matching the given criteria only";
                };
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continue listing after this offset";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Maximum number of items to retrieve";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const MonitorItemsOwner: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Monitor item identifier";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const MonitorItemsStat: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Monitor item identifier";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const MonitorItemsUploadUrl: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const MonitorStatistics: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "List after this date";
                };
                readonly limit: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Maximum number of statistic periods to return";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const MonitorpartnerCommentsDelete: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Comment identifier";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
};
declare const MonitorpartnerCommentsPatch: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly data: {
                readonly type: "string";
                readonly description: "A json object with a MonitorHashComment";
                readonly default: "{\"data\": [{\"attributes\": {\"comment\": \"[TEXT]\", \"detection\": \"confirmed\", \"engine\": \"[ENGINE-ID]\", \"sha256\": \"[HASH-SHA256]\"}, \"type\": \"monitor_hash_comment\"}]}";
                readonly format: "json";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Comment identifier";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
};
declare const MonitorpartnerDetectionsbundleDownload: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly engine_name: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Name of your engine";
                };
            };
            readonly required: readonly ["engine_name"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
};
declare const MonitorpartnerDetectionsbundleDownloadUrl: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly engine_name: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Name of your engine";
                };
            };
            readonly required: readonly ["engine_name"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
};
declare const MonitorpartnerFilesDownload: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly sha256: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Hash sha256";
                };
            };
            readonly required: readonly ["sha256"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continue listing after this offset";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Maximum number of items to retrieve (max: 40)";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
};
declare const MonitorpartnerFilesDownloadUrl: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly sha256: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Hash sha256";
                };
            };
            readonly required: readonly ["sha256"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continue listing after this offset";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Maximum number of items to retrieve (max: 40)";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
};
declare const MonitorpartnerHashes: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly filter: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Retrieve hashes matching this condition, refer to the right block of the documentation";
                };
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continue listing after this offset";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Maximum number of items to retrieve (max: 40)";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
};
declare const MonitorpartnerHashesAnalyses: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly sha256: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "File's SHA256";
                };
            };
            readonly required: readonly ["sha256"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continue listing after this offset";
                };
                readonly limit: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Maximum number of items to retrieve (max: 40)";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
};
declare const MonitorpartnerHashesComments: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly data: {
                readonly type: "string";
                readonly description: "A json object with a MonitorHashComment";
                readonly default: "{\"data\": [{\"attributes\": {\"comment\": \"[TEXT]\", \"detection\": \"confirmed\", \"engine\": \"[ENGINE-ID]\", \"sha256\": \"[HASH-SHA256]\"}, \"type\": \"monitor_hash_comment\"}]}";
                readonly format: "json";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly sha256: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Hash sha256";
                };
            };
            readonly required: readonly ["sha256"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
};
declare const MonitorpartnerHashesItems: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly sha256: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Hash sha256";
                };
            };
            readonly required: readonly ["sha256"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continue listing after this offset";
                };
                readonly limit: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Maximum number of items to retrieve (max: 40)";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
};
declare const MonitorpartnerStatistics: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "List after this date";
                };
                readonly limit: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Maximum number of statistic periods to return";
                };
                readonly filter: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter parameters";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
};
declare const Notifications: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly severity: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If present, only return notifications with a severity greater or equal to this value. Severities are: `low`, `medium`, `high`, `critical`";
                };
                readonly asset_id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If present, filter only notifications from this asset watchlist.";
                };
                readonly entity_type: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If present, filter only notifications for this entity type. One of: `DOMAIN`, `URL`, `IP`, `FILE`";
                };
                readonly last_n_hours: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If present, retrieve only notifications N hours old, or younger.";
                };
                readonly detection_category: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If present, only return notifications with this detection category. Categories are `BRAND_MATCH`, `DETECTED_DOMAIN`, `DETECTED_IP`, `DETECTED_URL`, `DOMAIN_TYPOSQUATTING`, `FAVICON_REUSE`, `FILE_COMMUNICATING_WITH_DOMAIN`, `FILE_COMMUNICATING_WITH_IP`, `FILE_COMMUNICATING_WITH_URL`, `FILE_DOWNLOADED_FROM_DOMAIN`, `FILE_DOWNLOADED_FROM_IP`, `FILE_DOWNLOADED_FROM_URL`, `PATTERN_EMBEDDED_IN_FILE`, `SUBDOMAIN_ABUSE`.";
                };
                readonly use_case_category: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If present, only return notifications with this use case category. Categories are `BRAND_IMPERSONATION`, `CORPORATE_INFRASTRUCTURE_ABUSE`, `PHISHING_COUNTERFEITING`, `POTENTIAL_FALSE_POSITIVE`.";
                };
                readonly message_contains: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If present, will search and match inside the event_message_json field of the Notification";
                };
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continuation cursor";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly [];
        }];
    };
};
declare const Notificationsid: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly [];
        }];
    };
};
declare const PostGraphsComments: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["data"];
        readonly properties: {
            readonly data: {
                readonly type: "string";
                readonly description: "A comment object.";
                readonly default: "{\"type\": \"comment\", \"attributes\": {\"text\": \"test\"}}";
                readonly format: "json";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A 65 char length id which uniquely identify the graph.";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
};
declare const RescanIp: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "IP address";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const RevokeSavedSearchesAccess: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["data"];
        readonly properties: {
            readonly data: {
                readonly type: "string";
                readonly description: "Payload to identify user/group identifier.";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Saved Search's ID.";
                };
                readonly access: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Access level. Options: viewers, editors";
                };
            };
            readonly required: readonly ["id", "access"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API Key.";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const SearchIocsInsideACollection: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Collection's ID";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly query: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Intelligence query";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly default: 10;
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Maximum number of IoCs to retrieve (max 40)";
                };
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continuation cursor";
                };
                readonly order: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Sorting order";
                };
                readonly attributes: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Comma-separated attributes to return from the resulting IoCs";
                };
                readonly relationships: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Comma-separated name of relationships descriptors to return from the IoCs";
                };
            };
            readonly required: readonly ["query"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const ShareSavedSearches: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["data"];
        readonly properties: {
            readonly data: {
                readonly type: "string";
                readonly description: "Payload to post.";
                readonly format: "json";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Saved Search's ID.";
                };
                readonly access: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Access level. Options: viewers, editors";
                };
            };
            readonly required: readonly ["id", "access"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API Key.";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const SslCertsid: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "SHA-256, SHA-1 or MD5 identifying the SSL Certificate";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly default: "Your API key";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const UpdateCollectionsSubscriptionPreferences: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["data"];
        readonly properties: {
            readonly data: {
                readonly type: "string";
                readonly description: "A collection's subscription preferences object";
                readonly format: "json";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Collection's ID";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly meta: {
                    readonly type: "object";
                    readonly properties: {
                        readonly count: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [1];
                        };
                    };
                };
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly attributes: {
                            readonly type: "object";
                            readonly properties: {
                                readonly last_modification_date: {
                                    readonly type: "integer";
                                    readonly default: 0;
                                    readonly examples: readonly [1615802372];
                                };
                                readonly daily_email: {
                                    readonly type: "boolean";
                                    readonly default: true;
                                    readonly examples: readonly [true];
                                };
                                readonly creation_date: {
                                    readonly type: "integer";
                                    readonly default: 0;
                                    readonly examples: readonly [1615802372];
                                };
                            };
                        };
                        readonly type: {
                            readonly type: "string";
                            readonly examples: readonly ["collection_subscription_preferences"];
                        };
                        readonly id: {
                            readonly type: "string";
                            readonly examples: readonly ["<ID>"];
                        };
                    };
                };
                readonly links: {
                    readonly type: "object";
                    readonly properties: {
                        readonly self: {
                            readonly type: "string";
                            readonly examples: readonly ["https://virustotal.com/api/v3/collections/{id}/subscription_preferences"];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const UpdateSavedSearches: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["data"];
        readonly properties: {
            readonly data: {
                readonly type: "string";
                readonly description: "Payload to patch.";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Saved Search's ID.";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly attributes: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A comma-separated list of the [_saved search attributes_](ref:saved-search-object#object-attributes) to be returned. (All attributes are returned by default.)";
                };
                readonly relationships: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Provides additional information about the saved search as [_relationships_](ref:saved-search-object#relationships)";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your AP Key.";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const UrlInfo: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "URL identifier or base64 representation of URL to scan (w/o padding)";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const UrlsAnalyse: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "URL identifier";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const UrlsCommentsGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "URL identifier";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly default: 10;
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Maximum number of comments to retrieve";
                };
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continuation cursor";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const UrlsCommentsPost: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["data"];
        readonly properties: {
            readonly data: {
                readonly type: "string";
                readonly description: "A comment object";
                readonly default: "{\"type\": \"comment\", \"attributes\": {\"text\": \"Lorem ipsum dolor sit ...\"}}";
                readonly format: "json";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "URL identifier";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const UrlsRelationships: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "URL identifier";
                };
                readonly relationship: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Relationship name (see [table](ref:url-object#relationships))";
                };
            };
            readonly required: readonly ["id", "relationship"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly default: 10;
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Maximum number of related objects to retrieve";
                };
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continuation cursor";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const UrlsRelationshipsIds: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "URL ID";
                };
                readonly relationship: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Relationship name (see [table](ref:url-object#relationships))";
                };
            };
            readonly required: readonly ["id", "relationship"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "string";
                    readonly default: "10";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Maximum number of related objects to retrieve";
                };
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continuation cursor";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const UrlsVotesGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "URL identifier";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly default: 10;
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Maximum number of votes to retrieve";
                };
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Continuation cursor";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const UrlsVotesPost: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["data"];
        readonly properties: {
            readonly data: {
                readonly type: "string";
                readonly description: "Vote object";
                readonly default: "{\"type\": \"vote\", \"attributes\": {\"verdict\": \"malicious\"}}";
                readonly format: "json";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "URL identifier";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "409": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly examples: readonly ["AlreadyExistsError"];
                        };
                        readonly message: {
                            readonly type: "string";
                            readonly examples: readonly ["User \"username\" already voted \"malicious\" for this url"];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const VoteComment: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["data"];
        readonly properties: {
            readonly data: {
                readonly type: "string";
                readonly description: "Vote type. Can be either `positive`, `negative` or `abuse`";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Comment ID";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const WatchlistsAssetsCreate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly RAW_BODY: {
                readonly type: "string";
                readonly format: "json";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly [];
        }];
    };
};
declare const WatchlistsAssetsidDelete: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The id of the Alerts Asset to delete";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly [];
        }];
    };
};
declare const Whoisid: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "SHA-256, SHA-1 or MD5 identifying the Whois";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const Widgeturl: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly query: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A file hash (md5, sha1 or sha256), URL, IP address or a Domain";
                };
                readonly fg1: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Theme primary foreground color in hex notation";
                };
                readonly bg1: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Theme primary background color in hex notation";
                };
                readonly bg2: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Theme secondary background color in hex notation";
                };
                readonly bd1: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Theme border color";
                };
            };
            readonly required: readonly ["query"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "429": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
export { AnalyseBinary, AnalysesGetDescriptors, AnalysesGetObjects, Analysis, ApiSearch, Assets, Assetsid, CheckUserHuntingRulesetEditor, CollectionsAddElement, CollectionsComments, CollectionsCommentsCreate, CollectionsCreate, CollectionsDelete, CollectionsDeleteElement, CollectionsExportAggregations, CollectionsExportIocs, CollectionsExportIocsRelationship, CollectionsGet, CollectionsUpdate, CommentIdDelete, CommentsRelationships, CommentsRelationshipsIds, CreateGraphs, CreateSavedSearches, CrowdsourcedYaraRuleRelationshipDescriptorsEndpoint, CrowdsourcedYaraRuleRelationshipEndpoint, DeleteAnIocStreamNotification, DeleteHuntingRulesetEditor, DeleteNotificationsFromTheIocStream, DeleteSavedSearches, DomainInfo, DomainVotesPost, DomainsCommentsGet, DomainsCommentsPost, DomainsRelationships, DomainsRelationshipsIds, DomainsRescan, DomainsVotesGet, Events, FeedsUrl, Feedsdomains2Time, FileAllBehavioursSummary, FileInfo, FilesAnalyse, FilesCommentsGet, FilesCommentsPost, FilesDownload, FilesDownloadUrl, FilesRelationships, FilesRelationshipsIds, FilesUploadUrl, FilesVotesGet, FilesVotesPost, GetACrowdsourcedYaraRule, GetASummaryOfAllMitreAttckTechniquesObservedInAFile, GetAllBehaviorReportsForAFile, GetAnIocStreamNotification, GetAttackTactics, GetAttackTacticsRelationship, GetAttackTacticsRelationshipDescriptor, GetAttackTechniques, GetAttackTechniquesRelationship, GetAttackTechniquesRelationshipDescriptor, GetCollectionsRelationship, GetCollectionsRelationshipDescriptor, GetCollectionsSubscriptionPreferences, GetComment, GetComments, GetFeedsIpAddresses, GetFileBehaviourId, GetFileBehavioursEvtx, GetFileBehavioursHtml, GetFileBehavioursMemdump, GetFileBehavioursPcap, GetFileBehavioursRelationship, GetFileBehavioursRelationshipDescriptor, GetGraphComments, GetObjectsFromTheIocStream, GetOperationsId, GetPopularThreatCategories, GetResolutionById, GetSavedSearches, GetSavedSearchesRelatedDescriptors, GetSavedSearchesRelationships, GetSha256HashComments, GetSigmaRules, GetSubmission, GetYaraRulesets, Graphs, GraphsAddEditor, GraphsAddViewer, GraphsCheckEditor, GraphsCheckViewer, GraphsDelete, GraphsDeleteEditor, GraphsDeleteViewer, GraphsEditors, GraphsInfo, GraphsRelationships, GraphsRelationshipsIds, GraphsUpdate, GraphsViewers, GroupsRelationshipsIds, IpCommentsGet, IpCommentsPost, IpInfo, IpRelationships, IpRelationshipsIds, IpVotes, IpVotesPost, ListCollections, ListCrowdsourcedYaraRules, ListSavedSearches, Metadata, MonitorItemComments, MonitorItemsAnalyses, MonitorItemsConfig, MonitorItemsCreate, MonitorItemsDelete, MonitorItemsDownload, MonitorItemsDownloadUrl, MonitorItemsFilter, MonitorItemsOwner, MonitorItemsStat, MonitorItemsUploadUrl, MonitorStatistics, MonitorpartnerCommentsDelete, MonitorpartnerCommentsPatch, MonitorpartnerDetectionsbundleDownload, MonitorpartnerDetectionsbundleDownloadUrl, MonitorpartnerFilesDownload, MonitorpartnerFilesDownloadUrl, MonitorpartnerHashes, MonitorpartnerHashesAnalyses, MonitorpartnerHashesComments, MonitorpartnerHashesItems, MonitorpartnerStatistics, Notifications, Notificationsid, PostGraphsComments, RescanIp, RevokeSavedSearchesAccess, SearchIocsInsideACollection, ShareSavedSearches, SslCertsid, UpdateCollectionsSubscriptionPreferences, UpdateSavedSearches, UrlInfo, UrlsAnalyse, UrlsCommentsGet, UrlsCommentsPost, UrlsRelationships, UrlsRelationshipsIds, UrlsVotesGet, UrlsVotesPost, VoteComment, WatchlistsAssetsCreate, WatchlistsAssetsidDelete, Whoisid, Widgeturl };
