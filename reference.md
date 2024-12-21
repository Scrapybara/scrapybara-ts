# Reference

<details><summary><code>client.<a href="/src/Client.ts">get</a>(instanceId) -> Scrapybara.GetInstanceResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.get("instance_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ScrapybaraClient.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

##

## Instance

<details><summary><code>client.instance.<a href="/src/api/resources/instance/client/Client.ts">screenshot</a>(instanceId) -> Scrapybara.InstanceScreenshotResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.instance.screenshot("instance_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Instance.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.instance.<a href="/src/api/resources/instance/client/Client.ts">getStreamUrl</a>(instanceId) -> Scrapybara.InstanceGetStreamUrlResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.instance.getStreamUrl("instance_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Instance.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.instance.<a href="/src/api/resources/instance/client/Client.ts">computer</a>(instanceId, { ...params }) -> unknown</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.instance.computer("instance_id", {
    action: "key",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**request:** `Scrapybara.ComputerRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Instance.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.instance.<a href="/src/api/resources/instance/client/Client.ts">bash</a>(instanceId, { ...params }) -> unknown</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.instance.bash("instance_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**request:** `Scrapybara.BashRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Instance.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.instance.<a href="/src/api/resources/instance/client/Client.ts">edit</a>(instanceId, { ...params }) -> unknown</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.instance.edit("instance_id", {
    command: "view",
    path: "path",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**request:** `Scrapybara.EditRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Instance.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.instance.<a href="/src/api/resources/instance/client/Client.ts">stop</a>(instanceId) -> Scrapybara.StopInstanceResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.instance.stop("instance_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Instance.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Agent

<details><summary><code>client.agent.<a href="/src/api/resources/agent/client/Client.ts">act</a>(instanceId, { ...params }) -> Scrapybara.ActResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.agent.act("instance_id", {
    cmd: "cmd",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**request:** `Scrapybara.ActRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Agent.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.agent.<a href="/src/api/resources/agent/client/Client.ts">scrape</a>(instanceId, { ...params }) -> Scrapybara.ScrapeResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.agent.scrape("instance_id", {
    cmd: "cmd",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**request:** `Scrapybara.ScrapeRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Agent.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Browser

<details><summary><code>client.browser.<a href="/src/api/resources/browser/client/Client.ts">start</a>(instanceId) -> Scrapybara.StartBrowserResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.browser.start("instance_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Browser.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.browser.<a href="/src/api/resources/browser/client/Client.ts">getCdpUrl</a>(instanceId) -> Scrapybara.BrowserGetCdpUrlResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.browser.getCdpUrl("instance_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Browser.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.browser.<a href="/src/api/resources/browser/client/Client.ts">authenticate</a>(instanceId, { ...params }) -> Scrapybara.BrowserAuthenticateResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Authenticate browser with Anon for all available apps

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.browser.authenticate("instance_id", {
    contextId: "context_id",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**request:** `Scrapybara.BrowserAuthenticateRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Browser.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.browser.<a href="/src/api/resources/browser/client/Client.ts">stop</a>(instanceId) -> Scrapybara.StopBrowserResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.browser.stop("instance_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Browser.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Code

<details><summary><code>client.code.<a href="/src/api/resources/code/client/Client.ts">execute</a>(instanceId, { ...params }) -> unknown</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.code.execute("instance_id", {
    code: "code",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**request:** `Scrapybara.CodeExecuteRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Code.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Notebook

<details><summary><code>client.notebook.<a href="/src/api/resources/notebook/client/Client.ts">listKernels</a>(instanceId) -> Scrapybara.KernelInfo[]</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.notebook.listKernels("instance_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Notebook.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.notebook.<a href="/src/api/resources/notebook/client/Client.ts">create</a>(instanceId, { ...params }) -> Scrapybara.Notebook</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.notebook.create("instance_id", {
    name: "name",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**request:** `Scrapybara.CreateNotebookRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Notebook.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.notebook.<a href="/src/api/resources/notebook/client/Client.ts">get</a>(instanceId, notebookId) -> Scrapybara.Notebook</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.notebook.get("instance_id", "notebook_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**notebookId:** `string`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Notebook.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.notebook.<a href="/src/api/resources/notebook/client/Client.ts">delete</a>(instanceId, notebookId) -> Record<string, unknown></code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.notebook.delete("instance_id", "notebook_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**notebookId:** `string`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Notebook.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.notebook.<a href="/src/api/resources/notebook/client/Client.ts">addCell</a>(instanceId, notebookId, { ...params }) -> Scrapybara.NotebookCell</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.notebook.addCell("instance_id", "notebook_id", {
    type: "code",
    content: "content",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**notebookId:** `string`

</dd>
</dl>

<dl>
<dd>

**request:** `Scrapybara.AddCellRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Notebook.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.notebook.<a href="/src/api/resources/notebook/client/Client.ts">executeCell</a>(instanceId, notebookId, cellId, { ...params }) -> Scrapybara.NotebookCell</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.notebook.executeCell("instance_id", "notebook_id", "cell_id", {});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**notebookId:** `string`

</dd>
</dl>

<dl>
<dd>

**cellId:** `string`

</dd>
</dl>

<dl>
<dd>

**request:** `Scrapybara.ExecuteCellRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Notebook.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.notebook.<a href="/src/api/resources/notebook/client/Client.ts">execute</a>(instanceId, notebookId, { ...params }) -> Scrapybara.NotebookCell[]</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.notebook.execute("instance_id", "notebook_id", {});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**notebookId:** `string`

</dd>
</dl>

<dl>
<dd>

**request:** `Scrapybara.ExecuteCellRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Notebook.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## File

<details><summary><code>client.file.<a href="/src/api/resources/file/client/Client.ts">read</a>(instanceId, { ...params }) -> Scrapybara.FileReadResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.file.read("instance_id", {
    path: "path",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**request:** `Scrapybara.FileReadRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `File_.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.file.<a href="/src/api/resources/file/client/Client.ts">write</a>(instanceId, { ...params }) -> Record<string, unknown></code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.file.write("instance_id", {
    path: "path",
    content: "content",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**request:** `Scrapybara.FileWriteRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `File_.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.file.<a href="/src/api/resources/file/client/Client.ts">upload</a>(instanceId, { ...params }) -> Record<string, unknown></code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.file.upload("instance_id", {
    path: "path",
    content: "content",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**request:** `Scrapybara.FileUploadRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `File_.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.file.<a href="/src/api/resources/file/client/Client.ts">download</a>(instanceId, { ...params }) -> Scrapybara.FileDownloadResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.file.download("instance_id", {
    path: "path",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**request:** `Scrapybara.FileDownloadRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `File_.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Env

<details><summary><code>client.env.<a href="/src/api/resources/env/client/Client.ts">get</a>(instanceId) -> Scrapybara.EnvGetResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.env.get("instance_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Env.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.env.<a href="/src/api/resources/env/client/Client.ts">set</a>(instanceId, { ...params }) -> Scrapybara.EnvResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.env.set("instance_id", {
    variables: {
        key: "value",
    },
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**request:** `Scrapybara.EnvSetRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Env.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.env.<a href="/src/api/resources/env/client/Client.ts">delete</a>(instanceId, { ...params }) -> Scrapybara.EnvResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.env.delete("instance_id", {
    keys: ["keys"],
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**request:** `Scrapybara.EnvDeleteRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Env.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>
