import { CoverImage } from "@/components/CoverImage";
import Layout from "@/components/Layout";
import { getAllPosts, getTreemapData } from "@/lib/api";
import { Box, Link } from "@material-ui/core";
import { MyBreadcrumbs } from "../[slug]/MyBreadcrumbs";
import { StarOutline } from "@material-ui/icons";

export const Profile = () => {
  return (
    <>
      <Layout
        headerComponent={"h1"}
        title="プロフィール | かじりブログ"
        description={`かじりのプロフィールページです。A statically generated blog using Next.js by かじり.`}
      >
        <MyBreadcrumbs />
        <Box height={20}></Box>
        <p>とつぜんですがここで２枚の画像をごらんください</p>
        <Box height={"70vh"}></Box>
        <Box display="flex">
          <Box>
            あふたー
            <CoverImage
              src={"/assets/profile/new_kajiri.png"}
              title={"new_kajiri"}
            />
          </Box>
          <Box>
            びふぉー
            <CoverImage
              src={"/assets/profile/old_kajiri.png"}
              title={"old_kajiri"}
            />
          </Box>
        </Box>
        <Box component="p" style={{ fontWeight: "bold" }}>
          これが都会の力です。。。
        </Box>
        <Box height={"30vh"}></Box>
        <p>冗談はさておき。</p>
        <p>みなさんこんにちは、かじりです。</p>
        <p>
          岩手にいたころは最寄りのコンビニが5km先にありました。東京はいいですね、５分ですよ。
        </p>
        <p>
          まぁ、amazon大好きなんで、どこにいようがあまり生活は変わらないわけです。
        </p>
        <p>
          amazonではアンクルウェイト買ってダイエットしてました。脚につけるおもりですね。はずしたらめちゃくちゃジャンプできるとか、ダッシュが早くなるみたいなことは一切ありませんでした。ダボダボなズボン買って移動のとき、会社に行く時常に装着してました。さすがに会社につけていくのはチャレンジングだったなとおもってます
        </p>
        <p>
          チャレンジすることが好きで体をでかくしたい！
          と思って、半年で78kgくらいから103kgくらいまで増量して体を壊しました。
          <Link color="inherit" href="/stretch-before-going-to-bed">
            こちら
            <StarOutline fontSize="small" />
          </Link>
          の記事にもすこし書いてます。学びとしては極端にやりすぎるのはよくないってことです。限界はあります！
        </p>
        <p>
          副業にもチャレンジしました、あるときはコーディングテストでおちたりしたわけですが、gitのコミットをきれいに書く必要性を学べたり、普段と異なる環境ってのは刺激があってたのしいですね！
          エンジニアの方は副業チャレンジしてもいいかもです。
          <Link color="inherit" href="/engineer-side-job-once-a-week">
            こっち
            <StarOutline fontSize="small" />
          </Link>
          でちらっと副業の探し方をかきました。アフィとかじゃなく、自分でエージェントを４社くらい使ったときの学びをまとめてます。よかったらどうぞ！
        </p>
        <p>
          あと本が好きです！技術書やエンジニアの生き方みたいな本を読んでます。最近はマーケティングを勉強したくて本をかいました。いろいろ売りたいなと思って。というのも、開発は自分でできるようになったのですが、売り方がわかりません。amazonのアフィリエイトを３回くらい挑戦して３ヶ月の間に一度も購入されないから審査毎回落ちてます。chromeブラウザやvscodeで拡張機能を作成してみたのですがトータルダウンロードが20くらいです。本格的に売ろうと思ったわけではないですが、作っただけだと売れないわけです。最近読んだマーケ本はツイッターノミクスです。ウッフィー大事(信用みたいなもの)。弊社CEOにおすすめのマーケ本聴いて、「ジョブ理論」や「USJを劇的に変えた、たった１つの考え方」、自分で調べて「ハイパワー・マーケティング」を読みました。今はphilip
          kotlerの「Marketing
          Management」を読んでます。何となくわかってきたのでこのプロフィールページを書いてるわけです。このページ、最初は自分が登録してるgithubやcodesandboxのリンクを載せてるだけでしたが、よく見られるページなのでもう少し力を入れようと思ったわけです。
        </p>
        <p>
          次にやりたいこととして、世間の流れ的にノーコードでサンプル作成が流行ってきてるのを感じているので手を出しておこうと思ってます。あくまでサンプル作成くらいのものしか今は作れないだろうと勝手に思ってますが、そのうち見た目の部分は大部分がノーコード、部分的にコーディングになりそうだなとは思ってます。それでいくとデータベースの定義とかは会社ごとに違ってノーコード無理そうだなって思ってるのでそっちにシフトするのもありかな、思ってます。
        </p>
        <p>
          もともと工場勤務から転職してプログラマになったので、その時にわかってたらよかったなって言うことをまとめて記事を書いたので
          <Link color="inherit" href="/when-you-dont-know-how-to-program">
            そちら
            <StarOutline fontSize="small" />
          </Link>
          も見ていただけると嬉しいです！
        </p>
        <p>
          これからもチャレンジングに生きていきます！チャレンジしないのがリスク！
        </p>
      </Layout>
    </>
  );
};

// ビルド時に実行される
// https://qiita.com/matamatanot/items/1735984f40540b8bdf91
export const getStaticProps = async () => {
  const allPosts = getAllPosts(["category"]);

  const treemapData = getTreemapData(allPosts);

  return {
    props: { treemapData },
  };
};
