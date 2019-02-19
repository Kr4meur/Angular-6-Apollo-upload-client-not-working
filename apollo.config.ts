import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';

import {Common} from './common';

import {InMemoryCache} from 'apollo-cache-inmemory';
import {Apollo, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {IntrospectionFragmentMatcher} from 'apollo-cache-inmemory';

import {FragmentTypes} from '@scheduler/typing';

@NgModule({
    imports: [
        ApolloModule,
        HttpLinkModule
    ],
    exports: [
        HttpClientModule,
        ApolloModule,
        HttpLinkModule
    ],
})
export class GraphQLModule {
    constructor(private apollo: Apollo, private httpLink: HttpLink) {
        const uri = Common.BACKEND_URL;
        const http = httpLink.create({uri});

        const introspectionQueryResultData = FragmentTypes.FRAGMENT_TYPES.data;
        const fragmentMatcher = new IntrospectionFragmentMatcher({introspectionQueryResultData});
        const cache = new InMemoryCache({fragmentMatcher});

        apollo.create({
            link: http,
            cache: cache,
        });
    }
}
