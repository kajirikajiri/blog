type Props = {
  id: string;
};
export const Youtube = ({ id }: Props) => {
  return (
    <>
      <div
        style={{
          overflow: "hidden",
          paddingBottom: "56.25%",
          position: "relative",
          height: 0,
          marginBottom: 40,
        }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          width="100%"
          height="100%"
          style={{ left: 0, top: 0, position: "absolute" }}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </>
  );
};
