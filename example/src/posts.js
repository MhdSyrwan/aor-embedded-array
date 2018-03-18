import React from 'react';
import {
    List,
    Datagrid,
    Edit,
    Create,
    SimpleForm,
    DateField,
    TextField,
    EditButton,
    DisabledInput,
    TextInput,
    LongTextInput,
    DateInput,
} from 'admin-on-rest';
import { EmbeddedArrayInput, EmbeddedArrayField } from 'aor-embedded-array';
import BookIcon from 'material-ui/svg-icons/action/book';
export const PostIcon = BookIcon;

export const PostList = props =>
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="title" />
            <DateField source="published_at" />
            <TextField source="average_note" />
            <TextField source="views" />

            <EmbeddedArrayField source="comments">
                <TextInput source="body" />
                <TextInput source="author" />
            </EmbeddedArrayField>

            <EditButton basePath="/posts" />
        </Datagrid>
    </List>;

const PostTitle = ({ record }) => {
    return (
        <span>
            Post {record ? `"${record.title}"` : ''}
        </span>
    );
};

export const PostEdit = props =>
    <Edit title={<PostTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="title" />
            <TextInput source="teaser" options={{ multiLine: true }} />
            <LongTextInput source="body" />
            <DateInput label="Publication date" source="published_at" />
            <TextInput source="average_note" />
            <DisabledInput label="Nb views" source="views" />
            <EmbeddedArrayInput source="comments" labelAdd="New Comment">
                <TextInput source="body" />
                <TextInput source="author" />
            </EmbeddedArrayInput>
        </SimpleForm>
    </Edit>;

export const PostCreate = props =>
    <Create title="Create a Post" {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="teaser" options={{ multiLine: true }} />
            <LongTextInput source="body" />
            <TextInput label="Publication date" source="published_at" />
            <TextInput source="average_note" />
            <EmbeddedArrayInput source="comments" labelAdd="New Comment">
                <TextInput source="body" />
                <TextInput source="author" />
            </EmbeddedArrayInput>
        </SimpleForm>
    </Create>;
