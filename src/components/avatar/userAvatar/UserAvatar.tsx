import * as React from "react";
import { Avatar, Badge } from "@mui/material";
import { REACT_APP_BASE_URL } from "../../../config/constants/url";
import { getNameShort } from "../../../helpers";
import DefaultAvatar from "../defaultAvatar";
import BangeUserAvatar from "../../banges/bangeUserAvatar";

const UserAvatar = ({
  sizeAvatar = 58,
  source,
  status = "",
  sizeBadge = 18,
  name = "",
  isSelected,
}: any) => {
  // VARIABLES
  const nameShort = name ? getNameShort(name) : null;

  return (
    <div style={{ position: "relative" }}>
      <BangeUserAvatar typeBange={status}>
        {source ? (
          <Avatar
            src={`${REACT_APP_BASE_URL}/${source}`}
            style={{ height: sizeAvatar, width: sizeAvatar }}
          />
        ) : (
          <DefaultAvatar
            name={nameShort}
            width={`${sizeAvatar}px`}
            height={`${sizeAvatar}px`}
          />
        )}
      </BangeUserAvatar>
    </div>
  );
};

export default UserAvatar;
{
  /* <Avatar.Text size={sizeAvatar} label={nameShort || defaultNameAvatar} /> */
}
