import React, { FC, useState } from "react";
import { ButtonBase, Popover } from "@material-ui/core";

type TooltipProps = {
  clickableElement: any;
  buttonClassName?: string;
  buttonClassInvertedName?: string;
  disabled?: boolean;
  popOverElement: JSX.Element;
  index: number;
  inverted?: boolean;
  tagName: string;
  withBackground?: boolean;
};

const Tooltip: FC<TooltipProps> = ({
  clickableElement,
  buttonClassName,
  disabled,
  popOverElement,
  index,
  inverted = false,
  tagName,
  buttonClassInvertedName,
  withBackground = true,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [openPopoverID, setOpenPopoverID] = useState<number | null>();

  const handlePopoverOpen = (popoverId: number) => (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    setAnchorEl(event.currentTarget);
    setOpenPopoverID(popoverId);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
    setOpenPopoverID(null);
  };

  return (
    <>
      <ButtonBase disabled={disabled}>
        {
          <span
            aria-describedby={
              Boolean(anchorEl) ? `${tagName}-${index}` : undefined
            }
            className={`${buttonClassName} ${
              inverted && buttonClassInvertedName
            }`}
            onClick={handlePopoverOpen(index)}
            style={{
              display: "flex",
              flex: "0 0 100%",
              background: `${
                inverted ? "rgba(0, 0,0, 0.05)" : "rgba(255, 255,255, 0.05)"
              }`,
            }}
          >
            {clickableElement}
          </span>
        }
      </ButtonBase>
      <Popover
        id={openPopoverID === index ? `${tagName}-${index}` : undefined}
        open={openPopoverID === index}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {popOverElement}
      </Popover>
    </>
  );
};
export default Tooltip;
