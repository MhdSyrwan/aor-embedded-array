import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SimpleShowLayout } from 'admin-on-rest';
import _ from '../../lib/custom-lodash';

/**
 * A container component that shows embedded array elements as a list of input sets
 *
 * You must define the fields and pass them as children or only use one field for primitive arrays.
 *
 * @example Display all the items of an order
 * // order = {
 * //   id: 123,
 * //   items: [
 * //       { qty: 1, price: 10 },
 * //       { qty: 3, price: 15 },
 * //   ],
 * // }
 * <EmbeddedArrayField source="items">
 *      <NumberField source="qty" />
 *      <NumberField source="price" options={{ style: 'currency', currency: 'USD' }} />
 * </EmbeddedArrayField>
 * @example Display all the tags of a product
 * // product = {
 * //   id: 123,
 * //   tags: [
 * //       'relaxation',
 * //       'chair',
 * //   ],
 * // }
 * <EmbeddedArrayField source="tags">
 *      <ChipField />
 * </EmbeddedArrayField>
 */
export class EmbeddedArrayField extends Component {
    render() {
        const { resource, children, source, record } = this.props;
        const layoutProps = { resource, basePath: '/', record };
        const elements = _.get(record, source) || [];
        const elementsWithIndex = _.map(elements, (el, k) => _.merge(el, { _index: k }));

        return (
            <div>
                {_.map(
                    elementsWithIndex,
                    (element, i) =>
                        <SimpleShowLayout {...layoutProps} key={i}>
                            {React.Children.map(children, child =>
                                React.cloneElement(child, {
                                    source: child.props.source
                                        ? `${source}[${i}].${child.props.source}`
                                        : `${source}[${i}]`,
                                }),
                            )}
                        </SimpleShowLayout>,
                    this,
                )}
            </div>
        );
    }
}

EmbeddedArrayField.propTypes = {
    addLabel: PropTypes.bool,
    basePath: PropTypes.string,
    children: PropTypes.node.isRequired,
    data: PropTypes.object,
    label: PropTypes.string,
    record: PropTypes.object,
    resource: PropTypes.string,
    source: PropTypes.string.isRequired,
};

EmbeddedArrayField.defaultProps = {
    addLabel: true,
};

export default EmbeddedArrayField;
