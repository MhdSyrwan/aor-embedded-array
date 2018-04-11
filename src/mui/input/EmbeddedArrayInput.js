import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'redux-form';
import inflection from 'inflection';

import FlatButton from 'material-ui/FlatButton';
import TextFieldLabel from 'material-ui/TextField/TextFieldLabel';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ActionDeleteIcon from 'material-ui/svg-icons/action/delete';
import HardwareKeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import HardwareKeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import Divider from 'material-ui/Divider';

import { translate } from 'admin-on-rest';

import EmbeddedArrayInputFormField from '../form/EmbeddedArrayInputFormField';

/**
 * An Input component for generating/editing an embedded array
 *
 *
 * Use it with any set of input components as children, like `<TextInput>`,
 * `<SelectInput>`, `<RadioButtonGroupInput>`, etc.
 *
 * You must define the targeted field for each child or only use one child for primitive arrays.
 *
 * @example
 * export const CommentEdit = (props) => (
 *     <Edit {...props}>
 *         <SimpleForm>
 *              <EmbeddedArrayInput source="links">
 *                  <TextInput source="url" />
 *                  <TextInput source="context"/>
 *                  <ReferenceInput resource="tags" reference="tags" source="tag_id" >
 *                      <SelectInput optionText="name" />
 *                  </ReferenceInput>
 *               </EmbeddedArrayInput>
 *         </SimpleForm>
 *     </Edit>
 * );
 * @example
 * export const CommentEdit = (props) => (
 *     <Edit {...props}>
 *         <SimpleForm>
 *              <EmbeddedArrayInput source="links">
 *                  <TextInput />
 *               </EmbeddedArrayInput>
 *         </SimpleForm>
 *     </Edit>
 * );
 */
export class EmbeddedArrayInput extends Component {
    static propTypes = {
        addLabel: PropTypes.bool.isRequired,
        addField: PropTypes.bool.isRequired,
        allowEmpty: PropTypes.bool.isRequired,
        allowAdd: PropTypes.bool.isRequired,
        allowRemove: PropTypes.bool.isRequired,
        allowOrdering: PropTypes.bool.isRequired,
        arrayElStyle: PropTypes.object,
        basePath: PropTypes.string,
        children: PropTypes.node.isRequired,
        disabled: PropTypes.bool,
        elStyle: PropTypes.object,
        input: PropTypes.object,
        label: PropTypes.string,
        labelAdd: PropTypes.string.isRequired,
        labelRemove: PropTypes.string.isRequired,
        meta: PropTypes.object,
        onChange: PropTypes.func,
        resource: PropTypes.string,
        readOnly: PropTypes.bool,
        record: PropTypes.object,
        source: PropTypes.string,
        customButtons: PropTypes.node,
        actionsContainerStyle: PropTypes.object,
        innerContainerStyle: PropTypes.object,
        labelContainerStyle: PropTypes.object,
        labelStyle: PropTypes.object,
        insertDividers: PropTypes.bool,
    };

    static defaultProps = {
        addLabel: false,
        addField: false,
        allowEmpty: true,
        allowAdd: true,
        allowRemove: true,
        allowOrdering: true,
        labelAdd: 'aor.input.embedded_array.add',
        labelRemove: 'aor.input.embedded_array.remove',
        labelOrderingUp: 'aor.input.embedded_array.ordering_up',
        labelOrderingDown: 'aor.input.embedded_array.ordering_down',
        insertDividers: true,
        actionsContainerStyle: {
            clear: 'both',
            margin: '1em',
            display: 'block',
            textAlign: 'right',
        },
        innerContainerStyle: {
            padding: '0 1em 1em 1em',
            width: '90%',
            display: 'inline-block',
        },
        labelContainerStyle: {
            padding: '1.2em 1em 0 0',
            width: '90%',
            display: 'inline-block',
        },
        labelStyle: {
            top: 0,
            position: 'relative',
            textTransform: 'capitalize',
        },
    };

    static contextTypes = {
        muiTheme: PropTypes.object.isRequired,
    };

    renderListItem = ({
        allowRemove,
        allowOrdering,
        items,
        inputs,
        member,
        index,
        translate,
        labelRemove,
        labelOrderingUp,
        labelOrderingDown,
        readOnly,
        disabled,
        customButtons,
        actionsContainerStyle,
        innerContainerStyle,
    }) => {
        const removeItem = () => items.remove(index);
        const moveItemUp = () => {if (index !== 0) return items.move(index, index - 1)};
        const moveItemDown = () => {if (index !== items.length - 1) return items.move(index, index + 1)};
        const isFirstItemInList = () => {if (index === 0) return true};
        const isLatestItemInList = () => {if (index === items.length -1) return true};
        const passedProps = {
            resource: this.props.resource,
            basePath: this.props.basePath,
            record: this.props.record,
        };

        return (
            <div className="EmbeddedArrayInputItemContainer">
                <div style={innerContainerStyle}>
                    {React.Children.map(
                        inputs,
                        input =>
                            input &&
                            <div
                                key={input.props.source}
                                className={`aor-input-${member}.${input.props.source}`}
                                style={input.props.style}
                            >
                                <EmbeddedArrayInputFormField input={input} prefix={member} {...passedProps} />
                            </div>,
                    )}
                </div>
                {(customButtons || (allowRemove && !readOnly && !disabled) || (allowOrdering && !readOnly && !disabled)) &&
                    <div style={actionsContainerStyle}>
                        {allowRemove &&
                            !readOnly &&
                            !disabled &&
                            <FlatButton
                                secondary
                                label={translate(labelRemove, { _: 'Remove' })}
                                icon={<ActionDeleteIcon />}
                                onClick={removeItem}
                            />}
                        {allowOrdering &&
                            !readOnly &&
                            !disabled &&
                            <span>
                                {!isFirstItemInList() &&
                                <FlatButton
                                    secondary
                                    label={translate(labelOrderingUp, {_: 'Move Up'})}
                                    icon={<HardwareKeyboardArrowUp/>}
                                    onClick={moveItemUp}
                                />
                                }
                                {!isLatestItemInList() &&
                                <FlatButton
                                    secondary
                                    label={translate(labelOrderingUp, {_: 'Move Down'})}
                                    icon={<HardwareKeyboardArrowDown />}
                                    onClick={moveItemDown}
                                />
                                }
                            </span>}
                        {customButtons && customButtons.map(button => React.cloneElement(button, { items, index }))}
                    </div>}
            </div>
        );
    };

    renderList = ({ fields: items }) => {
        const {
            children,
            style,
            translate,
            labelRemove,
            labelAdd,
            allowAdd,
            allowRemove,
            allowOrdering,
            readOnly,
            disabled,
            customButtons,
            actionsContainerStyle,
            innerContainerStyle,
            insertDividers,
        } = this.props;
        const createItem = () => items.push();

        return (
            <div className="EmbeddedArrayInputContainer" style={style}>
                <div>
                    {items.map((member, index) =>
                        <div key={index}>
                            {this.renderListItem({
                                items,
                                inputs: children,
                                member,
                                index,
                                translate,
                                labelRemove,
                                allowRemove,
                                allowOrdering,
                                readOnly,
                                disabled,
                                customButtons,
                                actionsContainerStyle,
                                innerContainerStyle,
                            })}
                            {insertDividers && index < items.length - 1 && <Divider />}
                        </div>,
                    )}
                </div>
                <br />
                {allowAdd &&
                    !readOnly &&
                    !disabled &&
                    <FlatButton
                        primary
                        icon={<ContentAdd />}
                        label={translate(labelAdd, { _: 'Add' })}
                        onClick={createItem}
                    />}
            </div>
        );
    };

    render() {
        const { source, label, addLabel, translate, resource, labelStyle, labelContainerStyle } = this.props;
        const labelStyleMuiTheme = Object.assign(labelStyle, {
            color: this.context.muiTheme ? this.context.muiTheme.textField.focusColor : '',
        });

        const minimizedLabel =
            typeof label !== 'undefined'
                ? translate(label, { _: label })
                : translate(
                      `resources.${resource}.fields.${source.replace(/\./g, '.fields.').replace(/\[\d+\]/g, '')}.name`,
                      {
                          _: inflection.humanize(source.split('.').pop()),
                      },
                  );

        const labelElement =
            !addLabel &&
            <div style={labelContainerStyle}>
                <TextFieldLabel muiTheme={this.context.muiTheme} style={labelStyleMuiTheme} shrink={false}>
                    {minimizedLabel}
                </TextFieldLabel>
            </div>;

        return (
            <div>
                {labelElement}
                <FieldArray name={source} component={this.renderList} props={this.props} />
            </div>
        );
    }
}

export default translate(EmbeddedArrayInput);
