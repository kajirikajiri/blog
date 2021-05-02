import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { ChevronRight, Home } from "@material-ui/icons";
import { Box } from "@material-ui/core";

type Props = {
  firstCategory: string;
  secondCategory: string;
};

export const MyBreadcrumbs = ({ firstCategory, secondCategory }: Props) => {
  return (
    <Box display="flex" alignItems="center">
      <Breadcrumbs separator={<ChevronRight color="disabled" />}>
        <Link color="inherit" href={`/`} style={{ display: "flex" }}>
          <Home />
        </Link>
        <Link color="inherit" href={`/category/${firstCategory}`}>
          {firstCategory}
        </Link>
        <Link
          color="inherit"
          href={`/category/${firstCategory}/${secondCategory}`}
        >
          {secondCategory}
        </Link>
      </Breadcrumbs>
      <Box marginX={"8px"} display="flex">
        <ChevronRight color="disabled" />
      </Box>
    </Box>
  );
};
