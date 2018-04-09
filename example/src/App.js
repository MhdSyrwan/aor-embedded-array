import React from 'react';
import { simpleRestClient, Admin, Resource } from 'admin-on-rest';

import { PostList, PostEdit, PostCreate, PostIcon } from './posts';

export default class App extends React.Component {
    render() {
        return (
            <Admin restClient={simpleRestClient('http://localhost:3000')}>
                <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon} />
            </Admin>
        );
    }
}
