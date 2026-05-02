# 🚀 Advanced Memo App (React + TypeScript)

モダンな技術スタックで構築した、多機能なメモ帳アプリです。
<img width="893" height="642" alt="スクリーンショット 2026-05-02 145339" src="https://github.com/user-attachments/assets/0a58245f-c838-4880-a618-12ecacb7fe5e" />

## ✨ 特徴
- **TypeScript**: 型安全なコード設計
- **Framer Motion**: スムーズなアニメーション（追加・削除・編集時）
- **LocalStorage**: ブラウザを閉じてもデータが消えません
- **ファイル出力**: メモの内容を `.txt` ファイルとしてダウンロード可能
- **編集機能**: ダブルクリックで直感的にメモ内容を編集

## 🛠 技術スタック
- **Frontend**: React (Vite)
- **Language**: TypeScript
- **Animation**: Framer Motion
- **Styling**: Inline Styles (Modern Card UI)

## 📦 インストールと起動
```bash
# クローン
git clone [https://github.com/hirof35/my-memo-app.git](https://github.com/hirof35/my-memo-app.git)

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
📝 使い方
メモを入力して「追加」ボタンまたは Enter キーを押します。

メモを編集するには、メモのテキストをダブルクリックするか「編集」ボタンを押します。

削除ボタンでメモを削除できます。

「.txt形式で書き出す」ボタンで、現在のメモ一覧を保存できます。


---

## 2. GitHubに反映させる
ファイルを保存したら、ターミナルで以下のコマンドを実行してGitHubにアップロードします。

```bash
# 変更をステージング
git add README.md

# コミット
git commit -m "Update README with project details"

# GitHubに送信
git push origin main
