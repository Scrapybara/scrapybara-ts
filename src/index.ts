/* tslint:disable */
/* eslint-disable */
export * from './runtime';
export * from './apis/index';
export * from './models/index';

import { Configuration } from './runtime';
import { HelpersApi } from './apis/HelpersApi';
import { ScriptExecutionApi } from './apis/ScriptExecutionApi';
import { ScriptGenerationApi } from './apis/ScriptGenerationApi';
import { ScriptManagementApi } from './apis/ScriptManagementApi';

import { FetchHtmlResponse } from './models/FetchHtmlResponse';
import { FetchHtmlRequest } from './models/FetchHtmlRequest';
import { ExecuteScriptResponse } from './models/ExecuteScriptResponse';
import { ExecuteScriptRequest } from './models/ExecuteScriptRequest';
import { GenerateScriptResponse } from './models/GenerateScriptResponse';
import { GenerateScriptRequest } from './models/GenerateScriptRequest';
import { GetScriptResponse } from './models/GetScriptResponse';

export class ScrapybaraClient {
  private configuration: Configuration;
  private helpersApi: HelpersApi;
  private scriptExecutionApi: ScriptExecutionApi;
  private scriptGenerationApi: ScriptGenerationApi;
  private scriptManagementApi: ScriptManagementApi;

  constructor(apiKey: string) {
    this.configuration = new Configuration({
      apiKey: apiKey,
    });
    this.helpersApi = new HelpersApi(this.configuration);
    this.scriptExecutionApi = new ScriptExecutionApi(this.configuration);
    this.scriptGenerationApi = new ScriptGenerationApi(this.configuration);
    this.scriptManagementApi = new ScriptManagementApi(this.configuration);
  }

  async fetchHtml(fetchHtmlRequest: FetchHtmlRequest): Promise<FetchHtmlResponse> {
    return this.helpersApi.fetchHtml({ fetchHtmlRequest });
  }

  async executeScript(executeScriptRequest: ExecuteScriptRequest): Promise<ExecuteScriptResponse> {
    return this.scriptExecutionApi.executeScript({ executeScriptRequest });
  }

  async generateScript(generateScriptRequest: GenerateScriptRequest): Promise<GenerateScriptResponse> {
    return this.scriptGenerationApi.generateScript({ generateScriptRequest });
  }

  async deleteScript(scriptId: string): Promise<void> {
    return this.scriptManagementApi.deleteScript({ scriptId });
  }

  async getScript(scriptId: string): Promise<GetScriptResponse> {
    return this.scriptManagementApi.getScript({ scriptId });
  }

}