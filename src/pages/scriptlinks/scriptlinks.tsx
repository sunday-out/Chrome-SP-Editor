import React, { useState, useEffect } from "react";

import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  SelectionMode
} from "office-ui-fabric-react/lib/DetailsList";

import {
  DefaultButton,
  PrimaryButton
} from "office-ui-fabric-react/lib/Button";
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { Stack, TextField } from "office-ui-fabric-react";
import { IonContent, IonPage, IonGrid, IonRow, IonCol } from "@ionic/react";
import Header from "../../components/navigation/header";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IRootState } from "../../store";
import { ScriptLinksActions } from "../../store/scriptlinks/types";
import { getAllScriptLinks } from "../../store/scriptlinks/async-actions";

const ScriptLinks = ({ scriptlinks, getAllScriptLinks: getItems }: HomeProps) => {
  /* component props */
  const [showItemPanel, setShowItemPanel] = useState(false);
  const [showNewPanel, setShowNewPanel] = useState(false);

  useEffect(() => {
    getItems()
  }, [])

  // Populate columns
  const detailsListColumns: IColumn[] = [
    {
      data: "number",
      fieldName: "Sequence",
      isPadded: true,
      isResizable: true,
      isRowHeader: true,
      isSorted: true,
      isSortedDescending: false,
      key: "column2",
      maxWidth: 100,
      minWidth: 100,
      name: "Sequence"
    },
    {
      data: "string",
      fieldName: "Url",
      isPadded: true,
      isResizable: true,
      isRowHeader: true,
      isSorted: true,
      isSortedDescending: false,
      key: "column1",
      maxWidth: 350,
      minWidth: 210,
      name: "ScriptSrc"
    },
    {
      data: "string",
      fieldName: "Scope",
      isPadded: true,
      isResizable: true,
      isRowHeader: true,
      isSorted: true,
      isSortedDescending: false,
      key: "column3",
      maxWidth: 350,
      minWidth: 210,
      name: "Scope"
    }
  ];

  const _onRenderItemFooterContent = (): JSX.Element => {
    return (
      <div>
        <PrimaryButton
          onClick={() => setShowItemPanel(false)}
          style={{ marginRight: "8px" }}
        >
          Update
        </PrimaryButton>
        <DefaultButton onClick={() => setShowItemPanel(false)}>
          Remove
        </DefaultButton>
      </div>
    );
  };

  const _onRenderNewFooterContent = (): JSX.Element => {
    return (
      <div>
        <PrimaryButton
          onClick={() => setShowNewPanel(false)}
          style={{ marginRight: "8px" }}
        >
          Add
        </PrimaryButton>
      </div>
    );
  };

  return (
    <>
      <IonPage>
        <Header title={"ScriptLinks"} />
        <IonContent>
          {/* Actions menu */}
          <CommandBar
            items={[
              {
                key: "newItem",
                name: "New",
                cacheKey: "myCacheKey", // changing this key will invalidate this items cache
                iconProps: {
                  iconName: "Add"
                },
                ariaLabel: "New",
                onClick: () => setShowNewPanel(true)
              }
            ]}
            overflowButtonProps={{ ariaLabel: "More commands" }}
            ariaLabel={
              "Use left and right arrow keys to navigate between commands"
            }
          />
          {/* List of scriptLinks */}
          <DetailsList
            items={scriptlinks}
            columns={detailsListColumns}
            selectionMode={SelectionMode.none}
            setKey="set"
            layoutMode={DetailsListLayoutMode.justified}
            isHeaderVisible={true}
            enterModalSelectionOnTouch={true}
            onItemInvoked={() => setShowItemPanel(true)}
          />
        </IonContent>
      </IonPage>

      {/* Panel to item details */}
      <Panel
        isOpen={showItemPanel}
        type={PanelType.smallFixedFar}
        onDismiss={() => setShowItemPanel(false)}
        isLightDismiss={true}
        isFooterAtBottom={true}
        headerText="Panel with footer at bottom"
        closeButtonAriaLabel="Close"
        onRenderFooterContent={_onRenderItemFooterContent}
      />

      {/* Panel to create new item */}
      <Panel
        isOpen={showNewPanel}
        type={PanelType.smallFixedFar}
        onDismiss={() => setShowNewPanel(false)}
        isLightDismiss={true}
        isFooterAtBottom={true}
        headerText="Panel with footer at bottom"
        closeButtonAriaLabel="Close"
        onRenderFooterContent={_onRenderNewFooterContent}
      >
        {/* Panel form */}
        <Stack>
          <TextField
            label="Custom label rendering"
            description="Click the (i) icon!"
          />

          <TextField
            label="Custom description rendering"
            description="A colorful description!"
          />
        </Stack>
      </Panel>
    </>
  );
};

/* types & redux */
const mapStateToProps = ({ scriptLinks }: IRootState) => ({
  scriptlinks: scriptLinks.scriptlinks,
  loading: scriptLinks.loading
});

const mapDispatchToProps = (dispatch: Dispatch<ScriptLinksActions>) => ({
  getAllScriptLinks: () => getAllScriptLinks(dispatch)
});

type HomeProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScriptLinks);