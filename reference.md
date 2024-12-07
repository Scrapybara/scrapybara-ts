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
