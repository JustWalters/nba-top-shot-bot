import React, { FC, useEffect } from 'react';
import { useHistory } from 'react-router';
import {
  DrawerContent,
  Box,
  DrawerFooter,
  Button,
  Icon,
} from '@admin-bro/design-system';
import {
  ActionProps,
  useRecord,
  ApiClient,
  RecordJSON,
  ActionHeader,
  BasePropertyComponent,
  BasePropertyProps,
} from 'admin-bro';

const apiClient = new ApiClient();

const MomentEditor: FC<BasePropertyProps> = ({ property, ...restProps }) => {
  return (
    <BasePropertyComponent
      {...restProps}
      property={{ ...property, type: 'string', reference: null }}
    />
  );
};

const customPropertyComponents = {
  moment: MomentEditor,
};

const AddMomentAndAlert: FC<ActionProps> = (props) => {
  const { record: initialRecord, resource, action } = props;
  const { record, handleChange, loading, setRecord } = useRecord(
    initialRecord,
    resource.id,
  );
  const history = useHistory();

  useEffect(() => {
    if (initialRecord) {
      setRecord(initialRecord);
    }
  }, [initialRecord]);

  const submit = (event: React.FormEvent<HTMLFormElement>): boolean => {
    event.preventDefault();
    apiClient
      .resourceAction({
        resourceId: resource.id,
        actionName: action.name,
        params: { record: record.params },
      })
      .then((response) => {
        if (response.data.redirectUrl) {
          history.push(response.data.redirectUrl, {
            previousPage: window.location.href,
          });
        }
        // if record has id === has been created
        if (
          response.data.record.id &&
          !Object.keys(response.data.record.errors).length
        ) {
          handleChange({ params: {}, populated: {}, errors: {} } as RecordJSON);
        }
      });
    return false;
  };

  return (
    <Box as="form" onSubmit={submit} flex flexGrow={1} flexDirection="column">
      <DrawerContent>
        {action?.showInDrawer ? <ActionHeader {...props} /> : null}
        {resource.editProperties.map((property) => {
          const EditorComponent =
            customPropertyComponents[property.name] || BasePropertyComponent;
          return (
            <EditorComponent
              key={property.propertyPath}
              where="edit"
              onChange={handleChange}
              property={property}
              resource={resource}
              record={record as RecordJSON}
            />
          );
        })}
      </DrawerContent>
      <DrawerFooter>
        <Button variant="primary" size="lg" type="submit" disabled={loading}>
          {loading ? <Icon icon="Fade" spin /> : null}
          Add Moment and Create Alert
        </Button>
      </DrawerFooter>
    </Box>
  );
};

export default AddMomentAndAlert;
