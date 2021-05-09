import { InputAdornment, TextField } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import algoliaSearch from "algoliasearch/lite";
import { InstantSearch, connectSearchBox, Hits } from "react-instantsearch-dom";

export const Search = () => {
  const CustomSearchBox = connectSearchBox(({ currentRefinement, refine }) => (
    <TextField
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchOutlined color="disabled" />
          </InputAdornment>
        ),
      }}
      variant="outlined"
      value={currentRefinement}
      onChange={(e) => refine(e.currentTarget.value)}
      style={{ width: "100%" }}
    />
  ));
  const searchClient = algoliaSearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
    process.env.NEXT_PUBLIC_ALGOLIA_API_KEY as string
  );
  return (
    <InstantSearch indexName="kajiri.dev" searchClient={searchClient}>
      <CustomSearchBox />
      <Hits />
    </InstantSearch>
  );
};
