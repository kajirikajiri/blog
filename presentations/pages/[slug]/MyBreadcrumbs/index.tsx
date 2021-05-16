import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { ChevronRight, HomeOutlined } from "@material-ui/icons";
import { Box } from "@material-ui/core";

type Props = {
  firstCategory?: string;
  secondCategory?: string;
  showCategory?: boolean;
};

export const MyBreadcrumbs = ({
  firstCategory,
  secondCategory,
  showCategory,
}: Props) => {
  return (
    <Box display="flex" alignItems="center">
      <Breadcrumbs separator={<ChevronRight color="disabled" />}>
        <Link color="inherit" href={`/`} style={{ display: "flex" }}>
          <HomeOutlined />
        </Link>
        {showCategory && (
          <Link color="inherit" href={`/category`}>
            {"カテゴリ一覧"}
          </Link>
        )}
        {firstCategory && (
          <Link color="inherit" href={`/category/${firstCategory}`}>
            {firstCategory}
          </Link>
        )}
        {secondCategory && (
          <Link
            color="inherit"
            href={`/category/${firstCategory}/${secondCategory}`}
          >
            {secondCategory}
          </Link>
        )}
      </Breadcrumbs>
      <Box marginX={"8px"} display="flex">
        <ChevronRight color="disabled" />
      </Box>
    </Box>
  );
};
