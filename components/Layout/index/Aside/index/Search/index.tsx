import {
  InputAdornment,
  TextField,
  List,
  makeStyles,
  Box,
} from "@material-ui/core";
import { indigo } from "@material-ui/core/colors";
import { SearchOutlined } from "@material-ui/icons";
import algoliaSearch from "algoliasearch/lite";
import {
  InstantSearch,
  connectSearchBox,
  connectHits,
  connectHighlight,
} from "react-instantsearch-dom";

export const Search = () => {
  const CustomSearchBox = connectSearchBox(({ currentRefinement, refine }) => {
    return (
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlined color="disabled" />
            </InputAdornment>
          ),
        }}
        placeholder="Powered by Algolia"
        variant="outlined"
        value={currentRefinement}
        onChange={(e) => refine(e.currentTarget.value)}
        style={{ width: "100%" }}
      />
    );
  });
  const CustomHighlight = connectHighlight(({ hit, highlight, attribute }) => {
    const parsedHit = highlight({
      highlightProperty: "_highlightResult",
      attribute,
      hit,
    });
    return (
      <>
        {parsedHit.map((part, index) =>
          part.isHighlighted ? (
            <Box
              component="span"
              key={index}
              style={{
                background: indigo[100],
                color: indigo[900],
              }}
            >
              {part.value.substr(0, 50)}
              {part.value.length > 50 ? "..." : ""}
            </Box>
          ) : (
            <Box component="span" key={index}>
              {part.value.substr(0, 50)}
              {part.value.length > 50 ? "..." : ""}
            </Box>
          )
        )}
      </>
    );
  });
  const useStyle = makeStyles({
    root: {
      overflowY: "scroll",
      maxHeight: "60vh",
    },
  });
  const CustomHits = connectHits(({ hits }) => {
    const classes = useStyle();
    return (
      <>
        <List className={classes.root}>
          {hits.map((hit) => (
            <Box
              key={hit.objectID}
              marginX={1}
              marginY={2}
              paddingLeft={1}
              borderLeft="1px solid black"
            >
              <Box fontSize={18} marginBottom={1}>
                <CustomHighlight hit={hit} attribute="title" />
              </Box>
              <Box color="#0000008A" marginBottom={0.3}>
                <CustomHighlight hit={hit} attribute="excerpt" />
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                flexWrap="wrap"
                fontSize={13}
              >
                <Box>
                  <CustomHighlight hit={hit} attribute="date" />
                </Box>
                <Box display="flex">
                  <CustomHighlight hit={hit} attribute="firstCategory" />
                  <Box marginX={0.5}>{">"}</Box>
                  <CustomHighlight hit={hit} attribute="secondCategory" />
                </Box>
              </Box>
            </Box>
          ))}
        </List>
        <Box display="flex" width="100%" justifyContent="flex-end" padding={1}>
          <img src="/algolia.svg" />
        </Box>
      </>
    );
  });
  const searchClient = algoliaSearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
    process.env.NEXT_PUBLIC_ALGOLIA_API_KEY as string
  );

  return (
    <InstantSearch indexName="kajiri.dev" searchClient={searchClient}>
      <CustomSearchBox />
      <CustomHits />
    </InstantSearch>
  );
};
