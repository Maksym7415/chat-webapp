import React from "react";
import { useSelector } from "react-redux";
// import { bottomActionsSelecteds } from "../../../../../../config";
import SvgMaker from "../../../../../../components/svgMaker";
import { uuid } from "../../../../../../helpers";
import {
  actionsTypeObjectSelected,
  selectedMessagesActions,
  actionsMessagesChat,
  actionsTypeActionsChat,
} from "../../../../../../reduxToolkit/app/actions";
import store from "../../../../../../reduxToolkit/store";

function Selecteds() {
  // HOOKS
  // const navigation = useNavigation();
  // const route = useRoute();

  // STYLES

  // SELECTORS
  const { selectedMessages } = useSelector(({ appSlice }) => appSlice);
  const lang = useSelector(({ settingSlice }) => settingSlice.lang);

  // VARIABLES
  const selectedMessagesAmount = Object.keys(selectedMessages).length;
  const conversationId = route?.params?.id;
  const conversationData = route?.params?.conversationData;

  // FUNCTIONS
  const handleOptions = (typeAction) => {
    store.dispatch(
      actionsMessagesChat(
        {
          conversationId: conversationId,
          selectedMessages,
        },
        typeAction,
        navigation,
        {
          id: conversationId,
          conversationData,
        }
      )
    );
    store.dispatch(
      selectedMessagesActions(null, actionsTypeObjectSelected.clear)
    );
  };

  return (
    <div style={styles.wrapper}>
      {/* {bottomActionsSelecteds(lang).map((action) => {
        let hide = false;
        if ([actionsTypeActionsChat.replyMessage].includes(action.value)) {
          if (selectedMessagesAmount > 1) {
            hide = true;
          }
        }
        return (
          <div
            key={uuid()}
            style={[styles.wrapperAction, hide ? styles.hide : {}]}
            onClick={() => !hide && handleOptions(action.value)}
            disabled={hide || action.disable}
          >
            <p style={styles.title}>{action.title}</p>
            <SvgMaker name={action.icon.name} />
          </div>
        );
      })} */}
    </div>
  );
}

export default Selecteds;
