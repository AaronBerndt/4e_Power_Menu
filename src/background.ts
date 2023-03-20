import OBR from "@owlbear-rodeo/sdk";

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
      const [{ id }] = context.items;
      console.log(context.items[0]);

      OBR.popover.open({
        id: "powerList",
        url: `http://localhost:5173?tokenId=${id}`,
        height: 400,
        width: 300,
        anchorElementId: elementId,
      });
    },
  })
);
