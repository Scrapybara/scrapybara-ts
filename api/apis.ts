export * from './helpersApi';
import { HelpersApi } from './helpersApi';
export * from './scriptExecutionApi';
import { ScriptExecutionApi } from './scriptExecutionApi';
export * from './scriptGenerationApi';
import { ScriptGenerationApi } from './scriptGenerationApi';
export * from './scriptManagementApi';
import { ScriptManagementApi } from './scriptManagementApi';
import * as http from 'http';

export class HttpError extends Error {
    constructor (public response: http.IncomingMessage, public body: any, public statusCode?: number) {
        super('HTTP request failed');
        this.name = 'HttpError';
    }
}

export { RequestFile } from '../model/models';

export const APIS = [HelpersApi, ScriptExecutionApi, ScriptGenerationApi, ScriptManagementApi];
