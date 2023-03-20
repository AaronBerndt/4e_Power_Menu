import {
  Button,
  Card,
  List,
  ListItemButton,
  Skeleton,
  Stack,
} from "@mui/material";
import OBR, { buildShape } from "@owlbear-rodeo/sdk";
import { useState } from "react";
import { useCharacter } from "./hooks/useCharacters";

type Props = {
  tokenId: string;
  scale: { x: number; y: number };
  position: { x: number; y: number };
};

const returnSquareAreaSize = (html: string, scale: number) => {};

export default function PowerList({ tokenId, scale, position }: Props) {
  const { data: characterData, isLoading } = useCharacter(tokenId);
  const [selectedHtml, setSelectHtml] = useState(null);

  const onPowerButtonClick = (power: any) => {
    const item = buildShape()
      .id(`${tokenId}-${power.name}`)
      .name(power.name)
      .width(150 * 3)
      .height(150 * 3)
      .fillOpacity(0.5)
      .shapeType("RECTANGLE")
      .attachedTo(tokenId)
      .position({ x: position.x - 71, y: position.y - 72 })
      .build();
    OBR.scene.items.addItems([item]);
  };

  return (
    <Stack spacing={2}>
      <Card>
        <List>
          {isLoading ? (
            <Skeleton />
          ) : (
            <>
              {characterData.powers.map((power: any) => (
                <ListItemButton
                  key={power._id}
                  onClick={() => onPowerButtonClick(power)}
                  divider
                >
                  {power.name}
                </ListItemButton>
              ))}
            </>
          )}
        </List>
      </Card>
      <Button
        variant="contained"
        onClick={() => OBR.popover.close("powerList")}
      >
        Close List
      </Button>
    </Stack>
  );
}
