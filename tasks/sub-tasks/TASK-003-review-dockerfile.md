# TASK-003: Dockerfile.webの無駄レビュー

## 目的
Dockerfile.webの無駄なレイヤや重複を洗い出し、ビルド時間・イメージサイズを最適化する。

## ToDo
- [ ] Dockerfile.webの全体構成確認
- [ ] 重複するパッケージインストール命令の見直し
- [ ] キャッシュ効率化のためのCOPY/WORKDIR順序最適化
- [ ] 不要なファイル・フォルダのCOPY削除検討
- [ ] イメージサイズ削減のためのSlim化オプション検討
- [x] シンプル単一ステージ版のDockerfile作成
- [x] シンプル単一ステージ版のAPI用Dockerfile作成
- [x] 提案内容をまとめてレビュー完了をTASKS.mdに反映 