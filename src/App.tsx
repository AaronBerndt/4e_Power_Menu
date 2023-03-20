import OBR from "@owlbear-rodeo/sdk";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import PowerList from "./PowerList";

function App() {
  const queryClient = new QueryClient();
  const queryParameters = new URLSearchParams(window.location.search);
  const tokenId = queryParameters.get("tokenId");
  const scale = queryParameters.get("scale");
  const position = queryParameters.get("position");

  const returnObject = (param: any) => {
    const [x, y] = param.split(".");

    return { x: Number(x), y: Number(y) };
  };

  useEffect(() => {
    OBR.onReady(() =>
      OBR.contextMenu.create({
        id: `4ePowerList`,
        icons: [
          {
            icon: "/power.svg",
            label: "Power List",
            filter: {
              every: [{ key: "layer", value: "CHARACTER" }],
              permissions: ["UPDATE"],
            },
          },
        ],
        async onClick(context, elementId) {
          const [{ id, position, scale }] = context.items;

          OBR.popover.open({
            id: "powerList",
            url: `http://localhost:5173?tokenId=${id}&position=${position.x}.${position.y}&scale=${scale.x}.${scale.y}`,
            height: 600,
            width: 200,
            anchorOrigin: { horizontal: "LEFT", vertical: "CENTER" },
          });
        },
      })
    );
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      {tokenId && (
        <PowerList
          tokenId={tokenId}
          scale={returnObject(scale)}
          position={returnObject(position)}
        />
      )}
    </QueryClientProvider>
  );
}

export default App;
