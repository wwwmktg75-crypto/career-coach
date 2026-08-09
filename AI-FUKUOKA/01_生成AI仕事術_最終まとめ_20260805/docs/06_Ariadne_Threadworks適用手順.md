# 01_生成AI仕事術 に Ariadne Threadworks を適用する手順

最終更新: 2026-08-08

## 結論

`Ariadne Threadworks` の最新版は、`01_生成AI仕事術` のような講習資料づくりに使えます。

ただし、これはワンクリック自動生成ツールではありません。`Clew → Loom → Weft → Tapestry` の流れで進める **半自動の資料制作パイプライン** です。`--emit` で材料を出し、LLM が判断して JSON を作り、`--ingest` で戻す工程を何度か繰り返します。

今回の資料に使うなら、目的は次の3つです。

1. 既存の資料群を重複なく1本の正本へ統合する
2. 90分講義向けの講習資料と講師ノートを作る
3. その内容を読み物とスライドへ展開する

## 前提確認

GitHub の最新公開版は、2026-08-08 時点でローカルの旧版より新しく、`gate` や `ariadne intent/run/review` などの運用支援が追加されています。

- ローカル旧版: `e60e4b8`
- GitHub 最新確認時 HEAD: `8520ea9`

このため、実際に進めるときは **ローカルの古いクローンではなく GitHub の最新版前提** で考えるのが安全です。

## 今回の資料でのおすすめ進め方

### 1. 入力資料をそろえる

まず `01_生成AI仕事術` に関係する元資料を集めます。今回のフォルダ構成を見る限り、候補は次です。

- `docs/01_90分アウトライン.md`
- `docs/02_見開き設計書.md`
- `docs/03_前半資料ドラフト.md`
- `docs/04_スライド出力構成.md`
- `drafts/` 内の補助原稿
- 必要なら `slides/index.html` に対応する実装済みスライドの構成情報
- 必要なら `references/` の参考 PDF

ここで大事なのは、最初から絞りすぎないことです。Ariadne の最新 README / RUNBOOK では、利用者が明示的に範囲を狭めない限り、**網羅抽出が既定動作** です。

### 2. 最新版 repo を別ディレクトリで使う

旧クローンを直接いじるより、最新版を新しく使うほうが安全です。

実施イメージ:

```bash
git clone https://github.com/AI-Fukuoka/ariadne_threadworks.git
cd ariadne_threadworks
python -m venv .venv
source .venv/bin/activate
pip install -e .
pip install pytest
pytest tests/ -q
python -m clew doctor
```

README では `pytest tests/ -q` が通ること、`python -m clew doctor` で環境診断することが最初の確認になっています。

### 3. この講座向けの資料を `資料フォルダ/` へ入れる

最新版の想定フローでは、元資料は repo 内の `資料フォルダ/` に置きます。

今回なら、たとえば次のような構成で始めるのが分かりやすいです。

- `資料フォルダ/01_90分アウトライン.md`
- `資料フォルダ/02_見開き設計書.md`
- `資料フォルダ/03_前半資料ドラフト.md`
- `資料フォルダ/04_スライド出力構成.md`
- `資料フォルダ/05_内容まとめ_文章版.md`

最初は `references/` の PDF を入れず、**一次資料だけで1周回す** のがおすすめです。参考資料まで一気に混ぜると、Loom の統合量が増えすぎます。

### 4. Clew で取り込む

まずは形式ごとに取り込みます。

```bash
python -m clew add "資料フォルダ/01_90分アウトライン.md" --dry-run
python -m clew add "資料フォルダ/01_90分アウトライン.md"
```

同様に各ファイルを追加します。

もし PowerPoint や PDF を使う場合は、`python -m clew doctor` で COM や画像化の可否を確認してから進めます。最新版 RUNBOOK では、図や視覚情報の確認は既定動作です。

### 5. Loom で正本を作る

この段階がいちばん重要です。最新版 README でも、**Loom が薄いと以降すべてが薄い** と明記されています。

基本の流れ:

```bash
python -m loom build --to-stage L1 --master-id MST01
python -m loom extract MST01 SRC01 --emit
python -m loom extract MST01 SRC01 --ingest cards.json
python -m loom cluster MST01 --emit
python -m loom cluster MST01 --ingest judgments.json
python -m loom conflicts MST01 --emit
python -m loom conflicts MST01 --ingest conflicts.json
python -m loom outline MST01 --emit
python -m loom outline MST01 --ingest outline.json
python -m loom compose MST01 --emit
python -m loom compose MST01 --ingest bodies.json
python -m loom validate MST01
python -m ariadne gate L6 MST01
```

今回のテーマだと、Loom の章立てはおそらく次の軸にすると相性がよいです。

1. 生成AIの基本理解
2. 2026年時点の常識
3. チャットからエージェントへの変化
4. リスクとルール
5. 実務への落とし込み

今ある `05_内容まとめ_文章版.md` は、Loom の最終アウトプット像を考えるうえでかなり近い参考になります。

### 6. Weft で90分講義版に落とす

正本ができたら、次は講習条件を与えて講義1本に絞ります。

```bash
python -m weft new --master MST01 --duration 90 --audience "非エンジニア初学者" --goal "生成AIを仕事で小さく使い始められる"
python -m weft plan WFT01 --emit
python -m weft plan WFT01 --ingest plan.json
python -m weft notes WFT01 --emit
python -m weft notes WFT01 --ingest notes.json
python -m weft compose WFT01 --emit
python -m weft compose WFT01 --ingest bodies.json
python -m weft validate WFT01
python -m weft approve WFT01 --by <名前>
```

今回の講義では、`全部を説明する` より `受講者が1つ試せる状態になる` ことをゴールに置くのが合っています。

### 7. Tapestry で読み物とスライドへ展開する

講義版ができたら、最後に見せ方へ落とします。

```bash
python -m tapestry new --weft WFT01
python -m tapestry plan DCK01 --emit
python -m tapestry plan DCK01 --ingest plan.json
python -m tapestry figures DCK01 --emit
python -m tapestry figures DCK01 --ingest figures.json
python -m tapestry image DCK01 --emit
python -m tapestry image DCK01 --ingest prompts.json
python -m tapestry render DCK01
```

ここで期待する成果物は次です。

- `deck.md`
- `handout.html`
- `prompts_slide.md`
- 必要なら `pptx`

いまの `slides/` 実装がすでにあるので、Ariadne を使う場合は **ゼロからデザインする** より、`内容の正本化と講義用再構成` に価値が出ます。

## 今回の資料で特に相性がいい使い方

今回の `01_生成AI仕事術` に対しては、次の使い方が特に向いています。

- 既存のアウトライン、原稿、スライド構成の重複を整理する
- 「話し言葉向け」「配布読み物向け」「スライド向け」の3層を切り分ける
- どの主張がどの元資料に由来するかを追跡できるようにする
- 今後 `30分版` `90分版` `非エンジニア版` `経営層版` を分岐しやすくする

逆に、次の用途なら今すぐ無理に使わなくてもよいです。

- すでに完成している1本の資料を少しだけ整える
- 今日中に見た目だけ整ったスライドを急ぎで出したい
- 出典追跡より、感覚的にすばやく叩き台を作りたい

## 実務判断

今回の資料でのおすすめは、いきなり全投入せず **小さく検証すること** です。

最初の1周はこの範囲が現実的です。

1. `docs/01_90分アウトライン.md`
2. `docs/03_前半資料ドラフト.md`
3. `docs/04_スライド出力構成.md`
4. `docs/05_内容まとめ_文章版.md`

この4本で `MST01 → WFT01` まで作れれば、Ariadne を今回のテーマに実戦投入できるかかなり見えます。そのあと必要に応じて `見開き設計書` や `references/` を追加するのが安全です。

## すでに資料をまとめている場合の短縮ルート

今回のように、すでに内容整理がかなり進んでいる場合は、`Clew` を本格的な資料収集フェーズとして使うより、**整理済み文書を Ariadne に読ませて Loom / Weft / Tapestry へ進む** ほうが現実的です。

おすすめの開始点は次の5本です。

1. `docs/01_90分アウトライン.md`
2. `docs/03_前半資料ドラフト.md`
3. `docs/04_スライド出力構成.md`
4. `docs/05_内容まとめ_文章版.md`
5. 必要なら `docs/02_見開き設計書.md`

この場合の考え方は、`Clew` で元資料を大量にほどくというより、**すでに整理した資料群を Source として最小限取り込み、Loom で正本化する** 形です。

### 短縮ルートの流れ

1. 整理済みの md だけを `資料フォルダ/` に入れる
2. `clew add` で md を取り込む
3. すぐに `Loom` へ進み、正本を1本に統合する
4. `Weft` で90分講義版を作る
5. `Tapestry` で読み物とスライドへ展開する

### 実際の開始順

まずはこの順で十分です。

```bash
python -m clew add "資料フォルダ/01_90分アウトライン.md"
python -m clew add "資料フォルダ/03_前半資料ドラフト.md"
python -m clew add "資料フォルダ/04_スライド出力構成.md"
python -m clew add "資料フォルダ/05_内容まとめ_文章版.md"
```

そのあと、すぐに Loom の最初の段階へ入ります。

```bash
python -m loom build --to-stage L1 --master-id MST01
python -m ariadne run MST01
```

`ariadne run MST01` は、「次に何をやるべきか」を1手ずつ返すので、今回のような途中参加に向いています。

### 今回いちばん相性のよい進め方

今回のテーマでは、いきなり細かい出典トレースを全部作り込むより、まず次の到達点を目指すのがよいです。

1. `05_内容まとめ_文章版.md` を核にした `master.md` を作る
2. そこから `非エンジニア初学者向け90分版` を `WFT01` として組む
3. 最後に `deck.md` と `handout.html` まで出せるかを見る

つまり、今回は **Clew を入口、Loom を本丸** と考えると進めやすいです。

## 次にやるとよいこと

もっとも無理のない次の一手は次です。

1. GitHub 最新版を別ディレクトリへ clone する
2. `01_生成AI仕事術` 用の整理済み md 4本を `資料フォルダ/` へコピーする
3. `Clew` で md だけ取り込む
4. `Loom` の最初の `extract --emit` を1資料だけ試す

ここまでできれば、「このテーマで本当に回せるか」が机上ではなく実データで判断できます。
