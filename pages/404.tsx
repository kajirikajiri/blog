import { Box, Button } from "@material-ui/core";
import Parallax from "parallax-js";
import { useEffect, useState } from "react";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { SearchOutlined } from "@material-ui/icons";

export default function Custom404() {
  useEffect(() => {
    const scene1 = document.getElementById("scene1");
    new Parallax(scene1, {
      relativeInput: true,
    });
    const scene2 = document.getElementById("scene2");
    new Parallax(scene2, {
      relativeInput: true,
    });
    const scene3 = document.getElementById("scene3");
    new Parallax(scene3, {
      relativeInput: true,
    });
  }, []);

  const [value, setValue] = useState<string>("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const randomDepth = (x: number) => {
    const max = x;
    const min = -x;
    return Math.random() * (max + 1 - min) + min;
  };
  return (
    <Box>
      <Box position="absolute" left={0} right={0}>
        <Box
          marginY={2}
          fontFamily="DotGothic16"
          display="flex"
          justifyContent="center"
        >
          ページが見つかりませんでした。
          <br />
          調べたいことがあればお調べいたします
        </Box>
        <Box display="flex" justifyContent="center">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              location.href = `https://www.google.com/search?q=site%3Akajiri.dev+${value
                .trim()
                .replace(" ", "+")}`;
            }}
          >
            <FormControl variant="outlined">
              <InputLabel>検索ワード</InputLabel>
              <OutlinedInput
                autoFocus
                type={"text"}
                value={value}
                onChange={handleChange}
                labelWidth={70}
              />
            </FormControl>
          </form>
          <Button
            disabled={value.length === 0}
            onClick={(event) => {
              event?.preventDefault();
              location.href = `https://www.google.com/search?q=site%3Akajiri.dev+${value
                .trim()
                .replace(" ", "+")}`;
            }}
          >
            <SearchOutlined />
          </Button>
        </Box>
      </Box>
      {process.browser && (
        <Box display="flex" width="100vw" height="60vh">
          <Box
            data-relative-input="true"
            id="scene1"
            height="100vh"
            width="33vw"
          >
            {(() => {
              const fontsize = [40, 23, 21, 13, 9];
              return [...Array(5)].map((_, i) => {
                return (
                  <Box
                    color={"black"}
                    fontSize={fontsize[i]}
                    data-depth-x={randomDepth(1.5)}
                    data-depth-y={randomDepth(5)}
                    marginTop={`50vh`}
                    marginLeft={`15vw`}
                  >
                    4
                  </Box>
                );
              });
            })()}
          </Box>
          <Box
            data-relative-input="true"
            id="scene2"
            height="100vh"
            width="33vw"
          >
            {(() => {
              const fontsize = [50, 25, 20, 15, 10];
              return [...Array(5)].map((_, i) => {
                return (
                  <Box
                    color={"black"}
                    fontSize={fontsize[i]}
                    data-depth-x={randomDepth(1.5)}
                    data-depth-y={randomDepth(5)}
                    marginTop={`50vh`}
                    marginLeft={`15vw`}
                  >
                    0
                  </Box>
                );
              });
            })()}
          </Box>
          <Box
            data-relative-input="true"
            id="scene3"
            height="100vh"
            width="33vw"
          >
            {(() => {
              const fontsize = [34, 28, 23, 16, 11];
              return [...Array(5)].map((_, i) => {
                return (
                  <Box
                    color={"black"}
                    fontSize={fontsize[i]}
                    data-depth-x={randomDepth(1.5)}
                    data-depth-y={randomDepth(5)}
                    marginTop={`50vh`}
                    marginLeft={`15vw`}
                  >
                    4
                  </Box>
                );
              });
            })()}
          </Box>
        </Box>
      )}
    </Box>
  );
}
