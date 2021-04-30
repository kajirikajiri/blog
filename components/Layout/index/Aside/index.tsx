import { Box } from "@material-ui/core";

export const Aside = () => {
  return (
    <Box width={365.8}>
      <aside>
        <Box height={300} bgcolor="pink" marginBottom={"42px"}>
          広告
        </Box>
        <Box height={45} bgcolor="pink" marginBottom={"45px"}>
          検索
        </Box>
        <Box height={317} bgcolor="pink" marginBottom={"45px"}>
          プロフ
        </Box>
        <Box height={256} bgcolor="pink" marginBottom={"45px"}>
          問い合わせ
        </Box>
        <Box height={270} bgcolor="pink" marginBottom={"45px"}>
          カテゴリ
        </Box>
        <Box height={10} bgcolor="pink" marginBottom={"45px"}>
          TOC
        </Box>
      </aside>
    </Box>
  );
};
