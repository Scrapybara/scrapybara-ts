/**
 * Scrapybara API
 * Scrapybara API provides web automation, capybara-style. It allows users to generate, execute, and manage scripts.
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { RequestFile } from './models';

export class ScriptExecutionResponse {
    /**
    * The execution status (e.g., \'in_progress\', \'completed\', \'error\').
    */
    'status': string;
    /**
    * Additional details about the execution status or errors.
    */
    'statusDescription': string;
    /**
    * The data extracted by the script.
    */
    'result': object;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "status",
            "baseName": "status",
            "type": "string"
        },
        {
            "name": "statusDescription",
            "baseName": "status_description",
            "type": "string"
        },
        {
            "name": "result",
            "baseName": "result",
            "type": "object"
        }    ];

    static getAttributeTypeMap() {
        return ScriptExecutionResponse.attributeTypeMap;
    }
}

