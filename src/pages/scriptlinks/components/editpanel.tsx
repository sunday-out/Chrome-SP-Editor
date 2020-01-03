import {
  Dropdown,
  IDropdownOption,
  IOverlayProps,
  Panel,
  PanelType,
  PrimaryButton,
  Stack,
  TextField,
} from 'office-ui-fabric-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../../store'
import { setEditPanel, setSelectedItem } from '../../../store/scriptlinks/actions'
import { updateScriptLink } from '../../../store/scriptlinks/async-actions'

const ScriptLinksEditPanel = () => {

  const dispatch = useDispatch()
  const { isDark } = useSelector((state: IRootState) => state.home)
  const { editpanel, selectedItem } = useSelector((state: IRootState) => state.scriptLinks)

  const panelOverlayProps: IOverlayProps = { isDarkThemed: isDark }
  const _onRenderItemFooterContent = () => {
    return (
      <PrimaryButton
        onClick={() => {
          if (selectedItem) {
            updateScriptLink(dispatch, selectedItem)
          } else {
            // TODO show error message
          }
        }
        }
        style={{ marginRight: '8px' }}
        text={'Update'}
      />
    )
  }
  const sequenceValidator = (value: string): string => {
    return +value > -1 && +value < 65537 ? '' : `The value specified must be between 0 and 65536 inclusively.`
  }

  return (
    <Panel
      isOpen={editpanel}
      type={PanelType.smallFixedFar}
      onDismiss={() => {
        dispatch(setSelectedItem(undefined))
        dispatch(setEditPanel(false))
      }
      }
      isLightDismiss={true}
      isFooterAtBottom={true}
      headerText='Edit ScriptLink'
      closeButtonAriaLabel='Close'
      onRenderFooterContent={_onRenderItemFooterContent}
      overlayProps={panelOverlayProps}
    >
      {selectedItem &&
        <Stack>
          <TextField
            label='Url'
            description='Url of the file to be injected.'
            multiline
            autoAdjustHeight
            value={selectedItem.Url}
            onChange={(event, newValue?: string) =>
              dispatch(setSelectedItem({ ...selectedItem, Url: newValue ? newValue : '' }))
            }
          // TODO: do proper validation
          />
          <TextField
            label='Sequence'
            description='The sequence of the scriplink'
            styles={{ fieldGroup: { width: 100 } }}
            value={selectedItem.Sequence.toString()}
            type={'number'}
            onChange={(event, newValue?: string) =>
              dispatch(setSelectedItem({ ...selectedItem, Sequence: newValue ? +newValue : selectedItem.Sequence }))
            }
            onGetErrorMessage={sequenceValidator}
          // TODO: do proper casting & validation
          />
          <Dropdown
            placeholder='Select scope'
            label='Scope'
            options={[
              { key: 2, text: 'Site Collection' },
              { key: 3, text: 'Current Web' },
            ]}
            // disabled={true}
            selectedKey={selectedItem.Scope}
            onChange={(event, option?: IDropdownOption) =>
              dispatch(setSelectedItem({ ...selectedItem, Scope: option ? +option.key : selectedItem.Scope }))
            }
          />
          <TextField
            label='Id'
            description='Id of the custom action'
            value={selectedItem.Id}
            readOnly
            disabled
          />
        </Stack>
      }
    </Panel>
  )
}

export default ScriptLinksEditPanel