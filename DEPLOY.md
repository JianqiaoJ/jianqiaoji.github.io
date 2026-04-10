# 发布到 www.jianqiaoji.com（GitHub Pages + 阿里云 DNS）

## 1. 在 GitHub 创建仓库

1. 打开 https://github.com/new  
2. 仓库名建议：`jianqiaoji.github.io`（或任意名如 `portfolio`，则站点地址为 `https://用户名.github.io/仓库名/`）  
3. **Public**，不要勾选 README  
4. 创建后复制仓库的 HTTPS 地址，例如：`https://github.com/你的用户名/jianqiaoji.github.io.git`

## 2. 本机推送（在本目录执行）

```bash
cd "/Users/jianqiaoji/Downloads/个人作品集"
git remote add origin https://github.com/你的用户名/jianqiaoji.github.io.git
# 若已存在 origin，改用：git remote set-url origin https://github.com/...
git add -A
git commit -m "Deploy: redirect index to casestudy, update portfolio"
git push -u origin main
```

首次推送在浏览器或终端按提示登录 GitHub（建议使用 **Personal Access Token** 代替密码）。

## 3. 开启 GitHub Pages

仓库 **Settings → Pages**：

- **Source**：Deploy from a branch  
- **Branch**：`main` / **folder** `(root)`  
- **Custom domain** 填：`www.jianqiaoji.com`  
- 保存后勾选 **Enforce HTTPS**（DNS 生效后可用）

仓库根目录已有 `CNAME` 文件，内容为 `www.jianqiaoji.com`。

## 4. 阿里云 DNS 解析

在域名 `jianqiaoji.com` 的解析设置中添加：

| 类型 | 主机记录 | 记录值 |
|------|----------|--------|
| CNAME | www | `你的GitHub用户名.github.io` |
| A | @ | `185.199.108.153` |
| A | @ | `185.199.109.153` |
| A | @ | `185.199.110.153` |
| A | @ | `185.199.111.153` |

说明：`www` 用 CNAME 指向 GitHub；根域名 `@` 用四条 A 记录指向 GitHub Pages（与 GitHub 文档一致）。

解析生效后等待数分钟至数小时，再访问 https://www.jianqiaoji.com

## 5. 其他页面

原 3D 入口页已备份为 **index-hub.html**，可直接访问：`https://www.jianqiaoji.com/index-hub.html`
