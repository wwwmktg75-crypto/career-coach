# GitHub Pages 公開手順

このフォルダは、スライドHTMLをそのまま公開するための最小構成です。

## いまあるもの

- `index.html`
- `styles.css`
- `app.js`
- `.nojekyll`
- `.gitignore`
- `README.md`

## いちばん簡単な流れ

1. 新しい GitHub リポジトリを作る
2. このフォルダの中身をそのリポジトリに入れる
3. `main` ブランチへ push する
4. GitHub Pages を `main` / `/root` で有効にする

## ターミナルでやる場合

```bash
cd "/Users/akiko/Desktop/claudecode/AI-FUKUOKA/01_生成AI仕事術_HTML公開用"
git init
git add .
git commit -m "Publish 01 生成AI仕事術 slides"
git branch -M main
git remote add origin https://github.com/YOUR-USER-NAME/YOUR-REPO-NAME.git
git push -u origin main
```

## `gh` コマンドが使える場合

`gh` が入っていれば、次のようにもできます。

```bash
cd "/Users/akiko/Desktop/claudecode/AI-FUKUOKA/01_生成AI仕事術_HTML公開用"
git init
git add .
git commit -m "Publish 01 生成AI仕事術 slides"
git branch -M main
gh repo create YOUR-REPO-NAME --public --source=. --remote=origin --push
```

## Pages の設定

GitHub のリポジトリ画面で次を開きます。

1. `Settings`
2. `Pages`
3. `Build and deployment`
4. `Source` を `Deploy from a branch`
5. `Branch` を `main`
6. フォルダを `/root`
7. `Save`

## 公開URLの例

```text
https://YOUR-USER-NAME.github.io/YOUR-REPO-NAME/
```

## 補足

- このフォルダには原稿や設計メモは入っていません
- 公開されるのはHTMLスライド本体だけです
